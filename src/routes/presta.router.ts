import { response, Router } from 'express';
import express, { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { decodeToken } from '../firebase/adminTokens';
import validator from '../utilities/validator';
import registroSchema from '../schemas-joi/registro.schema';
import prestamoSchema from '../schemas-joi/prestamo.schema';
import pagoSchema from '../schemas-joi/pago.schema';
import { NextFunction } from 'express';
import { pool } from '../services/db';
import sendEmail from '../utilities/bienvenida';
import templateIds from '../constants/templateid.const'
import { request } from 'http';

const router = Router(); 

router.get('/registro', decodeToken, async (req: Request, res: Response) => { 
  let cliente = await pool.connect();
  const result: QueryResult = await pool.query('SELECT * FROM registro;');
  try {
    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  } finally {
    cliente.release(true)
}
}); 

router.get('/registro/:id', decodeToken, async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  const id = parseInt(req.params.id);
  const result: QueryResult = await pool.query('SELECT * FROM registro WHERE id = $1;',[id]);
  try {
    return res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }finally {
    cliente.release(true)
}    
});

router.post("/registro", decodeToken, validator.body(registroSchema), async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  const {nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, n_documento, profesion_u_oficio, direccion, email, rol, contrasena} = req.body;
  const result = await pool.query('INSERT INTO registro (nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, n_documento, profesion_u_oficio, direccion, email, rol, contrasena) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);',
([nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, n_documento, profesion_u_oficio,
direccion, email, rol, contrasena]));
console.log(email, nombre_completo) 
  try{ 
    await sendEmail(
      email,
      {
        subject: 'Validate email',
        nombre_completo,
      },
      templateIds.SEND_CODE
    );
    return res.status(200).send(`Registro creado con exito`);
 }catch(error){
  console.log(error); 
  return res.status(500).send(error);
 }finally{
  cliente.release(true)
 }
  });

router.put("/registro/:id", decodeToken, validator.body(registroSchema), async (req: Request, res: Response) =>{
  let cliente = await pool.connect();
  const id = parseInt(req.params.id);
  const { nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, n_documento, profesion_u_oficio,
  direccion, email, rol, contrasena} = req.body;
  const result = await pool.query('UPDATE registro SET nombre_completo = $1, fecha_nacimiento = $2, numero_celular = $3, tipo_documento = $4, n_documento = $5, profesion_u_oficio = $6, direccion = $7, email = $8, rol = $9, contrasena = $10 WHERE id = $11;',
  [ nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, n_documento, profesion_u_oficio, direccion, email, rol, contrasena,id ]);
  try{
   return res.status(200).json(`Registro editado con exito`);
  }catch(error){
    console.log(error); 
   return res.status(500).json(error);
  }finally{
  cliente.release(true)
}
});

router.delete("/registro/:id", decodeToken, async (req: Request, res: Response) =>{
  let cliente = await pool.connect();
  const {id} = req.params;
      await pool.query(`DELETE FROM registro WHERE id = ${id};`)
  try { 
   return res.status(200).json('User deleted successfully');
  } catch (error) {
    console.log(error); 
    return res.status(500).json({error: "Internal server error"});
  }finally{
      cliente.release(true)
  }
});

router.get("/prestamo", decodeToken, async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  const result: QueryResult = await pool.query('SELECT * FROM prestamo;');
  try { 
    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error); 
     return res.status(500).json(error);
  }finally{
      cliente.release(true)
  }
});

router.get("/prestamo1", decodeToken, async (req: Request, res: Response) =>{
  let cliente = await pool.connect();
  const result: QueryResult = await pool.query('SELECT cuota_pagar AS cuota, saldo_restante AS saldo_faltante FROM pago;');
  try{
    return res.status(200).json(result.rows);
  }catch(error){
    console.log(error); 
    return res.status(500).json(error);
  }finally{
      cliente.release(true)
  }
});

router.get("/prestamo/:id",  decodeToken, async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  console.log('params: ');
  const id = parseInt(req.params.id);
  const result: QueryResult = await pool.query('SELECT * FROM prestamo WHERE id = $1;', [id]);
  try{
   return res.status(200).json(result.rows);
  }catch(error){
    console.log(error); 
    return res.status(500).json(error);
  }finally{
      cliente.release(true)
  }
});

router.post("/prestamo", decodeToken, validator.body(prestamoSchema), async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  const {nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado, id_registro} = req.body;
  const result = await pool.query('INSERT INTO prestamo (nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado, id_registro) VALUES ($1,$2,$3,$4,$5,$6,$7);',
  ([nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado, id_registro])); 
   const email = await pool.query('SELECT * FROM registro WHERE nombre_completo = $1;', [nombre_completo]);
  try{
     if (estado === 'aprobado') {
      await sendEmail(
        email.rows[0].email,
        {
          subject: 'Validate email',
          nombre_completo,
        },
        templateIds.SEND_CODE1
      );
     } else {
       await sendEmail(
        email.rows[0].email,
         {
           subject: 'Validate email',
           nombre_completo,
         },
         templateIds.SEND_CODE2
       );
     }
    console.log(email)
   return res.status(200).json(`Prestamo creado con exito`);
  }catch(error){
    console.log(error);
    return res.status(500).json(error);
  }finally{
      cliente.release(true)
  }
});

