import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const userService = {};

userService.requireAuth = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err || !user) {
            res.status(401).send({
                success: false,
                message: 'Unauthorized'
            });
            return;
        }
        req.user = user;
        return next();
    })(req, res, next);
};

userService.signup = (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (info !== undefined) {
            if (info.message == 'email already registered') {
                res.status(403).send({
                    success: false,
                    message: 'Email address already registered'
                });
                return;
            }
            res.status(422).send({
                success: false,
                message: info.message
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: 'user created'
        });

    })(req, res, next);
};

userService.signin = (req, res, next) => {
    passport.authenticate('signin', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (info !== undefined) {
            if (info.message == 'wrong username' || info.message == 'wrong password') {
                res.status(401).send({
                    success: false,
                    message: 'Authentication failed! Incorrect username or password'
                });
                return;
            }
            res.status(403).send({
                success: false,
                message: info.message
            });
            return;
        }

        req.login(user, () => {
            const token = jwt.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: '7d'
            });

            res.status(200).send({
                success: true,
                message: 'Authentication successful',
                token
            });
        });

    })(req, res, next);
};

export default userService;