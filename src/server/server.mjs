import { createServer } from "node:http";
import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createDatabaseConfig, createServerConfig, loadEnvFile } from "./config.mjs";
import { createMysqlPool } from "./db.mjs";
import { listGalleryItems } from "./galleryRepository.mjs";
import { serveStaticFile } from "./staticFiles.mjs";

const defaultRoot = resolve(fileURLToPath(new URL("../..", import.meta.url)));

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

export function createAppServer({ root = defaultRoot, databaseConfig = createDatabaseConfig() } = {}) {
  let pool;

  async function getPool() {
    if (!pool) {
      pool = await createMysqlPool(databaseConfig);
    }
    return pool;
  }

  const server = createServer(async (request, response) => {
    const url = new URL(request.url, "http://localhost");

    if (url.pathname === "/api/gallery") {
      try {
        const items = await listGalleryItems(await getPool());
        sendJson(response, 200, { items });
      } catch (error) {
        sendJson(response, 503, {
          error: "Gallery database unavailable"
        });
      }
      return;
    }

    serveStaticFile(root, request, response);
  });

  server.on("close", async () => {
    if (pool) {
      await pool.end();
    }
  });

  return server;
}

export function startServer({
  root = defaultRoot,
  env = process.env,
  infoFile = ".dev-server.json"
} = {}) {
  loadEnvFile(".env", env);
  const serverConfig = createServerConfig(env);
  const databaseConfig = createDatabaseConfig(env);
  const server = createAppServer({ root, databaseConfig });

  server.on("error", (error) => {
    throw error;
  });

  server.listen(serverConfig.port, serverConfig.host, () => {
    const info = {
      url: `http://localhost:${serverConfig.port}`,
      host: serverConfig.host,
      port: serverConfig.port,
      pid: process.pid
    };
    writeFileSync(join(root, infoFile), JSON.stringify(info, null, 2));
    console.log(JSON.stringify(info));
  });

  return server;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startServer();
}
