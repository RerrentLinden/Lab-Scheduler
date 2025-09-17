import dayjs from 'dayjs';

export async function seed(knex) {
  await knex('reservations').insert([
    {
      id: 1,
      instrument_id: 1,
      user_id: 2,
      start_time: dayjs().add(1, 'day').hour(9).minute(0).second(0).toDate(),
      end_time: dayjs().add(1, 'day').hour(11).minute(0).second(0).toDate(),
      status: 'confirmed',
      notes: '药物样品检测',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      instrument_id: 2,
      user_id: 2,
      start_time: dayjs().add(2, 'day').hour(14).minute(0).second(0).toDate(),
      end_time: dayjs().add(2, 'day').hour(16).minute(0).second(0).toDate(),
      status: 'confirmed',
      notes: 'PCR 扩增',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      instrument_id: 1,
      user_id: 1,
      start_time: dayjs().subtract(3, 'day').hour(10).minute(0).second(0).toDate(),
      end_time: dayjs().subtract(3, 'day').hour(12).minute(0).second(0).toDate(),
      status: 'cancelled',
      notes: '维护安排',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}
