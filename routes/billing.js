const express = require('express');
const router = express.Router();
const c = require('../controllers/billingController');
const { requireAuth } = require('../middlewares/auth');

router.use(requireAuth);

router.get('/:reservation_id', c.showInvoice);
router.post('/:reservation_id/pay', c.addPayment);

module.exports = router;
