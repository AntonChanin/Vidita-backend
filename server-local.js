'use strict'

const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    hello: 'hi!'
  });
});

app.use(`/.netlify/functions/active`, router);
app.use(`/.netlify/functions/archive`, router);

module.exports.handler = serverless(app);
