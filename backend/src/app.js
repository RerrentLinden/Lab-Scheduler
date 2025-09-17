import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import session from 'express-session';
import connectSessionKnex from 'connect-session-knex';
import nunjucks from 'nunjucks';
import dayjs from 'dayjs';
import db from './db/knex.js';
import authRoutes from './routes/auth.js';
import appRoutes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const KnexSessionStore = connectSessionKnex(session);
const sessionStore = new KnexSessionStore({
  knex: db,
  tablename: 'sessions',
  createtable: true,
  sidfieldname: 'sid',
  clearInterval: 1000 * 60 * 10
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 8
    },
    store: sessionStore
  })
);

const viewsPath = path.resolve(__dirname, '../views');
const nunjucksEnv = nunjucks.configure(viewsPath, {
  autoescape: true,
  express: app
});
// Custom date formatting helper
nunjucksEnv.addFilter('date', (value, format = 'YYYY-MM-DD HH:mm') => {
  if (!value) return '';
  return dayjs(value).format(format);
});
app.set('view engine', 'njk');

app.use(express.static(path.resolve(__dirname, '../public')));

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.flash = req.session.flash || null;
  res.locals.currentYear = new Date().getFullYear();
  delete req.session.flash;
  next();
});

app.use('/', authRoutes);
app.use('/', appRoutes);

app.use((req, res) => {
  res.status(404);
  res.render('errors/404');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500);
  res.render('errors/500', { error: err });
});

export default app;
