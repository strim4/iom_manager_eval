//this file contains the endpoint to CRUD users in the database

const User = require('../models/User.js');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'thisisthesecretkey';
const passport = require('passport');
const JwtStrategy = passportJWT.Strategy;


module.exports.controller = (app) => {


    passport.use(new JwtStrategy(jwtOptions, function (jwtPayload, done) {
        //If the token has expiration, raise unauthorized
        var expirationDate = new Date(jwtPayload.exp * 1000)
        if(expirationDate < new Date()) {
          return done(null, false);
        }
        var user = jwtPayload
        done(null, user)
        console.log(user);
      }));


      //fetch a single user
// fetch a single case
app.get('/users/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findOne({_id: req.params.id}, 'name', (error,
    users) => {
    if (error) { console.log(error); }
    res.send({
    users,
    });
    });
    });






    // register a user
    app.post('/users/register', (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const newUser = new User({
            name,
            email,
            password,

        });

        User.createUser(newUser, (error, user) => {
            if (error) {
                res.status(422).json({
                    message: 'Registrierung fehlgeschlagen!',
                });
            }
            res.send({ user });
        });
    });

    // login a user
    app.post('/users/login', (req, res) => {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            User.getUserByEmail(email, (err, user) => {
                if (!user) {
                    res.status(404).json({ message: 'Der Benutzer existiert nicht!' });
                } else {
                    User.comparePassword(password, user.password, (error, isMatch) => {
                        if (error) throw error;
                        if (isMatch) {
                            const payload = { id: user.id };
                            const token = jwt.sign(payload, jwtOptions.secretOrKey);
                            res.json({ message: 'ok', token });
                        } else {
                            res.status(401).json({
                                message: 'Passwort nicht korrekt!'
                            });
                        }
                    });
                }
            });
        }
    });
};