const { Op } = require('sequelize');
const { Reservation, Room, RoomType } = require('../models');

/**
 * Checks if a room is available for the given dates.
 * Overlap logic: (StartA <= EndB) and (EndA >= StartB)
 */
async function isRoomAvailable(roomId, checkIn, checkOut, excludeReservationId = null) {
  const where = {
    room_id: roomId,
    status: { [Op.in]: ['booked', 'checked_in'] },
    // Overlap condition:
    // A reservation overlaps if it starts before our new check-out AND ends after our new check-in
    check_in_date: { [Op.lt]: checkOut },
    check_out_date: { [Op.gt]: checkIn },
  };

  if (excludeReservationId) {
    where.id = { [Op.ne]: excludeReservationId };
  }

  const conflict = await Reservation.findOne({ where });
  return !conflict;
}

/**
 * Returns a list of rooms that are available for the given dates.
 */
async function findAvailableRooms(checkIn, checkOut) {
  // Get all rooms
  const rooms = await Room.findAll({
    where: { status: { [Op.ne]: 'maintenance' } },
    include: [{ model: RoomType, as: 'roomType' }],
  });

  // Get all busy reservations that overlap with these dates
  const busyReservations = await Reservation.findAll({
    where: {
      status: { [Op.in]: ['booked', 'checked_in'] },
      check_in_date: { [Op.lt]: checkOut },
      check_out_date: { [Op.gt]: checkIn },
    },
    attributes: ['room_id'],
  });

  const busyRoomIds = new Set(busyReservations.map(r => r.room_id));

  // Return rooms that are NOT in the busy list
  return rooms.filter(room => !busyRoomIds.has(room.id));
}

/**
 * Calculates the total price for a stay.
 */
async function calculateTotal(roomId, checkIn, checkOut) {
  const room = await Room.findByPk(roomId, { include: [{ model: RoomType, as: 'roomType' }] });
  if (!room || !room.roomType) return 0;

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  
  if (nights <= 0) return 0;
  return Number(room.roomType.base_price) * nights;
}

module.exports = { isRoomAvailable, findAvailableRooms, calculateTotal };
