import bcrypt from 'bcrypt';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const User = mongoose.model('user');
const BCRYPT_SALT_ROUNDS = 8;
const jwtOpts = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'), 
        jwtAlgorithm: 'HS256',
        jwtExpiresIn: '7 days',
        secretOrKey: process.env.SECRET
};


passport.use('signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        failWithError: true,
        session: false,
    }, async (req, username, password, done) => {
        try {
            let user = await User.getByEmail(username);
            if (user != null) {
                return done(null, false, {
                    message: 'email already registered'
                });
            }

            const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
            user = new User({
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: passwordHash
            });

            const res = await user.save();

            return done(null, user);
        } catch(err) {
            if (err.name == 'ValidationError') {
                return done(null, false, {
                    message: err.message
                });
            }
            return done(err, false);
        }
    }
));

passport.use('signin', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: false,
    }, async (req, username, password, done) => {
        try {
            const user = await User.getByEmail(username);
            if (user == null) {
                return done(null, false, {
                    message: 'wrong username'
                });
            }
            
            const passwordMatch = await User.comparePassword(password, user.password);
            if (passwordMatch !== true) {
                return done(null, false, {
                    message: 'wrong password'
                });
            }
            return done(null, user);
        } catch(err) {
            return done(err, false)
        }
    }
));

passport.use('jwt', new JWTstrategy(jwtOpts, async (payload, done) => {
        try {
            const user = await User.findById(payload.id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch(err) {
            return done(err, false)
        }
    }
));