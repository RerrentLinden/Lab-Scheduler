import { beforeAll, afterAll, beforeEach } from 'vitest';

process.env.NODE_ENV = 'test';
process.env.DB_CLIENT = 'sqlite3';

let db;

beforeAll(async () => {
  const module = await import('../src/db/knex.js');
  db = module.default;
  await db.migrate.latest();
  await db.seed.run();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

export async function getDb() {
  if (!db) {
    const module = await import('../src/db/knex.js');
    db = module.default;
  }
  return db;
}
