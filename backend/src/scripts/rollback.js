import db from '../db/knex.js';

async function run() {
  try {
    await db.migrate.rollback(undefined, true);
    console.log('数据库已回滚');
  } catch (error) {
    console.error('回滚失败', error);
    process.exitCode = 1;
  } finally {
    await db.destroy();
  }
}

run();
