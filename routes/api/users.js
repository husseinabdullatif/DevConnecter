const express = require('express');
const router = express.Router();

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const jwtKey = require('../../config/keys').jwtKey;
const validateRegister = require('../../validation/register');
const validateLogin = require('../../validation/login');

router.post('/register', (req, res) => {

    const {errors, isValid} = validateRegister(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                return res.status(400).json({error: "email already exist"})
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar
                });

                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if (err) console.log(err);
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                });
            }
        })

});

router.post('/login', (req, res) => {

    const {errors, isValid} = validateLogin(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                errors.email = "email is not exist";
                return res.status(404).json(errors)
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            const payload = {id: user.id, name: user.name, avatar: user.avatar};
                            jwt.sign(payload, jwtKey, {expiresIn: 3600}, (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            })
                        } else {
                            errors.password = "password not correct";
                            return res.status(400).json(errors)
                        }
                    })
            }
        })

});

//@access private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json(req.user)
});

module.exports = router;