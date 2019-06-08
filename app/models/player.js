class Player {
  static findAll() {
    return Player.repository.sort((a, b) => (a.id > b.id));
  }

  static findById(id) {
    return Player.repository.filter(player => player.id === id)[0] || null;
  }

  static removeById(id) {
    const index = Player.repository.findIndex(player => player.id === id);
    if (index === -1) {
      return false;
    }
    Player.repository.splice(index, 1);
    return true;
  }

  static seed(players) {
    Player.repository.push(...players);
  }
}

Player.repository = [];

module.exports = Player;
