import * as dotenv from 'dotenv';
import * as joi from 'joi';

dotenv.config();

interface EnvVars {
  PORT: number;
  HOST: string;
  DB_PORT:number;//agregue esto porque me daba error en el app module
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

const _envs = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,

  DB_PORT: process.env.DB_PORT,//agregue esto porque me daba error en el app module
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
};

const envsSchema = joi.object({
  PORT: joi.number().required(),
  HOST: joi.string().required(),
  DB_PORT: joi.number().required(),//agregue esto porque me daba error en el app module
  DB_HOST: joi.string().required(),
  DB_USERNAME: joi.string().required(),
  DB_PASSWORD: joi.string().allow('', null).optional(),
  DB_NAME: joi.string().required(),
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
  HOST: value.HOST,
  DB_PORT: value.DB_PORT,//agregue esto porque me daba error en el app module
  DB_HOST: value.DB_HOST,
  DB_USERNAME: value.DB_USERNAME,
  DB_PASSWORD: value.DB_PASSWORD,
  DB_NAME: value.DB_NAME,
};