// import * as dotenv from 'dotenv';
// import * as joi from 'joi';

// dotenv.config();

// interface EnvVars {
//   PORT: number;
//   MS_USER_HOST: string;
//   MS_USER_PORT: number;

//   MS_PRODUCT_HOST:string;
//   MS_PRODUCT_PORT:number;
// }

// const envsSchema = joi
//   .object({
//     PORT: joi.number().required(),
//     MS_USER_HOST: joi.string().required(),
//     MS_USER_PORT: joi.number().required(),

//     MS_PRODUCT_HOST:joi.string().required(),
//     MS_PRODUCT_PORT: joi.number().required(),
//   })
//   .unknown(true);//permite otras variables no definidas

// const { error, value } = envsSchema.validate(process.env);

// if (error) throw new Error(`Config validation error: ${error.message}`);

// const envVars: EnvVars = value;

// export const envs = {
//   PORT: envVars.PORT,
//   MS_USER_HOST: envVars.MS_USER_HOST,
//   MS_USER_PORT: envVars.MS_USER_PORT,

//   MS_PRODUCT_HOST: envVars.MS_PRODUCT_HOST,
//   MS_PRODUCT_PORT: envVars.MS_PRODUCT_PORT
// };

import * as dotenv from 'dotenv';
import * as joi from 'joi';

// Cargamos las variables desde .env
dotenv.config();

// Interfaz con las variables que usará el gateway
interface EnvVars {
  PORT: number;
  MS_USER_HOST: string;
  MS_USER_PORT: number;
  MS_PRODUCT_HOST: string;
  MS_PRODUCT_PORT: number;
  MS_FACTURA_HOST:string;
  MS_FACTURA_PORT:number;
  JWT_SECRET: string;

}

// Solo tomamos las variables que nos interesan (ignoramos las del sistema)
const _envs = {
  PORT: process.env.PORT,
  MS_USER_HOST: process.env.MS_USER_HOST,
  MS_USER_PORT: process.env.MS_USER_PORT,
  MS_PRODUCT_HOST: process.env.MS_PRODUCT_HOST,
  MS_PRODUCT_PORT: process.env.MS_PRODUCT_PORT,
  MS_FACTURA_HOST: process.env.MS_FACTURA_HOST,
  MS_FACTURA_PORT:process.env.MS_FACTURA_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
};

// Esquema de validación – TODAS deben estar aquí
const envsSchema = joi.object({
  PORT: joi.number().required(),
  MS_USER_HOST: joi.string().required(),
  MS_USER_PORT: joi.number().required(),
  MS_PRODUCT_HOST: joi.string().required(),
  MS_PRODUCT_PORT: joi.number().required(),
  MS_FACTURA_HOST:joi.string().required(),
  MS_FACTURA_PORT:joi.number().required(),
  JWT_SECRET: joi.string().required(),
}).unknown(false); // ❌ No permitimos variables extras

// Validamos solo las variables definidas por nosotros
const { error, value } = envsSchema.validate(_envs, {
  abortEarly: false,
  convert: true, // 👈 Esto convierte automáticamente strings a números
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
// Aseguramos el tipo usando la interfaz EnvVars
const validatedEnvs = value as EnvVars;

// Exportamos las variables ya validadas y con tipos correctos
export const envs = {
  PORT: validatedEnvs.PORT,
  MS_USER_HOST: validatedEnvs.MS_USER_HOST,
  MS_USER_PORT: validatedEnvs.MS_USER_PORT,
  MS_PRODUCT_HOST: validatedEnvs.MS_PRODUCT_HOST,
  MS_PRODUCT_PORT: validatedEnvs.MS_PRODUCT_PORT,
  MS_FACTURA_HOST:validatedEnvs.MS_FACTURA_HOST,
  MS_FACTURA_PORT:validatedEnvs.MS_FACTURA_PORT,
    JWT_SECRET: validatedEnvs.JWT_SECRET, 
};