const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`app is listening on port ${port}.`);
});
