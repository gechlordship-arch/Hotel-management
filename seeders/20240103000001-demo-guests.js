'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('guests', [
      { full_name: 'Abebe Kebede', email: 'abebe@example.com', phone: '+251911234567', country: 'Ethiopia', id_proof_type: 'national_id', id_proof_number: 'ET-1234567', created_at: now, updated_at: now },
      { full_name: 'Sara Tesfaye', email: 'sara@example.com', phone: '+251922345678', country: 'Ethiopia', id_proof_type: 'passport', id_proof_number: 'EP-9876543', created_at: now, updated_at: now },
      { full_name: 'John Smith', email: 'john.smith@example.com', phone: '+15551234567', country: 'USA', id_proof_type: 'passport', id_proof_number: 'US-555123456', created_at: now, updated_at: now },
      { full_name: 'Fatima Al-Amin', email: 'fatima@example.com', phone: '+971501234567', country: 'UAE', id_proof_type: 'passport', id_proof_number: 'AE-777123', created_at: now, updated_at: now },
      { full_name: 'Li Wei', email: 'li.wei@example.com', phone: '+8613800138000', country: 'China', id_proof_type: 'passport', id_proof_number: 'CN-12345678', created_at: now, updated_at: now },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('guests', null, {});
  },
};
