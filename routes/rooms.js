const express = require('express');
const router = express.Router();
const c = require('../controllers/roomController');
const { requireAuth } = require('../middlewares/auth');

router.use(requireAuth);

router.get('/', c.index);
router.get('/new', c.newForm);
router.post('/', c.create);

router.get('/:id', c.show);
router.get('/:id/edit', c.editForm);
router.post('/:id', c.update);
router.post('/:id/delete', c.delete);
router.post('/:id/status', c.updateStatus);

module.exports = router;
