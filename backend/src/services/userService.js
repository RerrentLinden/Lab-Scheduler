import bcrypt from 'bcrypt';
import db from '../db/knex.js';

const SALT_ROUNDS = 10;

function serializeUser(user) {
  if (!user) return null;
  const { password_hash: passwordHash, ...rest } = user;
  return { ...rest };
}

export async function findByEmail(email) {
  const user = await db('users').where({ email }).first();
  return serializeUser(user);
}

export async function getUserById(id) {
  const user = await db('users').where({ id }).first();
  return serializeUser(user);
}

export async function createUser({ name, phone, email, password, role = 'user' }) {
  const existing = await db('users').where({ email }).first();
  if (existing) {
    throw new Error('该邮箱已被注册。');
  }
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const ids = await db('users').insert({
    name,
    phone,
    email,
    role,
    password_hash: passwordHash,
    created_at: new Date(),
    updated_at: new Date()
  });

  const insertedId = Array.isArray(ids) ? ids[0] : ids;
  let created = insertedId
    ? await db('users').where({ id: insertedId }).first()
    : null;
  if (!created) {
    created = await db('users').where({ email }).first();
  }
  return serializeUser(created);
}

export async function verifyCredentials(email, password) {
  const user = await db('users').where({ email }).first();
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;
  return serializeUser(user);
}
