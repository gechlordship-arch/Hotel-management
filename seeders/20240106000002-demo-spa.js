'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    
    // 1. Insert Services
    await queryInterface.bulkInsert('spa_services', [
      { name: 'Swedish Massage', description: 'Full body relaxing massage', price: 120.00, duration_minutes: 60, created_at: now, updated_at: now },
      { name: 'Deep Tissue Massage', description: 'Intense muscle therapy', price: 150.00, duration_minutes: 60, created_at: now, updated_at: now },
      { name: 'Facial Treatment', description: 'Rejuvenating skin care', price: 90.00, duration_minutes: 45, created_at: now, updated_at: now },
      { name: 'Sauna & Steam', description: 'Detox session', price: 50.00, duration_minutes: 30, created_at: now, updated_at: now },
    ]);

    // 2. Insert a demo booking (Guest 1 booking Service 1 for tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];

    await queryInterface.bulkInsert('spa_bookings', [
      { 
        guest_id: 1, // Abebe Kebede
        spa_service_id: 1, // Swedish Massage
        booking_date: dateStr,
        start_time: '14:00',
        status: 'scheduled',
        created_at: now, 
        updated_at: now 
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('spa_bookings', null, {});
    await queryInterface.bulkDelete('spa_services', null, {});
  },
};
