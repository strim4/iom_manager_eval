//this file contains the endpoint to CRUD operations in the database
const OperationSchema = require('../models/Operation.js');

module.exports.controller = (app) => {
// fetch all operations
app.get('/operations', (req, res) => {
    OperationSchema.find({}, 'operation', (error,
    operations) => {
    if (error) { console.log(error); }
    res.send({
    operations,
    });
    });
    });

//delete operation from the database

app.delete('/operations/:id', (req, res) => {
  OperationSchema.remove({
      _id: req.params.id 
  }, function(error, operation){
      if (error){console.error(error);}
      res.send({success:true})
  })
  });
    




// add a new operation
app.post('/operations', (req, res) => {
const newOperation = new OperationSchema({
        operation: req.body.operation,

});

newOperation.save((error, operation) => {
if (error) { console.log(error); }
res.send(operation);
});
});
};



    

