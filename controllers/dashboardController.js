const { Room, Reservation, Payment, SpaBooking } = require('../models');

exports.index = async (req, res) => {
  try {
    // FIX: Get local date in YYYY-MM-DD format (avoids UTC timezone bugs)
    const today = new Date().toLocaleDateString('en-CA'); 

    // 1. Room Stats
    const totalRooms = await Room.count();
    const occupiedRooms = await Room.count({ where: { status: 'occupied' } });
    const cleaningRooms = await Room.count({ where: { status: 'cleaning' } });
    const maintenanceRooms = await Room.count({ where: { status: 'maintenance' } });
    const availableRooms = await Room.count({ where: { status: 'available' } });
    
    const occupancyRate = totalRooms === 0 ? 0 : Math.round((occupiedRooms / totalRooms) * 100);

    // 2. Today's Movements (Local Time)
    const arrivalsToday = await Reservation.count({
      where: { check_in_date: today, status: 'booked' }
    });
    const departuresToday = await Reservation.count({
      where: { check_out_date: today, status: 'checked_in' }
    });

    // 3. Financials
    const collectedRevenue = await Payment.sum('amount') || 0;
    const expectedRevenue = await Reservation.sum('total_amount', { 
      where: { status: ['booked', 'checked_in'] } 
    }) || 0;

    // 4. SPA
    const spaBookingsToday = await SpaBooking.count({
      where: { booking_date: today, status: 'scheduled' }
    });

    res.render('dashboard', {
      title: 'Dashboard',
      stats: {
        totalRooms,
        availableRooms,
        occupiedRooms,
        cleaningRooms,
        maintenanceRooms,
        occupancyRate,
        arrivalsToday,
        departuresToday,
        collectedRevenue,
        expectedRevenue,
        spaBookingsToday,
      }
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not load dashboard stats');
    res.redirect('/login');
  }
};
