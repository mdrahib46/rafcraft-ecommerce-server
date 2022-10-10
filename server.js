const app = require('./app');
const dotenv = require("dotenv");
dotenv.config();


// db
const db = require('./db/db');

// server configuration
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})