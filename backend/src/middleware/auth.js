export function ensureAuthenticated(req, res, next) {
  if (!req.session.user) {
    if (req.method === 'GET') {
      req.session.returnTo = req.originalUrl;
    }
    req.session.flash = { type: 'error', message: '请先登录后再继续操作。' };
    return res.redirect('/login');
  }
  return next();
}

export function ensureAdmin(req, res, next) {
  if (!req.session.user || req.session.user.role !== 'admin') {
    req.session.flash = { type: 'error', message: '仅限管理员操作。' };
    return res.redirect(req.headers.referer || '/');
  }
  return next();
}
