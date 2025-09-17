import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import knex from 'knex';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

const environment = process.env.NODE_ENV || 'development';
let client = process.env.DB_CLIENT || 'mysql2';
let connection;

if (environment === 'test') {
  client = 'sqlite3';
  connection = { filename: ':memory:' };
} else if (client === 'sqlite3') {
  const dbFile = process.env.DB_NAME || path.resolve(__dirname, '../../database/lab_scheduler.sqlite3');
  connection = { filename: dbFile };
} else {
  connection = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'lab_scheduler'
  };
}

const knexInstance = knex({
  client,
  connection,
  useNullAsDefault: client === 'sqlite3',
  pool: environment === 'test' ? { min: 1, max: 1 } : { min: 2, max: 10 },
  migrations: {
    directory: path.resolve(__dirname, '../../migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, '../../seeds')
  }
});

export default knexInstance;
