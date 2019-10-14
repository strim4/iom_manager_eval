//this file contains the endpoint to CRUD diagnoses in the database
const DiagnoseSchema = require('../models/Diagnose.js');

module.exports.controller = (app) => {
// fetch all diagnoses
app.get('/diagnoses', (req, res) => {
    DiagnoseSchema.find({}, 'diagnose', (error,
    diagnoses) => {
    if (error) { console.log(error); }
    res.send({
    diagnoses,
    });
    });
    });



// add a new diagnose
app.post('/diagnoses', (req, res) => {
const newDiagnose = new DiagnoseSchema({
        diagnose: req.body.diagnose,

});

newDiagnose.save((error, diagnose) => {
if (error) { console.log(error); }
res.send(diagnose);
});
});
};