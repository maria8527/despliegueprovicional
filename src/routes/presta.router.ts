import { Router } from 'express';
import express, { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { decodeToken } from '../firebase/adminTokens';
import { ContainerTypes, ExpressJoiError } from 'express-joi-validation';
import validator from '../utilities/validator';
import registroSchema from '../schemas-joi/registro.schema';
import prestamoSchema from '../schemas-joi/prestamo.schema';
import pagoSchema from '../schemas-joi/pago.schema';
import { NextFunction } from 'express';
import { pool } from '../services/db';

const router = Router();

router.get('/registro',  async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  try {
    const result: QueryResult = await pool.query('SELECT * FROM registro;');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  } finally {
    cliente.release(true)
}
});

router.get('/registro/:id',  async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  const id = parseInt(req.params.id);
  const result: QueryResult = await pool.query(
    'SELECT * FROM registro WHERE id = $1;',
    [id]
  );
  try {
    return res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }finally {
    cliente.release(true)
} 
});

router.post("/registro",  validator.body(registroSchema), async (req: Request, res: Response) =>{
  let cliente = await pool.connect();
  try{ 
  const {nombre_completo,
        fecha_nacimiento,
        numero_celular,
        tipo_documento,
        n_documento,
        profesion_u_oficio,
        direccion,
        email,
        rol,
        contrasena} = req.body;
  const result = await pool.query('INSERT INTO registro (nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, n_documento, profesion_u_oficio, direccion, email, rol, contrasena) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);',
  ([nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, n_documento, profesion_u_oficio,
  direccion, email, rol, contrasena]));
  res.json({
      message: 'User register successfully',
      body:{
          user: {nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, n_documento,
               profesion_u_oficio, direccion, email, rol, contrasena}
      }   
  });
  res.status(200).json(result.rows);

 }catch(error){
  res.status(500).json(error);
  console.log(error); 
 }finally{
  cliente.release(true)
 }
  });

router.put("/registro/:id",  validator.body(registroSchema), async (req: Request, res: Response) =>{
  let cliente = await pool.connect();
  try{
  const id = parseInt(req.params.id);
  const { nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, n_documento, profesion_u_oficio,
  direccion, email, rol, contrasena} = req.body;

  const result = await pool.query('UPDATE registro SET nombre_completo = $1, fecha_nacimiento = $2, numero_celular = $3, tipo_documento = $4, n_documento = $5, profesion_u_oficio = $6, direccion = $7, email = $8, rol = $9, contrasena = $10 WHERE id = $11;',
  [
      nombre_completo, 
      fecha_nacimiento, 
      numero_celular, 
      tipo_documento, 
      n_documento, 
      profesion_u_oficio,
      direccion, 
      email, 
      rol, 
      contrasena,
      id
  ]);
  res.status(200).json(result.rows);
  }catch(error){
  res.status(500).json(error);
  console.log(error); 
  }finally{
  cliente.release(true)
}
});

router.delete("/registro/:id",  async (req: Request, res: Response) =>{
  let cliente = await pool.connect();
  try { 
      const {id} = req.params;
      await pool.query(`DELETE FROM registro WHERE id = ${id};`)
      res.status(200).json('User deleted successfully');
  } catch (error) {
      res.status(500).json({error: "Internal server error"});
      console.log(error); 
  }finally{
      cliente.release(true)
  }
});

router.get("/prestamo",  async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  try { 
      const result: QueryResult = await pool.query('SELECT * FROM prestamo;');
      res.status(200).json(result.rows);
  } catch (error) {
      res.status(500).json(error);
      console.log(error); 
  }finally{
      cliente.release(true)
  }
});

router.get("/prestamo/:id",  async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  try{
  console.log('params: ');
  const id = parseInt(req.params.id);
  const result: QueryResult = await pool.query('SELECT * FROM prestamo WHERE id = $1;', [id]);
  res.status(200).json(result.rows);
  }catch(error){
      res.status(500).json(error);
      console.log(error); 
  }finally{
      cliente.release(true)
  }
});

router.post("/prestamo",  validator.body(prestamoSchema), async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  try{
  const {nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado, id_registro} = req.body;
  const result = await pool.query('INSERT INTO prestamo (nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado, id_registro) VALUES ($1,$2,$3,$4,$5,$6,$7);',
  ([nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado, id_registro])); 
  res.json({
      message: 'lend lease register successfully',
      body:{
          user: {nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado, id_registro}
      }
  })
  res.status(200).json(result.rows);
  }catch(error){
  res.status(500).json(error);
  console.log(error); 
  }finally{
      cliente.release(true)
  }
});

