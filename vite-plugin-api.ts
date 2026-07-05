import { Plugin, loadEnv } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';

export default function cloudinaryApiPlugin(mode: string): Plugin {
  return {
    name: 'cloudinary-api',
    configureServer(server) {
      const env = loadEnv(mode, process.cwd(), '');
      
      server.middlewares.use(
        '/api/cloudinary',
        async (req: IncomingMessage, res: ServerResponse) => {
          if (req.method !== 'GET') {
            res.statusCode = 405;
            res.end('Method not allowed');
            return;
          }

          const cloudName = env.CLOUD_NAME;
          const apiKey = env.CLOUDINARY_API_KEY;
          const apiSecret = env.CLOUDINARY_API_KEY_SECRET;

          if (!cloudName || !apiKey || !apiSecret) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Missing Cloudinary credentials' }));
            return;
          }

          try {
            const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
            const response = await fetch(
              `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?max_results=500`,
              {
                headers: {
                  Authorization: `Basic ${credentials}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error(`Cloudinary API error: ${response.status}`);
            }

            const data = await response.json();

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          } catch (error) {
            console.error('Cloudinary fetch error:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to fetch images' }));
          }
        }
      );
    },
  };
}
