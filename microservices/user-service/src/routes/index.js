const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/healthz', (_, res) => res.sendStatus(200));

router.get('/', (_, res) => {
    return res.json({
        message: 'Conferense user-service API v1',
    });
});

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
        async (err, user) => {
            try {
                if (err || !user) {
                    const error = new Error('An error occurred.');

                    return next(error);
                }

                req.login(
                    user,
                    { session: false },
                    async (error) => {
                        if (error) return next(error);

                        const body = { _id: user._id };
                        // TODO: Replace public_key with secret or private key
                        const token = jwt.sign({ user: body }, 'public_key');

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