router.put("/prestamo/:id",  validator.body(prestamoSchema), async (req: Request, res: Response) =>{
  let cliente = await pool.connect();
  try{
  const id = parseInt(req.params.id);
  const { nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado, id_registro} = req.body;
  const result = await pool.query('UPDATE prestamo SET nombre_completo = $1, fecha_creacion = $2, monto_prestar = $3, plazo_en_meses = $4, tasa_interes = $5, estado = $6 id_registro = $7 WHERE id = $8;',
  [   nombre_completo, 
      fecha_creacion,
      monto_prestar,
      plazo_en_meses,
      tasa_interes,
      estado,
      id_registro,
      id
  ]);
  res.status(200).json(result.rows)
  }catch(error){
  res.status(500).json(error);
  console.log(error); 
  }finally{
      cliente.release(true)
  }
});

router.delete("/prestamo/:id",  async (req: Request, res: Response) =>{
  let cliente = await pool.connect();
  try { 
      const {id} = req.params;
      await pool.query(`DELETE FROM prestamo  WHERE id = ${id};`)
      res.status(200).json('lend lease deleted successfully');
  } catch (error) {
      res.status(500).json({error: "Internal server error"});
      console.log(error); 
  }finally{
      cliente.release(true)
  }
});

router.get("/pago",  async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  try { 
      const result: QueryResult = await pool.query('SELECT * FROM pago;');
      res.status(200).json(result.rows);
  } catch (error) {
      res.status(500).json(error);
      console.log(error); 
  }finally{
      cliente.release(true)
  }
});

router.get("/pago/:id",  async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  try{
  console.log('params: ');
  const id = parseInt(req.params.id);
  const result: QueryResult = await pool.query('SELECT * FROM pago WHERE id = $1;', [id]);
  res.status(200).json(result.rows);
  }catch(error){
      res.status(500).json(error);
      console.log(error);
  }finally{
      cliente.release(true)
  }
});

router.post("/pago",  validator.body(pagoSchema), async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  try{
  const {fecha_pago_cuotas, tiempo_pagar, cuota_pagar, id_prestamo, id_registro} = req.body;
  const result = await pool.query('INSERT INTO pago (fecha_pago_cuotas, tiempo_pagar, cuota_pagar, id_prestamo, id_registro) VALUES ($1,$2,$3,$4,$5);',
  ([fecha_pago_cuotas, tiempo_pagar, cuota_pagar, id_prestamo, id_registro ]));
  res.json({
      message: 'pyment register successfully',
      body:{
          user: {fecha_pago_cuotas, tiempo_pagar, cuota_pagar, id_prestamo, id_registro}
      }
  })
  res.status(200).json(result.rows);
  }catch(error){
  res.status(500).json(error);
  console.log(error);
  }finally{
      cliente.release(true)
  }
});

router.put("/pago/:id",  validator.body(pagoSchema), async (req: Request, res: Response) =>{
  let cliente = await pool.connect();
  try{
  const id = parseInt(req.params.id);
  const { fecha_pago_cuotas, tiempo_pagar, cuota_pagar, id_prestamo, id_registro } = req.body;
  const result = await pool.query('UPDATE pago SET fecha_pago_cuotas = $1, tiempo_pagar = $2, cuota_pagar = $3, id_prestamo = $4, id_registro = $5  WHERE id = $6;',
  [  fecha_pago_cuotas,
    tiempo_pagar,
    cuota_pagar,
    id_prestamo,
    id_registro,
    id
  ]);
  res.status(200).json({message: "update successfully"});
  console.log(result.rows);
  }catch(error){
  res.status(500).json(error);
  console.log(error);
  }finally{
      cliente.release(true)
  }
});

router.delete("/pago/:id",  async (req: Request, res: Response) =>{
  let cliente = await pool.connect();
  try { 
      const {id} = req.params;
      await pool.query(`DELETE FROM pago  WHERE id = ${id};`)
      res.status(200).json('payment deleted successfully');
  } catch (error) {
      res.status(500).json({error: "Internal server error"});
      console.log(error); 
  }finally{
      cliente.release(true)
  }
});

router.get("/historial",  async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  try { 
      const result: QueryResult = await pool.query('SELECT * FROM historial;');
      res.status(200).json(result.rows);
  } catch (error) {
      res.status(500).json(error);
      console.log(error); 
  }finally{
      cliente.release(true)
  }
});

router.get("/historial/:id",  async (req: Request, res: Response) => {
  let cliente = await pool.connect();
  try{
  console.log('params: ');
  const id = parseInt(req.params.id);
  const result: QueryResult = await pool.query('SELECT * FROM historial WHERE id = $1;', [id]);
  res.status(200).json(result.rows);
  }catch(error){
      res.status(500).json(error);
      console.log(error);
  }finally{
      cliente.release(true)
  }
});

router.delete("/historial/:id",  async (req: Request, res: Response) =>{
  let cliente = await pool.connect();
  try { 
      const {id} = req.params;
      await pool.query(`DELETE FROM historial  WHERE id = ${id};`)
      res.status(200).json('historial deleted successfully');
  } catch (error) {
      res.status(500).json({error: "Internal server error"});
      console.log(error); 
  }finally{
      cliente.release(true)
  }
});

export default router;
