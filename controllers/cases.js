//this file contains the endpoint to CRUD cases in the database
const CaseSchema = require('../models/Case.js');

module.exports.controller = (app) => {
// fetch all cases
app.get('/cases', (req, res) => {
    CaseSchema.find({}, 'casenr pid fid name surname birthdate diagnose operation isismodality opdate surgeon assistant', (error,
    cases) => {
    if (error) { console.log(error); }
    res.send({
    cases,
    });
    });
    });

// fetch a single case
app.get('/cases/:id', (req, res) => {
    CaseSchema.findOne({_id: req.params.id}, 'casenr pid fid name surname birthdate diagnose operation isismodality opdate surgeon assistant', (error,
    cases) => {
    if (error) { console.log(error); }
    res.send({
    cases,
    });
    });
    });

// update a  case
app.put('/cases/:id', (req, res) => {
    CaseSchema.findById(req.params.id, 'casenr pid fid name surname birthdate diagnose operation isismodality opdate surgeon assistant', (error,
    ccase) => {
    if (error) { console.log(error); }
    ccase.casenr = req.body.casenr,
    ccase.pid = req.body.pid,
    ccase.fid = req.body.fid,
    ccase.name = req.body.name,
    ccase.surname = req.body.surname,
    ccase.birthdate = req.body.birthdate,
    ccase.diagnose = req.body.diagnose,
    ccase.operation = req.body.operation,
    ccase.isismodality = req.body.isismodality,
    ccase.opdate = req.body.opdate,
    ccase.surgeon = req.body.surgeon,
    ccase.assistant = req.body.assistant,
    ccase.save(function (error, ccase) {
        if (error) { console.log(error); }
        res.send(ccase)
        })
  
    });
    });




    //delete case from the database

app.delete('/cases/:id', (req, res) => {
    CaseSchema.remove({
        _id: req.params.id 
    }, function(error, ccase){
        if (error){console.error(error);}
        res.send({success:true})
    })
    });


// add a new case
app.post('/cases', (req, res) => {
const newCase = new CaseSchema({
    casenr: req.body.casenr,
    pid: req.body.pid,
    fid: req.body.fid,
    name: req.body.name,
    surname: req.body.surname,
    birthdate: req.body.birthdate,
    diagnose: req.body.diagnose,
    operation: req.body.operation,
    isismodality: req.body.isismodality,
    opdate: req.body.opdate,
    surgeon: req.body.surgeon,
    assistant: req.body.assistant,

});

newCase.save((error, ccase) => {
if (error) { console.log(error); }
res.send(ccase);
});
});
};