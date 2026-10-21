const express = require('express');
const router = express.Router();
const c = require('../controllers/spaController');
const { requireAuth } = require('../middlewares/auth');

router.use(requireAuth);

router.get('/', c.index);
router.get('/services', c.services);
router.get('/book', c.newBookingForm);
router.post('/book', c.createBooking);
router.post('/:id/status', c.updateStatus);

module.exports = router;
