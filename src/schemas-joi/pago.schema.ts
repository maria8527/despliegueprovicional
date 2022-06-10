import Joi, { number, string, date } from 'joi';

 const pagoSchema = Joi.object({
    id: Joi.number(),
    fecha_pago_cuotas: Joi.date().required(),
    tiempo_pagar: Joi.number().required(),
    cuota_pagar: Joi.number().required(),
    id_prestamo: Joi.number().required(),
    id_registro: Joi.number().required()

 });
export default pagoSchema;