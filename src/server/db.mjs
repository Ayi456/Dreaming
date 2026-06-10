import { createDatabaseConfig } from "./config.mjs";

export async function createMysqlPool(config = createDatabaseConfig()) {
  const mysql = await import("mysql2/promise");
  return mysql.createPool(config);
}

export async function createMysqlConnection(config = createDatabaseConfig()) {
  const mysql = await import("mysql2/promise");
  return mysql.createConnection(config);
}
