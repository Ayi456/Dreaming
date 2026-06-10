import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

export function loadEnvFile(filePath = ".env", target = process.env) {
  const resolvedPath = resolve(filePath);
  if (!existsSync(resolvedPath)) return target;

  const lines = readFileSync(resolvedPath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) return;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");
    if (key && target[key] === undefined) {
      target[key] = value;
    }
  });

  return target;
}

export function createDatabaseConfig(env = process.env) {
  return {
    host: env.DB_HOST || "127.0.0.1",
    port: Number(env.DB_PORT || 3306),
    user: env.DB_USER || "root",
    password: env.DB_PASSWORD || "123456",
    database: env.DB_NAME || "myweb",
    waitForConnections: true,
    connectionLimit: Number(env.DB_CONNECTION_LIMIT || 10)
  };
}

export function createServerConfig(env = process.env) {
  return {
    host: env.HOST || "127.0.0.1",
    port: Number(env.PORT || 5173)
  };
}
