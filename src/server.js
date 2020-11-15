const express = require('express');
const morgan = require('morgan');

const { logErrors, wrapErrors, errorHandlers } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

const authApi = require('./routes/auth');
const notesApi = require('./routes/notes');

const app = express();

// settings
app.use(morgan('dev'));
app.use(express.json());

// routes
authApi(app);
notesApi(app);

// 404 Not Found
app.use(notFoundHandler);

// errorHandlers
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandlers);

module.exports = app;
