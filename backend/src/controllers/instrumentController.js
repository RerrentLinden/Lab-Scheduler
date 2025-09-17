import { createInstrument, getInstrumentById, listInstruments, updateInstrument } from '../services/instrumentService.js';

const STATUS_LABELS = {
  available: '可用',
  maintenance: '维护中',
  retired: '已退役'
};

export async function listPage(req, res, next) {
  try {
    const filters = {
      status: req.query.status || '',
      category: req.query.category || '',
      search: req.query.search || ''
    };
    const instruments = await listInstruments({
      status: filters.status || undefined,
      category: filters.category || undefined,
      search: filters.search || undefined
    });
    return res.render('instruments/index', {
      title: '设备台账',
      activeNav: 'instruments',
      instruments,
      filters,
      statusLabels: STATUS_LABELS
    });
  } catch (error) {
    return next(error);
  }
}

export async function createFromForm(req, res) {
  try {
    await createInstrument(req.body);
    req.session.flash = { type: 'success', message: '设备信息已保存。' };
  } catch (error) {
    req.session.flash = { type: 'error', message: error.message || '保存失败，请稍后再试。' };
  }
  return res.redirect('/instruments');
}

export async function updateFromForm(req, res) {
  const { id } = req.params;
  try {
    await updateInstrument(id, req.body);
    req.session.flash = { type: 'success', message: '设备信息已更新。' };
  } catch (error) {
    req.session.flash = { type: 'error', message: error.message || '更新失败，请稍后再试。' };
  }
  return res.redirect('/instruments');
}

export async function listJson(req, res, next) {
  try {
    const instruments = await listInstruments(req.query);
    return res.json(instruments);
  } catch (error) {
    return next(error);
  }
}

export async function getJson(req, res, next) {
  try {
    const instrument = await getInstrumentById(req.params.id);
    if (!instrument) {
      return res.status(404).json({ message: '设备不存在' });
    }
    return res.json(instrument);
  } catch (error) {
    return next(error);
  }
}
