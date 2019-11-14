//this file contains the endpoint to CRUD protocolentries in the database
const CategorySchema = require('../models/Category.js');

module.exports.controller = (app) => {
// fetch all devices
app.get('/categories', (req, res) => {
    CategorySchema.find({}, 'name options', (error,
    categories) => {
    if (error) { console.log(error); }
    res.send({
    categories,
    });
    });
    });

//delete device from the database

app.delete('/categories/:id', (req, res) => {
  DeviceSchema.remove({
      _id: req.params.id 
  }, function(error, device){
      if (error){console.error(error);}
      res.send({success:true})
  })
  });
    




// add or update a  entry
app.put('/categories/', (req, res) => {
    CategorySchema.findOneAndUpdate({name: req.body.name}, { $push: { options: req.body.options }, }, { upsert : true },
    function(err){
    if(err){
    console.log(err);
    }
    res.send({success:true})
    });
    });
};





    

