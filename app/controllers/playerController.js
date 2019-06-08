const Player = require('../models/player');

module.exports = {
  index: async (req, res, next) => (
    res.status(200).json(await Player.findAll())
  ),
  get: async (req, res, next) => {
    const player = Player.findById(parseInt(req.params.id, 10));
    if (!player) {
      return res.status(404).send();
    }
    return res.status(200).json(player);
  },
  delete: async (req, res, next) => {
    const result = Player.removeById(parseInt(req.params.id, 10));
    if (!result) {
      return res.status(404).send();
    }
    return res.status(204).send();
  }
};
