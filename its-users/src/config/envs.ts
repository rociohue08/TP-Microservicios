/* 
El envs se encarga de:
1. Cargar las variables de entorno con dotenv
2. Define una interfaz EnvVars con las variables que necesitas
3. Valida que existan y sean del tipo correcto usando Joi
4. Exporta un objeto envs con los valores validados
*/

import * as dotenv from 'dotenv';
import * as joi from 'joi';

dotenv.config();

interface EnvVars {
  PORT: number;
  HOST: string;

  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;

  MS_USER_HOST: string;
  MS_USER_PORT: number;

  MS_PRODUCTO_HOST: string;
  MS_PRODUCTO_PORT: number;

  MS_FACTURA_HOST: string;
  MS_FACTURA_PORT: number;

  JWT_SEED: string;
}

const _envs = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,

  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,

  MS_USER_HOST: process.env.MS_USER_HOST,
  MS_USER_PORT: process.env.MS_USER_PORT,

  MS_PRODUCTO_HOST: process.env.MS_PRODUCTO_HOST,
  MS_PRODUCTO_PORT: process.env.MS_PRODUCTO_PORT,

  MS_FACTURA_HOST: process.env.MS_FACTURA_HOST,
  MS_FACTURA_PORT: process.env.MS_FACTURA_PORT,

  JWT_SEED: process.env.JWT_SEED,
};

const envsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required(),
    HOST: joi.string().required(),

    DB_HOST: joi.string().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().allow('', null).optional(),
    DB_NAME: joi.string().required(),

    MS_USER_HOST: joi.string().hostname().required(),
    MS_USER_PORT: joi.number().port().required(),

    MS_PRODUCTO_HOST: joi.string().hostname().required(),
    MS_PRODUCTO_PORT: joi.number().port().required(),

    MS_FACTURA_HOST: joi.string().hostname().required(),
    MS_FACTURA_PORT: joi.number().port().required(),

 
    JWT_SEED: joi.string().min(8).required(),
  })
  .unknown(false); 

const { error, value } = envsSchema.validate(_envs, {
  abortEarly: false,
  convert: true, 
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs = {
  PORT: value.PORT,
  HOST: value.HOST,

  DB_HOST: value.DB_HOST,
  DB_USERNAME: value.DB_USERNAME,
  DB_PASSWORD: value.DB_PASSWORD,
  DB_NAME: value.DB_NAME,

  MS_USER_HOST: value.MS_USER_HOST,
  MS_USER_PORT: value.MS_USER_PORT,

  MS_PRODUCTO_HOST: value.MS_PRODUCTO_HOST,
  MS_PRODUCTO_PORT: value.MS_PRODUCTO_PORT,

  MS_FACTURA_HOST: value.MS_FACTURA_HOST,
  MS_FACTURA_PORT: value.MS_FACTURA_PORT,

  JWT_SEED: value.JWT_SEED,
};