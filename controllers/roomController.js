const { Room, RoomType } = require('../models');

const STATUSES = ['available', 'occupied', 'cleaning', 'maintenance'];

const IMAGE_OPTIONS = [
  '/images/rooms/room.png',
  '/images/rooms/room1.png',
  '/images/rooms/room2.png',
  '/images/rooms/room3.png',
];

// GET /rooms
exports.index = async (req, res) => {
  try {
    const rooms = await Room.findAll({
      include: [{ model: RoomType, as: 'roomType' }],
      order: [['room_number', 'ASC']],
    });
    res.render('rooms/index', { title: 'Rooms', rooms });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not load rooms');
    res.redirect('/dashboard');
  }
};

// GET /rooms/new
exports.newForm = async (req, res) => {
  const roomTypes = await RoomType.findAll({ order: [['name', 'ASC']] });
  res.render('rooms/new', {
    title: 'Add Room',
    roomTypes,
    statuses: STATUSES,
    images: IMAGE_OPTIONS,
  });
};

// POST /rooms
exports.create = async (req, res) => {
  try {
    const { room_number, room_type_id, floor, status, image_url, notes } = req.body;

    if (!room_number || !room_type_id || !floor) {
      req.flash('error', 'Room number, type, and floor are required');
      return res.redirect('/rooms/new');
    }

    const existing = await Room.findOne({ where: { room_number } });
    if (existing) {
      req.flash('error', `Room ${room_number} already exists`);
      return res.redirect('/rooms/new');
    }

    await Room.create({
      room_number,
      room_type_id: Number(room_type_id),
      floor: Number(floor),
      status: status || 'available',
      image_url: image_url || '/images/rooms/room.png',
      notes: notes || null,
    });

    req.flash('success', `Room ${room_number} created`);
    res.redirect('/rooms');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not create room');
    res.redirect('/rooms/new');
  }
};

// GET /rooms/:id
exports.show = async (req, res) => {
  const room = await Room.findByPk(req.params.id, {
    include: [{ model: RoomType, as: 'roomType' }],
  });
  if (!room) {
    req.flash('error', 'Room not found');
    return res.redirect('/rooms');
  }
  res.render('rooms/show', { title: `Room ${room.room_number}`, room });
};

// GET /rooms/:id/edit
exports.editForm = async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if (!room) {
    req.flash('error', 'Room not found');
    return res.redirect('/rooms');
  }
  const roomTypes = await RoomType.findAll({ order: [['name', 'ASC']] });
  res.render('rooms/edit', {
    title: `Edit Room ${room.room_number}`,
    room,
    roomTypes,
    statuses: STATUSES,
    images: IMAGE_OPTIONS,
  });
};

// POST /rooms/:id
exports.update = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) {
      req.flash('error', 'Room not found');
      return res.redirect('/rooms');
    }

    const { room_number, room_type_id, floor, status, image_url, notes } = req.body;

    await room.update({
      room_number,
      room_type_id: Number(room_type_id),
      floor: Number(floor),
      status,
      image_url: image_url || room.image_url,
      notes: notes || null,
    });

    req.flash('success', `Room ${room.room_number} updated`);
    res.redirect(`/rooms/${room.id}`);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not update room');
    res.redirect(`/rooms/${req.params.id}/edit`);
  }
};

// POST /rooms/:id/delete
exports.delete = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) {
      req.flash('error', 'Room not found');
      return res.redirect('/rooms');
    }
    const number = room.room_number;
    await room.destroy();
    req.flash('success', `Room ${number} deleted`);
    res.redirect('/rooms');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not delete room — it may have reservations');
    res.redirect('/rooms');
  }
};

// POST /rooms/:id/status
exports.updateStatus = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) {
      req.flash('error', 'Room not found');
      return res.redirect('/rooms');
    }
    const { status } = req.body;
    if (!STATUSES.includes(status)) {
      req.flash('error', 'Invalid status');
      return res.redirect('/rooms');
    }
    await room.update({ status });
    req.flash('success', `Room ${room.room_number} is now ${status}`);
    res.redirect('back');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not update status');
    res.redirect('/rooms');
  }
};
