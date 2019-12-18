//this file contains the endpoint to CRUD protocols in the database
const ProtocolSchema = require('../models/Protocol.js');
const passport = require('passport');

module.exports.controller = (app) => {

// fetch all protocols
app.get('/protocols', passport.authenticate('jwt', { session: false }),(req, res) => {
    ProtocolSchema.find({}, 'casenr pid fid name surname birthdate diagnose operation isismodality opdate surgeon assistant entries evaluation baselines extras closing', (error,
    protocols) => {
    if (error) { console.log(error); }
    res.send({
        protocols,
    });
    });
    });

//fetch a single protocol
app.get('/protocols/:casenr',passport.authenticate('jwt', { session: false }), (req, res) => {
    ProtocolSchema.findOne({casenr: req.params.casenr}, 'casenr pid fid name surname birthdate diagnose operation isismodality opdate surgeon assistant entries evaluation baselines extras closing', (error,
    protocols) => {
    if (error) { console.log(error); }
    res.send({
    protocols,
    });
    });
    });
    

/* update a  protocol
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
    */




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

// add a new protocol
app.post('/protocols', passport.authenticate('jwt', { session: false }),(req, res) => {
const newProtocol = new ProtocolSchema({
    
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

});

newProtocol.save((error, protocol) => {
if (error) { console.log(error); }
res.send(protocol);
});
});
};