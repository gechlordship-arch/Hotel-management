const express = require('express');
const router = express.Router();
const c = require('../controllers/authController');

router.get('/register', c.showRegister);
router.post('/register', c.register);
router.get('/login', c.showLogin);
router.post('/login', c.login);
router.post('/logout', c.logout);

module.exports = router;