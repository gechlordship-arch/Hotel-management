'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const hash = await bcrypt.hash('admin123', 10);
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        email: 'admin@hotel.com',
        password: hash,
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { email: 'admin@hotel.com' });
  },
};