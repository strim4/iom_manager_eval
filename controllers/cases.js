//this file contains the endpoint to save cases in the database
const CaseSchema = require('../models/Case.js');

module.exports.controller = (app) => {
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