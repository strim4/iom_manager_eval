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

// delete a diagnose
app.delete('/person/:id', async (request, response) => {

    try {
        var result = await DiagnoseSchema.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});