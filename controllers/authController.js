const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.showRegister = (req, res) =>
  res.render('auth/register', { title: 'Register' });

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 6) {
      req.flash('error', 'All fields required; password must be 6+ chars');
      return res.redirect('/register');
    }
    if (await User.findOne({ where: { email } })) {
      req.flash('error', 'Email already registered');
      return res.redirect('/register');
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash });
    req.flash('success', 'Account created. Please log in.');
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Something went wrong');
    res.redirect('/register');
  }
};

exports.showLogin = (req, res) =>
  res.render('auth/login', { title: 'Login' });

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    req.flash('success', `Welcome back, ${user.name}`);
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Login failed');
    res.redirect('/login');
  }
};

exports.logout = (req, res) =>
  req.session.destroy(() => res.redirect('/login'));