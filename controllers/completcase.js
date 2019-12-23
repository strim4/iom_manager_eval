//this file contains the endpoint to CRUD completed cases in the database
const CompletcaseSchema = require('../models/Completcase.js');
const passport = require('passport');


module.exports.controller = (app) => {

// fetch all completed cases
app.get('/completcase', passport.authenticate('jwt', { session: false }),(req, res) => {
    CompletcaseSchema.find({}, 'casenr pid fid name surname birthdate diagnose operation isismodality opdate surgeon assistant entries evaluation baselines extras closing interpretation edf', (error,
    protocols) => {
    if (error) { console.log(error); }
    res.send({
        protocols,
    });
    });
    });

//fetch a single case
app.get('/completcase/:casenr',  (req, res) => {
    CompletcaseSchema.findOne({casenr: req.params.casenr}, '_id casenr pid fid name surname birthdate diagnose operation isismodality opdate surgeon assistant entries evaluation baselines extras closing interpretation edf', (error,
    protocols) => {
    if (error) { console.log(error); }
    res.send({
    protocols,
    });
    });
    });

    
    // update a  case
app.put('/completcase/:casenr',  passport.authenticate('jwt', { session: false }),(req, res) => {
    CompletcaseSchema.findOne({casenr: req.params.casenr}, 'casenr pid fid name surname birthdate diagnose operation isismodality opdate surgeon assistant entries evaluation baselines extras closing interpretation edf', (error,
        protocols) => {
    if (error) { console.log(error); }
    protocols.casenr = req.body.casenr,
    protocols.pid = req.body.pid,
    protocols.fid = req.body.fid,
    protocols.name = req.body.name,
    protocols.surname= req.body.surname,
    protocols.birthdate = req.body.birthdate,
    protocols.diagnose = req.body.diagnose,
    protocols.operation = req.body.operation,
    protocols.isismodality = req.body.isismodality,
    protocols.opdate = req.body.opdate,
    protocols.surgeon = req.body.surgeon,
    protocols.assistant= req.body.assistant,
    protocols.entries = req.body.entries,
    protocols.evaluation= req.body.evaluation,
    protocols.baselines= req.body.baselines,
    protocols.extras= req.body.extras,
    protocols.closing= req.body.closing,
    protocols.interpretation= req.body.interp,
    protocols.edf= req.body.file,
    protocols.save(function (error, protocols) {
        if (error) { console.log(error); }
        res.send(protocols)
        })
  
    });
    });
    

// add a new completed case
app.post('/completcase', passport.authenticate('jwt', { session: false }), (req, res) => {
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
        closing: req.body.closing,
        interpretation: req.body.interp,
        edf: req.body.file,
    
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

/*
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
   closing: req.body.closing,
   interpretation: req.body.interpretation,
   edf: req.body.edf,

});

newCompletCase.save((error, protocol) => {
if (error) { console.log(error); }
res.send(protocol);
});
});*/
}; 