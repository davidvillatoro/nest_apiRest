import * as Joi from 'joi'; // se pone el * para importar todas la caracteristicas del paquete

//para validar los datos -----------------



export const JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT:Joi.number().default(10) ,

});