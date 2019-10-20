//this file contains the endpoint to CRUD surgeons in the database
const SurgeonSchema = require('../models/Surgeon.js');

module.exports.controller = (app) => {
// fetch all surgeons
app.get('/surgeons', (req, res) => {
    SurgeonSchema.find({}, 'surgeon', (error,
    surgeons) => {
    if (error) { console.log(error); }
    res.send({
    surgeons,
    });
    });
    });

//delete surgeon from the database

app.delete('/surgeons/:id', (req, res) => {
  SurgeonSchema.remove({
      _id: req.params.id 
  }, function(error, surgeon){
      if (error){console.error(error);}
      res.send({success:true})
  })
  });
    




// add a new surgeon
app.post('/surgeons', (req, res) => {
const newSurgeon = new SurgeonSchema({
        surgeon: req.body.surgeon,

});

newSurgeon.save((error, surgeon) => {
if (error) { console.log(error); }
res.send(surgeon);
});
});
};



    

