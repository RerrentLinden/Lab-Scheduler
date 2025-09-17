import db from '../db/knex.js';

async function run() {
  try {
    await db.migrate.latest();
    console.log('数据库迁移完成');
  } catch (error) {
    console.error('迁移失败', error);
    process.exitCode = 1;
  } finally {
    await db.destroy();
  }
}

run();
