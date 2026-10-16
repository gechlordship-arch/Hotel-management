require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ PostgreSQL connected');
    app.listen(PORT, () =>
      console.log(`✓ Server running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('✗ Unable to start server:', err);
    process.exit(1);
  }
})();