const Player = require('../models/player');

module.exports = {
  index: async (req, res, next) => (
    res.status(200).json({
      players: await Player.findAll()
    })
  ),
  get: async (req, res, next) => (
    res.status(404).json(null)
  ),
  delete: async (req, res, next) => (
    res.status(404).json(null)
  )
};
