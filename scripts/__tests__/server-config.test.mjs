import test from "node:test";
import assert from "node:assert/strict";
import { createDatabaseConfig } from "../../src/server/config.mjs";

test("database config uses local MySQL defaults", () => {
  const config = createDatabaseConfig({});

  assert.equal(config.host, "127.0.0.1");
  assert.equal(config.port, 3306);
  assert.equal(config.user, "root");
  assert.equal(config.password, "123456");
  assert.equal(config.database, "myweb");
});

test("database config can be switched to cloud values through environment", () => {
  const config = createDatabaseConfig({
    DB_HOST: "cloud.example.com",
    DB_PORT: "3307",
    DB_USER: "cloud_user",
    DB_PASSWORD: "cloud_password",
    DB_NAME: "cloud_gallery"
  });

  assert.equal(config.host, "cloud.example.com");
  assert.equal(config.port, 3307);
  assert.equal(config.user, "cloud_user");
  assert.equal(config.password, "cloud_password");
  assert.equal(config.database, "cloud_gallery");
});
