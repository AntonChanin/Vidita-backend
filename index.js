'use strict';

const express = require('express');
const path = require('path');

const app = express();

app.use(express.json({ extended: true }));
app.use('/data', express.static(path.join(__dirname, 'data')));

app.use('/api', require('./routes/cancel.route'));

const PORT = 5000;

app.listen(PORT, () => {});