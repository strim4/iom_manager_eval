//this file contains the endpoint to CRUD operations in the database
const OperationSchema = require('../models/Operation.js');
const passport = require('passport');

module.exports.controller = (app) => {
// fetch all operations
app.get('/operations', passport.authenticate('jwt', { session: false }),(req, res) => {
    OperationSchema.find({}, 'operation', (error,
    operations) => {
    if (error) { console.log(error); }
    res.send({
    operations,
    });
    });
    });

//delete operation from the database

app.delete('/operations/:id', passport.authenticate('jwt', { session: false }),(req, res) => {
  OperationSchema.remove({
      _id: req.params.id 
  }, function(error, operation){
      if (error){console.error(error);}
      res.send({success:true})
  })
  });
    




// add a new operation
app.post('/operations',passport.authenticate('jwt', { session: false }), (req, res) => {
const newOperation = new OperationSchema({
        operation: req.body.operation,

});

newOperation.save((error, operation) => {
if (error) { console.log(error); }
res.send(operation);
});
});
};



    