router.put("/prestamo/:id", decodeToken, validator.body(prestamoSchema), async (req: Request, res: Response) =>{
  let cliente = await pool.connect();
  const id = parseInt(req.params.id);
  const { nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado} = req.body;
  const result = await pool.query('UPDATE prestamo SET nombre_completo = $1, fecha_creacion = $2, monto_prestar = $3, plazo_en_meses = $4, tasa_interes = $5, estado = $6 WHERE id = $7;',
  [   nombre_completo, 
      fecha_creacion,
      monto_prestar,
      plazo_en_meses,
      tasa_interes,
      estado,
      id
  ]);
  try{
  return res.status(200).json(`Prestamo editado con exito`);
  }catch(error){
    console.log(error);
    return res.status(500).json(error);
  }finally{
      cliente.release(true)
  }
});

router.delete("/prestamo/:id", decodeToken, async (req: Request, res: Response) =>{
  let cliente = await pool.connect();
  const {id} = req.params;
  await pool.query(`DELETE FROM prestamo  WHERE id = ${id};`)
  try { 
   return res.status(200).json('lend lease deleted successfully');
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server error"}); 
  }finally{
      cliente.release(true)
  }
});

router.get("/pago", decodeToken, async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  const result: QueryResult = await pool.query('SELECT * FROM pago;');
  try { 
   return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }finally{
      cliente.release(true)
  }
});

router.get("/pago/:id",  decodeToken, async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  console.log('params: ');
  const id = parseInt(req.params.id);
  const result: QueryResult = await pool.query('SELECT * FROM pago WHERE id = $1;', [id]);
  try{
   return res.status(200).json(result.rows);
  }catch(error){
    console.log(error);
    return res.status(500).json(error);    
  }finally{
      cliente.release(true)
  }
});

router.post("/pago",  decodeToken, validator.body(pagoSchema), async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  const {fecha_pago_cuotas, tiempo_pagar, cuota_pagar, cuotas_faltantes, saldo_restante, id_prestamo, id_registro} = req.body;
  const result = await pool.query('INSERT INTO pago (fecha_pago_cuotas, tiempo_pagar, cuota_pagar, cuotas_faltantes, saldo_restante, id_prestamo, id_registro) VALUES ($1,$2,$3,$4,$5,$6,$7);',
  ([fecha_pago_cuotas, tiempo_pagar, cuota_pagar, cuotas_faltantes, saldo_restante, id_prestamo, id_registro ]));
  res.json({
      message: 'pyment register successfully',
      body:{
          user: {fecha_pago_cuotas, tiempo_pagar, cuota_pagar, cuotas_faltantes, saldo_restante, id_prestamo, id_registro}
      }
  })
  try{
   return res.status(200).json(`Pago creado con exito`);
  }catch(error){
    console.log(error);
    return res.status(500).json(error); 
  }finally{
      cliente.release(true)
  }
});

router.put("/pago/:id", decodeToken, validator.body(pagoSchema), async (req: Request, res: Response) =>{
  let cliente = await pool.connect();
  const id = parseInt(req.params.id);
  const { fecha_pago_cuotas, tiempo_pagar, cuota_pagar, cuotas_faltantes, saldo_restante, id_prestamo, id_registro } = req.body;
  const result = await pool.query('UPDATE pago SET fecha_pago_cuotas = $1, tiempo_pagar = $2, cuota_pagar = $3, cuotas_faltantes = $4, saldo_restante =$5, id_prestamo = $6, id_registro = $7  WHERE id = $8;',
  [  fecha_pago_cuotas,
    tiempo_pagar,
    cuota_pagar,
    cuotas_faltantes,
    saldo_restante,
    id_prestamo,
    id_registro,
    id
  ]);
  try{
   return res.status(200).json({message: "update successfully"});
  }catch(error){
    console.log(error);
    return res.status(500).json(error);
  }finally{
      cliente.release(true)
  }
});

router.delete("/pago/:id",  decodeToken, async (req: Request, res: Response) =>{
  let cliente = await pool.connect();
  const {id} = req.params;
  await pool.query(`DELETE FROM pago  WHERE id = ${id};`)
  try {
    return res.status(200).json('payment deleted successfully');
  } catch (error) {
    console.log(error);
     return res.status(500).json({error: "Internal server error"}); 
  }finally{
      cliente.release(true)
  }
});

export default router;
