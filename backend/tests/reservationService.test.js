import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';
import { getDb } from './setup.js';
import {
  cancelReservation,
  createReservation
} from '../src/services/reservationService.js';

const instrumentId = 1;
const userId = 2;

describe('reservationService', () => {
  it('rejects overlapping reservations for the same instrument', async () => {
    const start = dayjs().add(1, 'day').hour(9).minute(30).second(0).toISOString();
    const end = dayjs().add(1, 'day').hour(10).minute(30).second(0).toISOString();
    await expect(
      createReservation({
        instrumentId,
        userId,
        startTime: start,
        endTime: end,
        notes: '冲突测试'
      })
    ).rejects.toThrow(/冲突/);
  });

  it('enforces maximum reservation duration of four hours', async () => {
    const start = dayjs().add(3, 'day').hour(8).minute(0).second(0);
    const end = start.add(5, 'hour');
    await expect(
      createReservation({
        instrumentId,
        userId,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        notes: '长时间测试'
      })
    ).rejects.toThrow(/不可超过 4 小时/);
  });

  it('requires reservations to be submitted at least 30 minutes ahead of start time', async () => {
    const start = dayjs().add(10, 'minute');
    const end = start.add(1, 'hour');
    await expect(
      createReservation({
        instrumentId,
        userId,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        notes: '提前时间测试'
      })
    ).rejects.toThrow(/至少提前 30 分钟/);
  });

  it('prevents normal users from cancelling within 30 minutes of start', async () => {
    const db = await getDb();
    const soonStart = dayjs().add(20, 'minute');
    const [reservationId] = await db('reservations').insert({
      instrument_id: instrumentId,
      user_id: userId,
      start_time: soonStart.toDate(),
      end_time: soonStart.add(1, 'hour').toDate(),
      status: 'confirmed',
      notes: '临时测试',
      created_at: new Date(),
      updated_at: new Date()
    });

    await expect(
      cancelReservation({ reservationId, actor: { id: userId, role: 'user' } })
    ).rejects.toThrow(/不足 30 分钟/);
  });
});
