'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

const { default: PATHES } = require('../consts');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

PATHES.forEach((path) => {
  router.get(path, (req, res) => res.json({ route: req.originalUrl }));
});

router.post('/', (req, res) => res.json({ body: req.body }));
router.post('/cancel', (req, res) => {
  res.json({ body: req.body });
  const archive = require('../data/archive.json');
  fs.writeFileSync('../data/archive.json',JSON.stringify({ "answer": [
    archive.answer, ...[
      ...JSON.parse(req.body)
    ]
    .map(({ status, ...rest }) => ({
      "status": "archive",
      ...rest,
    }),
  )] }), { encoding:'utf8',flag:'w' })
  res.send(201);
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);