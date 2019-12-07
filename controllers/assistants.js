//this file contains the endpoint to CRUD assistants in the database
const AssistantSchema = require('../models/Assistant.js');

const passport = require('passport');

module.exports.controller = (app) => {
// fetch all assistants
app.get('/assistants', passport.authenticate('jwt', { session: false }),(req, res) => {
    AssistantSchema.find({}, 'assistant', (error,
    assistants) => {
    if (error) { console.log(error); }
    res.send({
    assistants,
    });
    });
    });

//delete assistant from the database

app.delete('/assistants/:id', passport.authenticate('jwt', { session: false }),(req, res) => {
  AssistantSchema.remove({
      _id: req.params.id 
  }, function(error, assistant){
      if (error){console.error(error);}
      res.send({success:true})
  })
  });
    




// add a new assistant
app.post('/assistants', passport.authenticate('jwt', { session: false }),(req, res) => {
const newAssistant = new AssistantSchema({
        assistant: req.body.assistant,

});

newAssistant.save((error, assistant) => {
if (error) { console.log(error); }
res.send(assistant);
});
});
};



    

