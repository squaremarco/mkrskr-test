import * as Joi from 'joi';

export const configValidationSchema = Joi.object<NodeJS.ProcessEnv>({
  MONGO_HOST: Joi.string().default('localhost'),
  MONGO_PORT: Joi.string().default('27017'),
  MONGO_DATABASE: Joi.string().default('mkrskr'),
  PORT: Joi.number().default(4000)
});
