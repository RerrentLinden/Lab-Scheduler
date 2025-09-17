import express from 'express';
import { analyticsData } from '../controllers/analyticsController.js';
import { dashboardData } from '../controllers/dashboardController.js';
import { getJson as getInstrumentJson, listJson as instrumentListJson } from '../controllers/instrumentController.js';
import { listJson as reservationListJson } from '../controllers/reservationController.js';

const router = express.Router();

router.get('/dashboard', dashboardData);
router.get('/instruments', instrumentListJson);
router.get('/instruments/:id', getInstrumentJson);
router.get('/reservations', reservationListJson);
router.get('/analytics', analyticsData);

export default router;
