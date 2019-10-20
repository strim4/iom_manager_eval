//this file contains the endpoint to CRUD assistants in the database
const AssistantSchema = require('../models/Assistant.js');

module.exports.controller = (app) => {
// fetch all assistants
app.get('/assistants', (req, res) => {
    AssistantSchema.find({}, 'assistant', (error,
    assistants) => {
    if (error) { console.log(error); }
    res.send({
    assistants,
    });
    });
    });

//delete assistant from the database

app.delete('/assistants/:id', (req, res) => {
  AssistantSchema.remove({
      _id: req.params.id 
  }, function(error, assistant){
      if (error){console.error(error);}
      res.send({success:true})
  })
  });
    




// add a new assistant
app.post('/assistants', (req, res) => {
const newAssistant = new AssistantSchema({
        assistant: req.body.assistant,

});

newAssistant.save((error, assistant) => {
if (error) { console.log(error); }
res.send(assistant);
});
});
};



    

