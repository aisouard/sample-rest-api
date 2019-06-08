const express = require('express');
const router = require('./routes');

const app = express();

app.use(router);
app.use((req, res, next) => res.status(404).send());
app.use((err, req, res, next) => res.status(500).send());

module.exports = app;
