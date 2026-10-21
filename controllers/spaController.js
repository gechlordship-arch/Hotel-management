const { SpaBooking, SpaService, Guest } = require('../models');

// GET /spa (List all bookings)
exports.index = async (req, res) => {
  try {
    const bookings = await SpaBooking.findAll({
      include: [
        { model: Guest, as: 'guest' },
        { model: SpaService, as: 'service' },
      ],
      order: [['booking_date', 'ASC'], ['start_time', 'ASC']],
    });

    res.render('spa/index', { title: 'SPA Bookings', bookings });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not load SPA bookings');
    res.redirect('/dashboard');
  }
};

// GET /spa/services (List the menu)
exports.services = async (req, res) => {
  try {
    const services = await SpaService.findAll({ order: [['name', 'ASC']] });
    res.render('spa/services', { title: 'SPA Menu', services });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not load SPA services');
    res.redirect('/spa');
  }
};

// GET /spa/book (Show booking form)
exports.newBookingForm = async (req, res) => {
  try {
    const guests = await Guest.findAll({ order: [['full_name', 'ASC']] });
    const services = await SpaService.findAll({ order: [['name', 'ASC']] });
    
    // Default date is today
    const today = new Date().toISOString().split('T')[0];

    res.render('spa/new-booking', {
      title: 'Book SPA Treatment',
      guests,
      services,
      today,
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not load form');
    res.redirect('/spa');
  }
};

// POST /spa/book
exports.createBooking = async (req, res) => {
  try {
    const { guest_id, spa_service_id, booking_date, start_time } = req.body;

    if (!guest_id || !spa_service_id || !booking_date || !start_time) {
      req.flash('error', 'All fields are required');
      return res.redirect('/spa/book');
    }

    await SpaBooking.create({
      guest_id,
      spa_service_id,
      booking_date,
      start_time,
      status: 'scheduled',
    });

    req.flash('success', 'SPA treatment booked successfully');
    res.redirect('/spa');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not book treatment');
    res.redirect('/spa/book');
  }
};

// POST /spa/:id/status
exports.updateStatus = async (req, res) => {
  try {
    const booking = await SpaBooking.findByPk(req.params.id);
    if (!booking) {
      req.flash('error', 'Booking not found');
      return res.redirect('/spa');
    }

    const { status } = req.body;
    if (!['scheduled', 'completed', 'cancelled'].includes(status)) {
      req.flash('error', 'Invalid status');
      return res.redirect('/spa');
    }

    await booking.update({ status });
    req.flash('success', 'SPA booking status updated');
    res.redirect('/spa');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not update status');
    res.redirect('/spa');
  }
};
