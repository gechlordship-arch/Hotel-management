require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize, User } = require('./models');

(async () => {
  try {
    const newPassword = process.argv[2] || 'admin123';
    const email = process.argv[3];

    if (!email) {
      console.error('Usage: node reset-admin.js <newPassword> <email>');
      process.exit(1);
    }

    await sequelize.authenticate();

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.error(`✗ No user found with email ${email}`);
      process.exit(1);
    }

    const hash = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hash });

    console.log(`✓ Password reset successfully`);
    console.log(`  Email:    ${email}`);
    console.log(`  Password: ${newPassword}`);
    process.exit(0);
  } catch (err) {
    console.error('✗ Error:', err.message);
    process.exit(1);
  }
})();
