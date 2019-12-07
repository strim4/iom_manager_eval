//this file contains the endpoint to upload files to the server
const multer = require('multer');
const crypto = require('crypto');
const mime = require('mime');
const path = require('path');
const passport = require('passport');

module.exports.controller = (app) => {





//Upload configuration
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './static/')
        },
        filename: function (req, file, cb) {
          crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null,  file.originalname );
          });
        }
      });
      var upload = multer({ storage: storage });
    
    
    //Upload File
    app.post('/upload', upload.single('file'), passport.authenticate('jwt', { session: false }),(req, res) => {res.json({file: req.file})});

   
  
};





    

