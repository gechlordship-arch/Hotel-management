const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth');

router.get('/', (req, res) => res.redirect('/dashboard'));
router.use('/', require('./auth'));

router.get('/dashboard', requireAuth, (req, res) =>
  res.render('dashboard', { title: 'Dashboard' })
);

module.exports = router;