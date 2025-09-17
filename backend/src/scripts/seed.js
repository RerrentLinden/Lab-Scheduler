import db from '../db/knex.js';

async function run() {
  try {
    await db.seed.run();
    console.log('示例数据准备完成');
  } catch (error) {
    console.error('数据填充失败', error);
    process.exitCode = 1;
  } finally {
    await db.destroy();
  }
}

run();
