import dayjs from 'dayjs';
import { listInstruments } from '../services/instrumentService.js';
import {
  cancelReservation,
  createReservation,
  getDailyReservations,
  listReservations
} from '../services/reservationService.js';

export async function calendarPage(req, res, next) {
  try {
    const instruments = await listInstruments();
    const selectedInstrumentId = req.query.instrumentId || (instruments[0] && instruments[0].id);
    const selectedDate = req.query.date || dayjs().format('YYYY-MM-DD');
    const reservations = selectedInstrumentId
      ? await getDailyReservations({ instrumentId: selectedInstrumentId, date: selectedDate })
      : [];

    return res.render('reservations/bookings', {
      title: '预约日历',
      activeNav: 'bookings',
      instruments,
      selectedInstrumentId,
      selectedDate,
      reservations
    });
  } catch (error) {
    return next(error);
  }
}

export async function createFromForm(req, res) {
  const { instrument_id: instrumentId, date, start_time: startTime, end_time: endTime, notes } = req.body;
  const redirectUrl = `/bookings?instrumentId=${instrumentId}&date=${date}`;
  try {
    const start = dayjs(`${date}T${startTime}`);
    const end = dayjs(`${date}T${endTime}`);
    await createReservation({
      instrumentId,
      userId: req.session.user.id,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      notes
    });
    req.session.flash = { type: 'success', message: '预约提交成功。' };
  } catch (error) {
    req.session.flash = { type: 'error', message: error.message || '预约失败，请检查时间安排。' };
  }
  return res.redirect(redirectUrl);
}

export async function cancelFromForm(req, res) {
  const { reservationId, instrumentId, date } = req.body;
  try {
    await cancelReservation({ reservationId, actor: req.session.user });
    req.session.flash = { type: 'success', message: '预约已取消。' };
  } catch (error) {
    req.session.flash = { type: 'error', message: error.message || '无法取消预约。' };
  }
  const redirectUrl = `/bookings?instrumentId=${instrumentId}&date=${date}`;
  return res.redirect(redirectUrl);
}

export async function listJson(req, res, next) {
  try {
    const { instrumentId, start, end } = req.query;
    const filters = {};
    if (instrumentId) filters.instrumentId = instrumentId;
    if (start) filters.startDate = dayjs(start).toDate();
    if (end) filters.endDate = dayjs(end).toDate();
    const reservations = await listReservations(filters);
    return res.json(reservations);
  } catch (error) {
    return next(error);
  }
}
