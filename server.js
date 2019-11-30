//this file contains the configuration for the backend express server

//Load all required modules
const express = require('express');
//To parse incoming requests
const bodyParser = require('body-parser');
//Object modeling for MongoDB
const mongoose = require('mongoose');
//To handle cross-origin requests between frontend and backend
const cors = require('cors');
//HTTP request logger
const morgan = require('morgan');
const fs = require('fs');


const app = express();
const router = express.Router();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));



//connect to mongodb
mongoose.connect('mongodb://localhost/iom_manager', function() {
console.log('Connection has been made');
})
.catch(err => {
console.error('App starting error:', err.stack);
process.exit(1);
});

// Include all controllers, so that no every controller has to be importet individualy 
fs.readdirSync("controllers").forEach(function (file) {
    if(file.substr(-3) == ".js") {
    const route = require("./controllers/" + file)
    route.controller(app)
    }
    })

router.get('/', function(req, res) {
res.json({ message: 'API Initialized!'});
});

//Tell express server to use port 8081
const port = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(port, function() {
console.log(`api running on port ${port}`);
});