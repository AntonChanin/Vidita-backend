'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

const { default: PATHES } = require('../consts');
const archivator = require('../utils/archivator');

// const router = express.Router();
// router.get('/', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>Hello from Express.js!</h1>');
//   res.end();
// });

// PATHES.forEach((path) => {
//   router.get(path, (req, res) => res.send({ route: req.originalUrl }));
// });



// router.post('/', (req, res) => res.json({ body: req.body }));
// router.post('/cancel', (req, res) => {
//   try {
//     fs.writeFileSync('../data/archive.json', JSON.stringify({ answer: archivator(req.body) }), { encoding:'utf8',flag:'w' });
//     const archive = JSON.stringify(fs.readFileSync('../data/archive.json', 'utf-8'));
//     res.json({ body: archive });
//     res.send(201);
//   } catch {
//     res.json({ body: req.body });
//   } finally {
//     res.send(201);
//   }
// });

// запасной контур
app.use(express.json());
app.use(express.urlencoded());

PATHES.forEach((path) => {
  app.get(path.replace('.json', ''), (req, res) => res.json(fs.readFileSync(`'..${path}`, 'utf-8')));
});

app.post('/', (req, res) => res.json({ body: req.body }));
app.post('/cancel', (req, res) => {
  try {
    fs.writeFileSync('../data/archive.json', JSON.stringify({ answer: archivator(req.body) }), { encoding:'utf8',flag:'w' });
    const archive = JSON.stringify(fs.readFileSync('../data/archive.json', 'utf-8'));
    res.json({ body: archive });
    res.send(201);
  } catch {
    res.json({ body: req.body });
  } finally {
    res.send(201);
  }
});

app.use(bodyParser.json());
// app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);