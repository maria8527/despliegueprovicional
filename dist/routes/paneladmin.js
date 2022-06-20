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
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const adminTokens_1 = require("../firebase/adminTokens");
const db_1 = require("../services/db");
exports.adminRouter = express_1.default.Router();
exports.adminRouter.use(express_1.default.json());
exports.adminRouter.get("/historial", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield db_1.pool.connect();
    try {
        const result = yield db_1.pool.query('registro.n_documento, registro.tipo_documento, registro.nombre_completo, registro.fecha_nacimiento, registro.numero_celular, registro.email, registro.profesion_u_oficio, registro.direccion, registro.rol, registro.contrasena, prestamo.monto_prestar, prestamo.plazo_en_meses, prestamo.fecha_creacion, prestamo.tasa_interes, prestamo.estado, prestamo.id_registro FROM registro FULL OUTER JOIN prestamo ON registro.id = prestamo.id ORDER BY registro.id, prestamo.id;');
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
exports.adminRouter.get("/historial/:id", adminTokens_1.decodeToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.adminRouter.delete("/historial/:id", adminTokens_1.decodeToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=paneladmin.js.map