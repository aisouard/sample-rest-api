const morgan = require('morgan');
const app = require('./app');
const Player = require('./app/models/player');
const { players } = require('./seed/headtohead');

const port = process.env.PORT || 3000;

Player.seed(players);
app.use(morgan('combined'));
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`app is listening on port ${port}.`);
});
