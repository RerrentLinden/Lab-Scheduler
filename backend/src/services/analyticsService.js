import dayjs from 'dayjs';
import db from '../db/knex.js';

function durationHours(start, end) {
  const s = dayjs(start);
  const e = dayjs(end);
  return e.diff(s, 'minute') / 60;
}

export async function getOverviewMetrics() {
  const userRow = await db('users').count({ count: '*' }).first();
  const instrumentRow = await db('instruments').count({ count: '*' }).first();
  const activeUsersRow = await db('reservations')
    .where('start_time', '>=', dayjs().subtract(30, 'day').toDate())
    .countDistinct({ count: 'user_id' })
    .first();
  const upcomingRow = await db('reservations')
    .where('start_time', '>=', new Date())
    .whereNot('status', 'cancelled')
    .count({ count: '*' })
    .first();
  const cancellationRow = await db('reservations')
    .where('status', 'cancelled')
    .where('updated_at', '>=', dayjs().startOf('month').toDate())
    .count({ count: '*' })
    .first();

  const lastWeekStart = dayjs().subtract(6, 'day').startOf('day');
  const reservationRows = await db('reservations')
    .where('start_time', '>=', lastWeekStart.toDate())
    .whereNot('status', 'cancelled')
    .select('start_time', 'end_time');

  const totalHours = reservationRows.reduce((sum, row) => sum + durationHours(row.start_time, row.end_time), 0);
  const instrumentCount = Number(instrumentRow?.count || 0);
  const theoreticalCapacity = instrumentCount * 7 * 12; // 假定每日开放 12 小时
  const utilization = theoreticalCapacity ? Math.min(1, totalHours / theoreticalCapacity) : 0;

  return {
    totalUsers: Number(userRow?.count || 0),
    instrumentCount,
    activeUsers: Number(activeUsersRow?.count || 0),
    upcomingReservations: Number(upcomingRow?.count || 0),
    cancellationsThisMonth: Number(cancellationRow?.count || 0),
    utilization
  };
}

export async function getMonthlyUsage(months = 6) {
  const now = dayjs();
  const buckets = [];
  for (let i = months - 1; i >= 0; i -= 1) {
    const month = now.subtract(i, 'month');
    const key = month.format('YYYY-MM');
    buckets.push({
      key,
      label: month.format('YYYY年MM月'),
      start: month.startOf('month'),
      end: month.endOf('month'),
      reservations: 0,
      hours: 0
    });
  }
  const earliest = buckets[0]?.start;
  if (!earliest) return [];
  const rows = await db('reservations')
    .where('start_time', '>=', earliest.toDate())
    .select('start_time', 'end_time', 'status');
  rows.forEach((row) => {
    const monthKey = dayjs(row.start_time).format('YYYY-MM');
    const bucket = buckets.find((item) => item.key === monthKey);
    if (!bucket) return;
    bucket.reservations += 1;
    if (row.status !== 'cancelled') {
      bucket.hours += durationHours(row.start_time, row.end_time);
    }
  });
  return buckets.map(({ key, label, reservations, hours }) => ({ key, label, reservations, hours }));
}

export async function getInstrumentLeaderboard(limit = 5) {
  const rows = await db('reservations as r')
    .select('i.id', 'i.name', 'i.code', 'i.category', 'r.start_time', 'r.end_time', 'r.status')
    .leftJoin('instruments as i', 'r.instrument_id', 'i.id')
    .whereNot('r.status', 'cancelled');
  const stats = new Map();
  rows.forEach((row) => {
    const key = row.id;
    if (!stats.has(key)) {
      stats.set(key, {
        instrumentId: row.id,
        name: row.name,
        code: row.code,
        category: row.category,
        reservations: 0,
        hours: 0
      });
    }
    const current = stats.get(key);
    current.reservations += 1;
    current.hours += durationHours(row.start_time, row.end_time);
  });
  return Array.from(stats.values())
    .sort((a, b) => b.hours - a.hours)
    .slice(0, limit);
}

export async function getCancellationOverview() {
  const totalRow = await db('reservations').count({ count: '*' }).first();
  const cancelledRow = await db('reservations').where('status', 'cancelled').count({ count: '*' }).first();
  const lastMonthCancelledRow = await db('reservations')
    .where('status', 'cancelled')
    .where('updated_at', '>=', dayjs().subtract(30, 'day').toDate())
    .count({ count: '*' })
    .first();
  return {
    total: Number(totalRow?.count || 0),
    cancelled: Number(cancelledRow?.count || 0),
    cancelledLast30Days: Number(lastMonthCancelledRow?.count || 0)
  };
}
