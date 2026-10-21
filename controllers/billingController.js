const { Reservation, Guest, Room, RoomType, Payment } = require('../models');

// GET /billing/:reservation_id
exports.showInvoice = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.reservation_id, {
      include: [
        { model: Guest, as: 'guest' },
        { model: Room, as: 'room', include: [{ model: RoomType, as: 'roomType' }] },
        { model: Payment, as: 'payments' },
      ],
    });

    if (!reservation) {
      req.flash('error', 'Reservation not found');
      return res.redirect('/reservations');
    }

    // Calculate financials
    const total = Number(reservation.total_amount);
    const paid = reservation.payments.reduce((sum, p) => sum + Number(p.amount), 0);
    const balance = total - paid;

    res.render('billing/show', {
      title: `Invoice #${reservation.id}`,
      reservation,
      total,
      paid,
      balance,
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not load invoice');
    res.redirect('/reservations');
  }
};

// POST /billing/:reservation_id/pay
exports.addPayment = async (req, res) => {
  try {
    const { amount, method } = req.body;
    const numAmount = Number(amount);

    if (!numAmount || numAmount <= 0) {
      req.flash('error', 'Please enter a valid payment amount');
      return res.redirect(`/billing/${req.params.reservation_id}`);
    }

    await Payment.create({
      reservation_id: req.params.reservation_id,
      amount: numAmount,
      method: method || 'cash',
      status: 'paid',
    });

    req.flash('success', 'Payment recorded successfully');
    res.redirect(`/billing/${req.params.reservation_id}`);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not record payment');
    res.redirect(`/billing/${req.params.reservation_id}`);
  }
};
