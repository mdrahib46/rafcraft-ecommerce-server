const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/v1/index');


// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// routes middlewares
app.use('/api', routes);


module.exports = app;