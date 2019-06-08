const serverless = require('serverless-http');
const app = require('..');
const Player = require('../models/player');
const { players } = require('../../seed/headtohead');

Player.seed(players);

module.exports.handler = serverless(app);
