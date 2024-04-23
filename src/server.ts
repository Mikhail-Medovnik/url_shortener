import cors from '@fastify/cors';
import formBody from '@fastify/formbody';
import helmet from '@fastify/helmet';
import RateLimit from '@fastify/rate-limit';
import fastify from 'fastify';
import fastifyHtml from 'fastify-html';
import { fastifyPostgresJs } from 'fastify-postgres-dot-js';
import { env } from './env.js';
import { getLogger } from './logger.js';
import { routes } from './routes.js';

const server = fastify({
  logger: getLogger(),
  ignoreDuplicateSlashes: true,
  ignoreTrailingSlash: true,
});

server.register(helmet);
server.register(formBody);
server.register(RateLimit, {
  max: 999999,
  timeWindow: '1 minute',
});
server.register(fastifyHtml);

server.register(fastifyPostgresJs, {
  user: 'mmedovnik',
  password: '236435',
  host: 'localhost',
  port: 5433,
  database: 'postgres',
});

server.register(routes);

if (env.CORS !== '') {
  server.register(cors, { origin: env.CORS.split(',') });
}

export { server };
