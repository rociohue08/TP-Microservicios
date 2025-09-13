

import * as dotenv from 'dotenv';
import * as joi from 'joi';

dotenv.config();

interface EnvVars {
  PORT: number;
  MS_USER_HOST: string;
  MS_USER_PORT: number;
  MS_PRODUCT_HOST: string;
  MS_PRODUCT_PORT: number;
  MS_FACTURA_HOST:string;
  MS_FACTURA_PORT:number;
  JWT_SEED: string;

}

const _envs = {
  PORT: process.env.PORT,
  MS_USER_HOST: process.env.MS_USER_HOST,
  MS_USER_PORT: process.env.MS_USER_PORT,
  MS_PRODUCT_HOST: process.env.MS_PRODUCT_HOST,
  MS_PRODUCT_PORT: process.env.MS_PRODUCT_PORT,
  MS_FACTURA_HOST: process.env.MS_FACTURA_HOST,
  MS_FACTURA_PORT:process.env.MS_FACTURA_PORT,
  JWT_SEED: process.env.JWT_SEED,
};

const envsSchema = joi.object({
  PORT: joi.number().required(),
  MS_USER_HOST: joi.string().required(),
  MS_USER_PORT: joi.number().required(),
  MS_PRODUCT_HOST: joi.string().required(),
  MS_PRODUCT_PORT: joi.number().required(),
  MS_FACTURA_HOST:joi.string().required(),
  MS_FACTURA_PORT:joi.number().required(),
  JWT_SEED: joi.string().required(),
}).unknown(false); 

const { error, value } = envsSchema.validate(_envs, {
  abortEarly: false,
  convert: true, 
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const validatedEnvs = value as EnvVars;

export const envs = {
  PORT: validatedEnvs.PORT,
  MS_USER_HOST: validatedEnvs.MS_USER_HOST,
  MS_USER_PORT: validatedEnvs.MS_USER_PORT,
  MS_PRODUCT_HOST: validatedEnvs.MS_PRODUCT_HOST,
  MS_PRODUCT_PORT: validatedEnvs.MS_PRODUCT_PORT,
  MS_FACTURA_HOST:validatedEnvs.MS_FACTURA_HOST,
  MS_FACTURA_PORT:validatedEnvs.MS_FACTURA_PORT,
    JWT_SEED: validatedEnvs.JWT_SEED, 
};