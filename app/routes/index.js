const express = require('express');
const playerRoute = require('./playersRoute');

const router = express.Router();

router.use('/players', playerRoute);

module.exports = router;
