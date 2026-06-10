import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";

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

export function resolveStaticPath(root, requestUrl) {
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

export function serveStaticFile(root, request, response) {
  const filePath = resolveStaticPath(root, request.url);

  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return true;
  }

  if (!existsSync(filePath)) {
    response.writeHead(404);
    response.end("Not found");
    return true;
  }

  const mimeType = mimeTypes[extname(filePath)] || "application/octet-stream";
  response.writeHead(200, {
    "Content-Type": mimeType,
    "Cache-Control": "no-store"
  });
  response.end(readFileSync(filePath));
  return true;
}
