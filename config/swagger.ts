import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger'

export default {
  uiEnabled: true, //disable or enable swaggerUi route
  uiUrl: '/api-docs', // url path to swaggerUI
  specEnabled: true, //disable or enable swagger.json route
  specUrl: '/swagger/spec',

  middleware: [], // middlewares array, for protect your swagger docs and spec endpoints

  options: {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Brain Producer - API',
        version: '1.0.0',
        description: 'Documentação de endpoints da API',
      },
    },

    apis: ['app/**/*.ts', 'start/routes.ts'],
    basePath: '/',
  },
  mode: 'PRODUCTION',
  specFilePath: 'swagger.json',
} as SwaggerConfig
