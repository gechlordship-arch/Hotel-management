const express = require('express');
const router = express.Router();
const c = require('../controllers/reservationController');
const { requireAuth } = require('../middlewares/auth');

router.use(requireAuth);

router.get('/', c.index);
router.get('/new', c.newForm);
router.post('/', c.create);

router.get('/:id', c.show);
router.post('/:id/cancel', c.cancel);
router.post('/:id/checkin', c.checkIn);
router.post('/:id/checkout', c.checkOut);

module.exports = router;
