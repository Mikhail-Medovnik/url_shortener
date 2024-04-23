import fs from 'fs';
import { FastifyInstance, FastifyRequest } from 'fastify';
import randomstring from 'randomstring';

interface UrlPair {
  longurl: string;
  shorturl: string;
}
async function addUrlPairToDb(longUrl: string, shortUrl: string, req: FastifyRequest) {
  try {
    await req.server.sql`
  INSERT INTO "url" (longurl, shorturl)
  VALUES (${longUrl}, ${shortUrl})`;
  } catch (error) {
    console.error(error);
  }
}

export async function routes(fastify: FastifyInstance) {
  fastify.get('/', (_, res) => {
    const stream = fs.createReadStream('src/index.html');
    res.type('text/html').send(stream);
  });

  fastify.get('/s/:id', async (req, res) => {
    const { id } = req.params as { id: string };
    console.log('id', id);

    const storedItems: UrlPair[] = await req.server.sql`
    SELECT * FROM "url"`;

    const urlPair = storedItems.find((item) => item.shorturl === id);

    if (urlPair) {
      res.redirect(urlPair.longurl);
    } else {
      res.status(404).send('Not found');
    }
  });

  fastify.post('/shorten', async (req) => {
    const longUrl = req.body as string;
    const shortUrl = randomstring.generate({
      length: 10,
      charset: 'alphabetic',
      readable: false,
    }) as string;

    addUrlPairToDb(longUrl, shortUrl, req);
    return { longUrl, shortUrl };
  });
}
