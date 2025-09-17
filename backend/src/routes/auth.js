import express from 'express';
import { createUser, verifyCredentials } from '../services/userService.js';

const router = express.Router();

router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  return res.render('auth/login', {
    title: '登录实验室预约平台',
    activeNav: 'login'
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await verifyCredentials(email, password);
    if (!user) {
      req.session.flash = { type: 'error', message: '账号或密码错误。' };
      return res.redirect('/login');
    }
    req.session.user = user;
    const destination = req.session.returnTo || '/';
    delete req.session.returnTo;
    return res.redirect(destination);
  } catch (error) {
    console.error(error);
    req.session.flash = { type: 'error', message: '登录失败，请稍后再试。' };
    return res.redirect('/login');
  }
});

router.get('/register', (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  return res.render('auth/register', {
    title: '注册账号',
    activeNav: 'register'
  });
});

router.post('/register', async (req, res) => {
  const { name, phone, email, password } = req.body;
  if (!name || !email || !password) {
    req.session.flash = { type: 'error', message: '请完整填写信息。' };
    return res.redirect('/register');
  }
  try {
    const user = await createUser({ name, phone, email, password, role: 'user' });
    req.session.user = user;
    req.session.flash = { type: 'success', message: '注册成功，欢迎使用！' };
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    req.session.flash = { type: 'error', message: error.message || '注册失败，请稍后再试。' };
    return res.redirect('/register');
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

export default router;
