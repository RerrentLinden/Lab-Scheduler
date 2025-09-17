import {
  getCancellationOverview,
  getInstrumentLeaderboard,
  getMonthlyUsage,
  getOverviewMetrics
} from '../services/analyticsService.js';

export async function analyticsPage(req, res, next) {
  try {
    const [overview, monthlyUsage, leaderboard, metrics] = await Promise.all([
      getCancellationOverview(),
      getMonthlyUsage(6),
      getInstrumentLeaderboard(5),
      getOverviewMetrics()
    ]);
    return res.render('analytics/index', {
      title: '统计报表',
      activeNav: 'analytics',
      overview,
      monthlyUsage,
      leaderboard,
      metrics
    });
  } catch (error) {
    return next(error);
  }
}

export async function analyticsData(req, res, next) {
  try {
    const [monthlyUsage, leaderboard] = await Promise.all([
      getMonthlyUsage(6),
      getInstrumentLeaderboard(10)
    ]);
    return res.json({ monthlyUsage, leaderboard });
  } catch (error) {
    return next(error);
  }
}
