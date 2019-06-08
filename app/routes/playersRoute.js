const express = require('express');
const controller = require('../controllers/playerController');

const router = express.Router();

router.route('/')
  .get(controller.index);

router.route('/:id(\\d+)')
  .get(controller.get)
  .delete(controller.delete);

module.exports = router;
