import app from './app.js';
import db from './db/knex.js';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

async function start() {
  try {
    await db.raw('select 1');
    app.listen(port, () => {
      console.log(`Lab Scheduler server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to database', error);
    process.exit(1);
  }
}

start();
