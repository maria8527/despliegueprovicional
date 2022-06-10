"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_1 = __importDefault(require("../utilities/validator"));
const registro_schema_1 = __importDefault(require("../schemas-joi/registro.schema"));
const prestamo_schema_1 = __importDefault(require("../schemas-joi/prestamo.schema"));
const pago_schema_1 = __importDefault(require("../schemas-joi/pago.schema"));
const db_1 = require("../services/db");
const router = (0, express_1.Router)();
router.get('/registro', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        const result = yield db_1.pool.query('SELECT * FROM registro;');
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
router.get('/registro/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    const id = parseInt(req.params.id);
    const result = yield db_1.pool.query('SELECT * FROM registro WHERE id = $1;', [id]);
    try {
        return res.json(result.rows[0]);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
router.post("/registro", validator_1.default.body(registro_schema_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        const { nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, n_documento, profesion_u_oficio, direccion, email, rol, contrasena } = req.body;
        const result = yield db_1.pool.query('INSERT INTO registro (nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, n_documento, profesion_u_oficio, direccion, email, rol, contrasena) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);', ([nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, n_documento, profesion_u_oficio,
            direccion, email, rol, contrasena]));
        res.json({
            message: 'User register successfully',
            body: {
                user: { nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, n_documento,
                    profesion_u_oficio, direccion, email, rol, contrasena }
            }
        });
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
router.put("/registro/:id", validator_1.default.body(registro_schema_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        const id = parseInt(req.params.id);
        const { nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, n_documento, profesion_u_oficio, direccion, email, rol, contrasena } = req.body;
        const result = yield db_1.pool.query('UPDATE registro SET nombre_completo = $1, fecha_nacimiento = $2, numero_celular = $3, tipo_documento = $4, n_documento = $5, profesion_u_oficio = $6, direccion = $7, email = $8, rol = $9, contrasena = $10 WHERE id = $11;', [
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
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
router.delete("/registro/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        const { id } = req.params;
        yield db_1.pool.query(`DELETE FROM registro WHERE id = ${id};`);
        res.status(200).json('User deleted successfully');
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
router.get("/prestamo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        const result = yield db_1.pool.query('SELECT * FROM prestamo;');
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
router.get("/prestamo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        console.log('params: ');
        const id = parseInt(req.params.id);
        const result = yield db_1.pool.query('SELECT * FROM prestamo WHERE id = $1;', [id]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
router.post("/prestamo", validator_1.default.body(prestamo_schema_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        const { nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado, id_registro } = req.body;
        const result = yield db_1.pool.query('INSERT INTO prestamo (nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado, id_registro) VALUES ($1,$2,$3,$4,$5,$6,$7);', ([nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado, id_registro]));
        res.json({
            message: 'lend lease register successfully',
            body: {
                user: { nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado, id_registro }
            }
        });
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
router.put("/prestamo/:id", validator_1.default.body(prestamo_schema_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        const id = parseInt(req.params.id);
        const { nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado, id_registro } = req.body;
        const result = yield db_1.pool.query('UPDATE prestamo SET nombre_completo = $1, fecha_creacion = $2, monto_prestar = $3, plazo_en_meses = $4, tasa_interes = $5, estado = $6 id_registro = $7 WHERE id = $8;', [nombre_completo,
            fecha_creacion,
            monto_prestar,
            plazo_en_meses,
            tasa_interes,
            estado,
            id_registro,
            id
        ]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
router.delete("/prestamo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        const { id } = req.params;
        yield db_1.pool.query(`DELETE FROM prestamo  WHERE id = ${id};`);
        res.status(200).json('lend lease deleted successfully');
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
router.get("/pago", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        const result = yield db_1.pool.query('SELECT * FROM pago;');
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
router.get("/pago/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        console.log('params: ');
        const id = parseInt(req.params.id);
        const result = yield db_1.pool.query('SELECT * FROM pago WHERE id = $1;', [id]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
router.post("/pago", validator_1.default.body(pago_schema_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        const { fecha_pago_cuotas, tiempo_pagar, cuota_pagar, id_prestamo, id_registro } = req.body;
        const result = yield db_1.pool.query('INSERT INTO pago (fecha_pago_cuotas, tiempo_pagar, cuota_pagar, id_prestamo, id_registro) VALUES ($1,$2,$3,$4,$5);', ([fecha_pago_cuotas, tiempo_pagar, cuota_pagar, id_prestamo, id_registro]));
        res.json({
            message: 'pyment register successfully',
            body: {
                user: { fecha_pago_cuotas, tiempo_pagar, cuota_pagar, id_prestamo, id_registro }
            }
        });
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
router.put("/pago/:id", validator_1.default.body(pago_schema_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        const id = parseInt(req.params.id);
        const { fecha_pago_cuotas, tiempo_pagar, cuota_pagar, id_prestamo, id_registro } = req.body;
        const result = yield db_1.pool.query('UPDATE pago SET fecha_pago_cuotas = $1, tiempo_pagar = $2, cuota_pagar = $3, id_prestamo = $4, id_registro = $5  WHERE id = $6;', [fecha_pago_cuotas,
            tiempo_pagar,
            cuota_pagar,
            id_prestamo,
            id_registro,
            id
        ]);
        res.status(200).json({ message: "update successfully" });
        console.log(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
router.delete("/pago/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        const { id } = req.params;
        yield db_1.pool.query(`DELETE FROM pago  WHERE id = ${id};`);
        res.status(200).json('payment deleted successfully');
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
router.get("/historial", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        const result = yield db_1.pool.query('SELECT * FROM historial;');
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
router.get("/historial/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        console.log('params: ');
        const id = parseInt(req.params.id);
        const result = yield db_1.pool.query('SELECT * FROM historial WHERE id = $1;', [id]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
router.delete("/historial/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        const { id } = req.params;
        yield db_1.pool.query(`DELETE FROM historial  WHERE id = ${id};`);
        res.status(200).json('historial deleted successfully');
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
exports.default = router;
//# sourceMappingURL=presta.router.js.map