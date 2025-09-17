import db from '../db/knex.js';

export async function listInstruments(filters = {}) {
  const query = db('instruments').select('*');
  if (filters.status) {
    query.where('status', filters.status);
  }
  if (filters.category) {
    query.where('category', filters.category);
  }
  if (filters.search) {
    const term = `%${filters.search.toLowerCase()}%`;
    query.where((builder) => {
      builder
        .whereRaw('LOWER(name) like ?', [term])
        .orWhereRaw('LOWER(code) like ?', [term])
        .orWhereRaw('LOWER(manager) like ?', [term]);
    });
  }
  return query.orderBy('name');
}

export async function getInstrumentById(id) {
  return db('instruments').where({ id }).first();
}

export async function createInstrument(data) {
  const payload = {
    name: data.name,
    code: data.code,
    category: data.category,
    room: data.room,
    status: data.status || 'available',
    manager: data.manager,
    description: data.description,
    last_service: data.last_service,
    next_maintenance: data.next_maintenance,
    created_at: new Date(),
    updated_at: new Date()
  };
  const ids = await db('instruments').insert(payload);
  const insertedId = Array.isArray(ids) ? ids[0] : ids;
  return getInstrumentById(insertedId);
}

export async function updateInstrument(id, data) {
  await db('instruments')
    .where({ id })
    .update({
      name: data.name,
      code: data.code,
      category: data.category,
      room: data.room,
      status: data.status,
      manager: data.manager,
      description: data.description,
      last_service: data.last_service,
      next_maintenance: data.next_maintenance,
      updated_at: new Date()
    });
  return getInstrumentById(id);
}

export async function getInstrumentSummary() {
  const totalRow = await db('instruments').count({ count: '*' }).first();
  const statusRows = await db('instruments')
    .select('status')
    .count({ count: '*' })
    .groupBy('status');
  return {
    total: Number(totalRow?.count || 0),
    status: statusRows.map((row) => ({ status: row.status, count: Number(row.count) }))
  };
}
