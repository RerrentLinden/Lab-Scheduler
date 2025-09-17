import express from 'express';
import { analyticsPage } from '../controllers/analyticsController.js';
import { dashboardPage } from '../controllers/dashboardController.js';
import {
  createFromForm as createReservation,
  calendarPage,
  cancelFromForm as cancelReservation
} from '../controllers/reservationController.js';
import {
  createFromForm as createInstrument,
  listPage as instrumentListPage,
  updateFromForm as updateInstrument
} from '../controllers/instrumentController.js';
import { ensureAdmin, ensureAuthenticated } from '../middleware/auth.js';
import apiRoutes from './api.js';

const router = express.Router();

router.use('/api', ensureAuthenticated, apiRoutes);

router.get('/', ensureAuthenticated, dashboardPage);

router.get('/bookings', ensureAuthenticated, calendarPage);
router.post('/reservations', ensureAuthenticated, createReservation);
router.post('/reservations/cancel', ensureAuthenticated, cancelReservation);

router.get('/instruments', ensureAuthenticated, instrumentListPage);
router.post('/instruments', ensureAuthenticated, ensureAdmin, createInstrument);
router.post('/instruments/:id', ensureAuthenticated, ensureAdmin, updateInstrument);

router.get('/analytics', ensureAuthenticated, analyticsPage);

export default router;
