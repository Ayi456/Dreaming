import { createServer } from "node:http";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const host = "127.0.0.1";
const startPort = Number(process.env.PORT || 5173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function resolveRequestPath(requestUrl) {
  const url = new URL(requestUrl, "http://localhost");
  const pathname = decodeURIComponent(url.pathname);
  const filePath = resolve(root, "." + pathname);

  if (!filePath.startsWith(root)) {
    return null;
  }

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    return join(filePath, "index.html");
  }

  return filePath;
}

function createStaticServer() {
  return createServer((request, response) => {
    const filePath = resolveRequestPath(request.url);

    if (!filePath) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    if (!existsSync(filePath)) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    const mimeType = mimeTypes[extname(filePath)] || "application/octet-stream";
    response.writeHead(200, {
      "Content-Type": mimeType,
      "Cache-Control": "no-store"
    });
    response.end(readFileSync(filePath));
  });
}

function start(port) {
  const server = createStaticServer();

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE" && port < startPort + 20) {
      start(port + 1);
      return;
    }

    throw error;
  });

  server.listen(port, host, () => {
    const info = {
      url: `http://localhost:${port}`,
      host,
      port,
      pid: process.pid
    };
    writeFileSync(join(root, ".dev-server.json"), JSON.stringify(info, null, 2));
    console.log(JSON.stringify(info));
  });
}

start(startPort);
