//this file contains the endpoint to CRUD devices in the database
const DeviceSchema = require('../models/Device.js');
const passport = require('passport');

module.exports.controller = (app) => {
// fetch all devices
app.get('/devices', passport.authenticate('jwt', { session: false }),(req, res) => {
    DeviceSchema.find({}, 'device', (error,
    devices) => {
    if (error) { console.log(error); }
    res.send({
    devices,
    });
    });
    });

//delete device from the database

app.delete('/devices/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  DeviceSchema.remove({
      _id: req.params.id 
  }, function(error, device){
      if (error){console.error(error);}
      res.send({success:true})
  })
  });
    




// add a new device
app.post('/devices', passport.authenticate('jwt', { session: false }), (req, res) => {
const newDevice = new DeviceSchema({
        device: req.body.device,

});

newDevice.save((error, device) => {
if (error) { console.log(error); }
res.send(device);
});
});
};



    

