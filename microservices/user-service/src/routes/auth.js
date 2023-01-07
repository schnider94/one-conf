const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res) => {
        res.json({
            user: req.user
        });
    }
);

router.post(
    '/login',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err, user, message) => {
            try {
                if (err || !user) {
                    console.log(err, message);
                    const error = new Error('An error occurred.');

                    return next(error);
                }

                req.login(
                    user,
                    { session: false },
                    async (error) => {
                        if (error) return next(error);

                        const body = { _id: user._id };
                        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

                        return res.json({ token });
                    }
                );
            } catch (error) {
                return next(error);
            }
        }
      )(req, res, next);
    }
);

module.exports = router;
