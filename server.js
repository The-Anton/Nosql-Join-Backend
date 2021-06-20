const express = require('express');
const errorHandler = require('./middleware/error');
const dotenv = require('dotenv')
const path = require('path');
var cors = require('cors')
 
// load env variables

dotenv.config({path:'./config/config.env'})

require('dotenv').config();
// Import DB
const connectDB = require('./config/db');
connectDB();
require('colors');

// route files
const api = require('./api');
const app = express();


app.use(cors({
    origin: '*'
}))

app.set('views', path.join(__dirname, './public/frontend/views'))
app.set('view engine','ejs');


// Use Routes
app.use('/api/', api);
app.use(api);

app.get('/', (req,res) => {
    res.render('index')
})

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    // server.close(() => process.exit(1));
});


module.exports = app;
