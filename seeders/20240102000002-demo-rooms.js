'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('room_types', [
      { name: 'Standard', description: 'Comfortable room with queen bed, city view.', base_price: 80.0, capacity: 2, created_at: now, updated_at: now },
      { name: 'Deluxe', description: 'Spacious room with king bed and lounge area.', base_price: 140.0, capacity: 2, created_at: now, updated_at: now },
      { name: 'Executive', description: 'Premium room with work desk and panoramic view.', base_price: 200.0, capacity: 3, created_at: now, updated_at: now },
      { name: 'Suite', description: 'Luxury suite with separate living room.', base_price: 320.0, capacity: 4, created_at: now, updated_at: now },
      { name: 'Presidential', description: 'Top-floor presidential suite with private terrace.', base_price: 550.0, capacity: 4, created_at: now, updated_at: now },
    ]);

    await queryInterface.bulkInsert('rooms', [
      { room_number: '101', room_type_id: 1, floor: 1, status: 'available', image_url: '/images/rooms/room.png', created_at: now, updated_at: now },
      { room_number: '102', room_type_id: 1, floor: 1, status: 'available', image_url: '/images/rooms/room.png', created_at: now, updated_at: now },
      { room_number: '103', room_type_id: 1, floor: 1, status: 'cleaning', image_url: '/images/rooms/room.png', created_at: now, updated_at: now },
      { room_number: '201', room_type_id: 2, floor: 2, status: 'available', image_url: '/images/rooms/room1.png', created_at: now, updated_at: now },
      { room_number: '202', room_type_id: 2, floor: 2, status: 'available', image_url: '/images/rooms/room1.png', created_at: now, updated_at: now },
      { room_number: '301', room_type_id: 3, floor: 3, status: 'available', image_url: '/images/rooms/room2.png', created_at: now, updated_at: now },
      { room_number: '302', room_type_id: 3, floor: 3, status: 'maintenance', image_url: '/images/rooms/room2.png', created_at: now, updated_at: now },
      { room_number: '401', room_type_id: 4, floor: 4, status: 'available', image_url: '/images/rooms/room3.png', created_at: now, updated_at: now },
      { room_number: '501', room_type_id: 5, floor: 5, status: 'available', image_url: '/images/rooms/room3.png', created_at: now, updated_at: now },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('rooms', null, {});
    await queryInterface.bulkDelete('room_types', null, {});
  },
};
