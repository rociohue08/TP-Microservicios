/*el envs se encarga de:
1.cargar las variables de entorno
con dotenv 
2.define una interfaz envvars con las variables que necesitas
3.valida que existany sean de tippo correcto usando joi 
4.exporta un objeto envs con los valores validados*/

import * as dotenv from 'dotenv';
import * as joi from 'joi';

// Cargamos solo lo del .env
dotenv.config();

interface EnvVars {
  PORT: number;
  HOST: string;

  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

// 👇 Solo tomamos las variables que queremos validar
const _envs = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,

  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
};

const envsSchema = joi.object({
  PORT: joi.number().required(),
  HOST: joi.string().required(),

  DB_HOST: joi.string().required(),
  DB_USERNAME: joi.string().required(),
  DB_PASSWORD: joi.string().allow('', null).optional(),
  DB_NAME: joi.string().required(),
}).unknown(false); // ❌ No permitir variables extras

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
};