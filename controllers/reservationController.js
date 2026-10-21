const { Reservation, Room, Guest, RoomType } = require('../models');
const { isRoomAvailable, calculateTotal } = require('../services/availabilityService');

exports.index = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [{ model: Guest, as: 'guest' }, { model: Room, as: 'room' }],
      order: [['created_at', 'DESC']],
    });
    res.render('reservations/index', { title: 'Reservations', reservations });
  } catch (err) {
    req.flash('error', 'Could not load reservations');
    res.redirect('/dashboard');
  }
};

exports.newForm = async (req, res) => {
  try {
    const guests = await Guest.findAll({ order: [['full_name', 'ASC']] });
    const rooms = await Room.findAll({
      include: [{ model: RoomType, as: 'roomType' }],
      order: [['room_number', 'ASC']],
    });
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    res.render('reservations/new', { title: 'New Reservation', guests, rooms, today, tomorrow });
  } catch (err) {
    req.flash('error', 'Could not load form');
    res.redirect('/reservations');
  }
};

exports.create = async (req, res) => {
  try {
    const { guest_id, room_id, check_in_date, check_out_date, adults, children } = req.body;
    if (new Date(check_in_date) >= new Date(check_out_date)) {
      req.flash('error', 'Check-out date must be after check-in date');
      return res.redirect('/reservations/new');
    }
    const available = await isRoomAvailable(room_id, check_in_date, check_out_date);
    if (!available) {
      req.flash('error', 'Room is not available (Double-booking prevented)');
      return res.redirect('/reservations/new');
    }
    const total_amount = await calculateTotal(room_id, check_in_date, check_out_date);
    await Reservation.create({
      guest_id, room_id, check_in_date, check_out_date,
      adults: Number(adults) || 1, children: Number(children) || 0,
      total_amount, status: 'booked',
    });
    req.flash('success', 'Reservation created successfully');
    res.redirect('/reservations');
  } catch (err) {
    req.flash('error', 'Could not create reservation');
    res.redirect('/reservations/new');
  }
};

exports.show = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id, {
      include: [
        { model: Guest, as: 'guest' },
        { model: Room, as: 'room', include: [{ model: RoomType, as: 'roomType' }] },
      ],
    });
    if (!reservation) {
      req.flash('error', 'Reservation not found');
      return res.redirect('/reservations');
    }
    res.render('reservations/show', { title: `Reservation #${reservation.id}`, reservation });
  } catch (err) {
    req.flash('error', 'Could not load reservation');
    res.redirect('/reservations');
  }
};

exports.cancel = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation || reservation.status !== 'booked') {
      req.flash('error', 'Only upcoming bookings can be cancelled');
      return res.redirect(`/reservations/${req.params.id}`);
    }
    await reservation.update({ status: 'cancelled' });
    req.flash('success', 'Reservation cancelled');
    res.redirect(`/reservations/${reservation.id}`);
  } catch (err) {
    req.flash('error', 'Could not cancel reservation');
    res.redirect('/reservations');
  }
};

exports.checkIn = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation || reservation.status !== 'booked') {
      req.flash('error', 'Invalid state for check-in');
      return res.redirect(`/reservations/${req.params.id}`);
    }
    await reservation.update({ status: 'checked_in' });
    await Room.update({ status: 'occupied' }, { where: { id: reservation.room_id } });
    req.flash('success', 'Guest checked in');
    res.redirect(`/reservations/${reservation.id}`);
  } catch (err) {
    req.flash('error', 'Could not check in');
    res.redirect(`/reservations/${req.params.id}`);
  }
};

exports.checkOut = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation || reservation.status !== 'checked_in') {
      req.flash('error', 'Invalid state for check-out');
      return res.redirect(`/reservations/${req.params.id}`);
    }
    await reservation.update({ status: 'checked_out' });
    await Room.update({ status: 'cleaning' }, { where: { id: reservation.room_id } });
    req.flash('success', 'Guest checked out. Please collect payment.');
    // THIS IS THE CHANGE: Redirect to billing/invoice instead of reservation page
    res.redirect(`/billing/${reservation.id}`);
  } catch (err) {
    req.flash('error', 'Could not check out');
    res.redirect(`/reservations/${req.params.id}`);
  }
};
