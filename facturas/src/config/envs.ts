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
 DATABASE_URL:string;
}

const _envs = {
  PORT: process.env.PORT,
 DATABASE_URL: process.env.DATABASE_URL,
};

const envsSchema = joi.object({
  PORT: joi.number().required(),
 DATABASE_URL: joi.string().required(),

}).unknown(false); 

const { error, value } = envsSchema.validate(_envs, {
  abortEarly: false,
  convert: true,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs = {
  PORT: value.PORT,
DATABASE_URL:  value.DATABASE_URL
};