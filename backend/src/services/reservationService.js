import dayjs from 'dayjs';
import db from '../db/knex.js';

const MIN_ADVANCE_MINUTES = 30;
const MAX_DURATION_HOURS = 4;

function normalizeReservation(row) {
  if (!row) return null;
  return {
    ...row,
    start_time: row.start_time instanceof Date ? row.start_time : new Date(row.start_time),
    end_time: row.end_time instanceof Date ? row.end_time : new Date(row.end_time)
  };
}

export async function listReservations(filters = {}) {
  const query = db('reservations as r')
    .select(
      'r.*',
      'i.name as instrument_name',
      'i.code as instrument_code',
      'u.name as user_name'
    )
    .leftJoin('instruments as i', 'r.instrument_id', 'i.id')
    .leftJoin('users as u', 'r.user_id', 'u.id');
  if (filters.instrumentId) {
    query.where('r.instrument_id', Number(filters.instrumentId));
  }
  if (filters.userId) {
    query.where('r.user_id', Number(filters.userId));
  }
  if (filters.startDate) {
    query.where('r.start_time', '>=', filters.startDate);
  }
  if (filters.endDate) {
    query.where('r.end_time', '<=', filters.endDate);
  }
  if (filters.status) {
    query.whereIn('r.status', Array.isArray(filters.status) ? filters.status : [filters.status]);
  }
  const rows = await query.orderBy('r.start_time');
  return rows.map(normalizeReservation);
}

export async function getReservationById(id) {
  const row = await db('reservations').where({ id: Number(id) }).first();
  return normalizeReservation(row);
}

export function validateTimes(startTime, endTime, { allowPastStart = false } = {}) {
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  if (!start.isValid() || !end.isValid()) {
    throw new Error('请输入合法的起止时间。');
  }
  if (!end.isAfter(start)) {
    throw new Error('结束时间必须晚于开始时间。');
  }
  if (end.diff(start, 'hour', true) > MAX_DURATION_HOURS) {
    throw new Error(`单次预约时长不可超过 ${MAX_DURATION_HOURS} 小时。`);
  }
  if (!allowPastStart) {
    const diffMinutes = start.diff(dayjs(), 'minute');
    if (diffMinutes < MIN_ADVANCE_MINUTES) {
      throw new Error(`预约需至少提前 ${MIN_ADVANCE_MINUTES} 分钟提交。`);
    }
  }
  return { start, end };
}

export async function createReservation({
  instrumentId,
  userId,
  startTime,
  endTime,
  notes,
  allowPastStart = false
}) {
  const instrumentKey = Number(instrumentId);
  const userKey = Number(userId);
  const { start, end } = validateTimes(startTime, endTime, { allowPastStart });

  const conflict = await db('reservations')
    .where('instrument_id', instrumentKey)
    .whereNotIn('status', ['cancelled'])
    .andWhere((builder) => {
      builder.where((inner) => {
        inner.where('start_time', '<', end.toDate()).andWhere('end_time', '>', start.toDate());
      });
    })
    .first();

  if (conflict) {
    throw new Error('该时间段与现有预约冲突，请选择其他时段。');
  }

  const ids = await db('reservations').insert({
    instrument_id: instrumentKey,
    user_id: userKey,
    start_time: start.toDate(),
    end_time: end.toDate(),
    status: 'confirmed',
    notes: notes || null,
    created_at: new Date(),
    updated_at: new Date()
  });
  const insertedId = Array.isArray(ids) ? ids[0] : ids;
  return getReservationById(insertedId);
}

export async function cancelReservation({ reservationId, actor }) {
  const reservation = await db('reservations').where({ id: Number(reservationId) }).first();
  if (!reservation) {
    throw new Error('预约记录不存在。');
  }
  const isOwner = actor && reservation.user_id === actor.id;
  const isAdmin = actor && actor.role === 'admin';
  if (!isOwner && !isAdmin) {
    throw new Error('您无权取消该预约。');
  }
  if (!isAdmin) {
    const minutesUntilStart = dayjs(reservation.start_time).diff(dayjs(), 'minute');
    if (minutesUntilStart < MIN_ADVANCE_MINUTES) {
      throw new Error('距离预约开始不足 30 分钟，无法取消。');
    }
  }
  await db('reservations')
    .where({ id: reservationId })
    .update({ status: 'cancelled', updated_at: new Date() });
  return getReservationById(reservationId);
}

export async function getUpcomingReservations({ limit = 5, userId } = {}) {
  const query = db('reservations as r')
    .select(
      'r.*',
      'i.name as instrument_name',
      'i.room as instrument_room',
      'u.name as user_name'
    )
    .leftJoin('instruments as i', 'r.instrument_id', 'i.id')
    .leftJoin('users as u', 'r.user_id', 'u.id')
    .where('r.start_time', '>=', new Date())
    .whereNot('r.status', 'cancelled')
    .orderBy('r.start_time')
    .limit(limit);
  if (userId) {
    query.andWhere('r.user_id', userId);
  }
  const rows = await query;
  return rows.map(normalizeReservation);
}

export async function getDailyReservations({ instrumentId, date }) {
  const start = dayjs(date).startOf('day');
  const end = start.add(1, 'day');
  const rows = await listReservations({
    instrumentId,
    startDate: start.toDate(),
    endDate: end.toDate()
  });
  return rows.map(normalizeReservation);
}
