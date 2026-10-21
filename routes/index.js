const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth');
const dashboardController = require('../controllers/dashboardController');

router.get('/', (req, res) => res.redirect('/dashboard'));
router.use('/', require('./auth'));

// Use the new controller
router.get('/dashboard', requireAuth, dashboardController.index);

router.use('/rooms', require('./rooms'));
router.use('/guests', require('./guests'));
router.use('/reservations', require('./reservations'));
router.use('/billing', require('./billing'));
router.use('/spa', require('./spa'));

module.exports = router;
