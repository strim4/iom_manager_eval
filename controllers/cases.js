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