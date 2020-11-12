const express = require('express');
const morgan = require('morgan');

const notesApi = require('./routes/notes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

notesApi(app);

module.exports = app;
