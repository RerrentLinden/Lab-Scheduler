import { getOverviewMetrics } from '../services/analyticsService.js';
import { getInstrumentSummary, listInstruments } from '../services/instrumentService.js';
import { getUpcomingReservations } from '../services/reservationService.js';

export async function dashboardPage(req, res, next) {
  try {
    const [metrics, instrumentSummary, upcoming, availableInstruments] = await Promise.all([
      getOverviewMetrics(),
      getInstrumentSummary(),
      getUpcomingReservations({ limit: 5 }),
      listInstruments({ status: 'available' })
    ]);
    const personalReservations = await getUpcomingReservations({ limit: 5, userId: req.session.user.id });

    return res.render('dashboard', {
      title: '仪器概览',
      activeNav: 'dashboard',
      metrics,
      instrumentSummary,
      upcoming,
      personalReservations,
      availableInstruments: availableInstruments.slice(0, 5)
    });
  } catch (error) {
    return next(error);
  }
}

export async function dashboardData(req, res, next) {
  try {
    const metrics = await getOverviewMetrics();
    const upcoming = await getUpcomingReservations({ limit: 10 });
    return res.json({ metrics, upcoming });
  } catch (error) {
    return next(error);
  }
}
