//this file contains the endpoint to CRUD completed cases in the database
const CompletcaseSchema = require('../models/Completcase.js');

module.exports.controller = (app) => {

// fetch all completed cases
app.get('/completcase', (req, res) => {
    CompletcaseSchema.find({}, 'casenr pid fid name surname birthdate diagnose operation isismodality opdate surgeon assistant entries evaluation baselines extras', (error,
    protocols) => {
    if (error) { console.log(error); }
    res.send({
        protocols,
    });
    });
    });

//fetch a single case
app.get('/completcase/:casenr', (req, res) => {
    CompletcaseSchema.findOne({casenr: req.params.casenr}, 'casenr pid fid name surname birthdate diagnose operation isismodality opdate surgeon assistant entries evaluation baselines extras', (error,
    protocols) => {
    if (error) { console.log(error); }
    res.send({
    protocols,
    });
    });
    });
    

// add a new completed case
app.post('/completcase', (req, res) => {
    const newCompletCase = new CompletcaseSchema({
        
       // id: req.body.id,
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
        entries: req.body.entries,
        evaluation: req.body.evaluation,
        baselines: req.body.baselines,
        extras: req.body.extras,
        interpretation: req.body.interpretation,
        edf: req.body.edf,
    
    });
    
    newCompletCase.save((error, protocol) => {
    if (error) { console.log(error); }
    res.send(protocol);
    });
    });
    




    /*delete a protocol from the database

app.delete('/cases/:id', (req, res) => {
    CaseSchema.remove({
        _id: req.params.id 
    }, function(error, ccase){
        if (error){console.error(error);}
        res.send({success:true})
    })
    });
*/

// add a new completed case
app.post('/completcase', (req, res) => {
const newCompletCase = new CompletcaseSchema({
    
   // id: req.body.id,
   casenr: req.body.casenr,
   pid:  req.body.pid,
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
   entries: req.body.entries,
   evaluation: req.body.evaluation,
   baselines: req.body.baselines,
   extras: req.body.extras,
   interpretation: req.body.interpretation,
   edf: req.body.edf,

});

newCompletCase.save((error, protocol) => {
if (error) { console.log(error); }
res.send(protocol);
});
});
};