import * as mongoDB from "mongodb";
import score from '../src/models/presta2';
// import { pool } from '../services/db';
import { QueryResult } from 'pg';
import { Router } from 'express';
import { collection } from "../src/services/database.2";
export const routerClass = Router();

class InteresesEA {
    score: number;
    interes: number;
    monto: number;
    saldoRestante: number;
    cuotaMensual: number;
    valorPagar: number;
    plazo_meses: number;
    pagoFinalizado: number

    getInteres() {
        console.log('Esta es tu cuota mensual:' + this.cuotaMensual);

    }
    getscores() {
        console.log('Score:' + this.score);

    }
    getinteresMensual() {
        console.log('Este es el interes' + this.interes);

    }
    getmontoinicial() {
        console.log('Este es el monto' + this.monto);

    }
    getsaldoRest() {
        console.log('Este es el saldo que te falta por pagar' + this.saldoRestante);

    }
    getcuotaMens() {
        console.log('Esta es tu cuota mensual' + this.cuotaMensual);

    }
    getvalor() {
        console.log('Soy el total' + this.valorPagar);

    }
    getmeses() {
        console.log('Este es su plazo en meses' + this.plazo_meses);

    }
    getultimoPago() {
        console.log('Conmigo sabras el puntaje de tu score' + this.pagoFinalizado);

    }
}

class intAlto extends InteresesEA {

    calculoScore() {
        console.log('hola');
        routerClass.get("/clase1", async (_req, res) => {
            console.log('Hola Brayan');

            const puntaje = await collection.score?.find({}).toArray();
            console.log(puntaje);
            // const puntaje1 = puntaje[0]
            // const {score} = JSON.stringify(puntaje1)
            // console.log(score);
            
            try {
                console.log('helppp');
                
                if (this.pagoFinalizado) {
                    this.score = this.score + 20;
                    console.log('hola2' + this.score);
                    return this.score;
                } else {
                    return ('Your score failed');
                }
            } catch (error) {
                console.log(error);
            }
        });
    }
    // getcalculoScore(){
    //     console.log('Estas en el get del score');

    //     console.log('Score' + this.score);
    //     return this.score;

    // }
    // calcular(){
    //     console.log('Estas en calcular de posgrest');

    //     routerClass.get("/clase2", async (req, res) =>{
    //     let cliente = await pool.connect();
    //     try {
    //       const result: QueryResult = await pool.query('SELECT prestamo.tasa_interes, prestamo.plazo_en_meses, pago.valor_pagar, pago.saldo_restante, pago.cuota_pagar FROM prestamo RIGHT JOIN pago ON prestamo.tasa_interes = pago.id ORDER BY prestamo.tasa_interes;');
    //       this.calculoScore();

    //       this.monto * this.interes / this.plazo_meses;
    //       this.monto = this.monto;
    //       this.valorPagar = this.monto + this.interes; 
    //       return this.valorPagar;
    //     } catch (err) {
    //       console.log(err);
    //     } finally {
    //       cliente.release(true)
    //   } 
    // }
    // )};
    // getTotal() {
    //     console.log('Total a pagar:' + this.valorPagar);
    //     return this.valorPagar;

    // }
}
const prin = new InteresesEA();
prin.getvalor();

const clase = new intAlto();
clase.calculoScore();
// clase.getcalculoScore();
// clase.calcular();
// clase.getTotal();


export default routerClass;