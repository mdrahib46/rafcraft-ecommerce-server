const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/index');

// db
const db = require('./db/db');


// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// routes middlewares
app.use('/api', routes);


// server configuration
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})