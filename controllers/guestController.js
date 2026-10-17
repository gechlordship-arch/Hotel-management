const { Op } = require('sequelize');
const { Guest } = require('../models');

const ID_TYPES = ['passport', 'national_id', 'driver_license', 'other'];

// GET /guests  (supports ?q= search)
exports.index = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    const where = q
      ? {
          [Op.or]: [
            { full_name: { [Op.iLike]: `%${q}%` } },
            { phone: { [Op.iLike]: `%${q}%` } },
            { email: { [Op.iLike]: `%${q}%` } },
          ],
        }
      : {};

    const guests = await Guest.findAll({
      where,
      order: [['full_name', 'ASC']],
    });

    res.render('guests/index', { title: 'Guests', guests, q });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not load guests');
    res.redirect('/dashboard');
  }
};

// GET /guests/new
exports.newForm = (req, res) => {
  res.render('guests/new', {
    title: 'Add Guest',
    idTypes: ID_TYPES,
  });
};

// POST /guests
exports.create = async (req, res) => {
  try {
    const {
      full_name, email, phone, address, country,
      id_proof_type, id_proof_number, notes,
    } = req.body;

    if (!full_name || !phone) {
      req.flash('error', 'Full name and phone are required');
      return res.redirect('/guests/new');
    }

    await Guest.create({
      full_name,
      email: email || null,
      phone,
      address: address || null,
      country: country || null,
      id_proof_type: id_proof_type || null,
      id_proof_number: id_proof_number || null,
      notes: notes || null,
    });

    req.flash('success', `Guest ${full_name} added`);
    res.redirect('/guests');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not create guest');
    res.redirect('/guests/new');
  }
};

// GET /guests/:id
exports.show = async (req, res) => {
  const guest = await Guest.findByPk(req.params.id);
  if (!guest) {
    req.flash('error', 'Guest not found');
    return res.redirect('/guests');
  }
  res.render('guests/show', { title: guest.full_name, guest });
};

// GET /guests/:id/edit
exports.editForm = async (req, res) => {
  const guest = await Guest.findByPk(req.params.id);
  if (!guest) {
    req.flash('error', 'Guest not found');
    return res.redirect('/guests');
  }
  res.render('guests/edit', {
    title: `Edit ${guest.full_name}`,
    guest,
    idTypes: ID_TYPES,
  });
};

// POST /guests/:id
exports.update = async (req, res) => {
  try {
    const guest = await Guest.findByPk(req.params.id);
    if (!guest) {
      req.flash('error', 'Guest not found');
      return res.redirect('/guests');
    }

    const {
      full_name, email, phone, address, country,
      id_proof_type, id_proof_number, notes,
    } = req.body;

    await guest.update({
      full_name,
      email: email || null,
      phone,
      address: address || null,
      country: country || null,
      id_proof_type: id_proof_type || null,
      id_proof_number: id_proof_number || null,
      notes: notes || null,
    });

    req.flash('success', 'Guest updated');
    res.redirect(`/guests/${guest.id}`);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not update guest');
    res.redirect(`/guests/${req.params.id}/edit`);
  }
};

// POST /guests/:id/delete
exports.delete = async (req, res) => {
  try {
    const guest = await Guest.findByPk(req.params.id);
    if (!guest) {
      req.flash('error', 'Guest not found');
      return res.redirect('/guests');
    }
    const name = guest.full_name;
    await guest.destroy();
    req.flash('success', `Guest ${name} deleted`);
    res.redirect('/guests');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not delete guest');
    res.redirect('/guests');
  }
};
