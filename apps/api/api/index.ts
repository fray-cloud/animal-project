// Vercel Node Function entrypoint for the NestJS app.
//
// Local dev still uses apps/api/src/main.ts (`nx serve api`). This
// handler is only consumed by Vercel — it boots Nest once per cold
// start, caches the underlying express instance in a module-scope
// variable, and reuses it across warm invocations.

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@codegenie/serverless-express';
import express from 'express';
import type { Handler } from 'aws-lambda';
import { AppModule } from '../src/app/app.module';

let cachedHandler: Handler | undefined;

async function bootstrap(): Promise<Handler> {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.setGlobalPrefix('api');
  await app.init();
  return serverlessExpress({ app: expressApp });
}

const handler: Handler = async (event, context, callback) => {
  if (!cachedHandler) {
    cachedHandler = await bootstrap();
  }
  return cachedHandler(event, context, callback);
};

export default handler;
