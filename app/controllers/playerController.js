module.exports = {
  index: async (req, res, next) => (
    res.status(200).json({
      players: []
    })
  ),
  get: async (req, res, next) => (
    res.status(404).json(null)
  ),
  delete: async (req, res, next) => (
    res.status(404).json(null)
  )
};
