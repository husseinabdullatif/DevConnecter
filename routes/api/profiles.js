const express = require('express');
const router = express.Router();

const passport = require('passport');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

const validateProfile = require('../../validation/profile');
const validateProfileExp = require('../../validation/profileExp');
const validateProfileEducation = require('../../validation/profileEducation');

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            const errors = {};
            if (!profile) {
                errors.noProfile = 'there is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);

        })
        .catch(err => res.json(err));
});

router.get('/handle/:handle', (req, res) => {
    Profile.findOne({handle: req.params.handle})
        .then(profile => {
            let errors = {};
            if (profile) {
                return res.json(profile)
            } else {
                errors.noProfile = 'there is no profile for this user';
                res.status(404).json(errors);
            }
        })

});

router.get('/user/:id', (req, res) => {
    Profile.findOne({user: req.params.id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (profile) {
                return res.json(profile)
            }
        }).catch(err => res.json(err));

});

router.get('/all', (req, res) => [
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            let errors = {};
            errors.profiel = 'there is no profiles';
            if (!profiles) {
                return res.status(404).json(errors);
            }
            return res.json(profiles);
        })
]);

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, isValid} = validateProfile(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle) {
        profileFields.handle = req.body.handle
    }
    if (req.body.company) {
        profileFields.company = req.body.company
    }
    if (req.body.website) {
        profileFields.website = req.body.website
    }
    if (req.body.location) {
        profileFields.location = req.body.location
    }
    if (req.body.status) {
        profileFields.status = req.body.status
    }
    if (typeof (req.body.skills) !== 'undefined') {
        profileFields.skills = req.body.skills.trim().split(',');
    }
    if (req.body.bio) {
        profileFields.bio = req.body.bio
    }
    if (req.body.githubusername) {
        profileFields.githubusername = req.body.githubusername
    }
    //experience
    if (req.body.title) {
        profileFields.experience.title = req.body.title
    }
    if (req.body.company) {
        profileFields.experience.company = req.body.company
    }
    if (req.body.location) {
        profileFields.experience.location = req.body.location
    }
    if (req.body.from) {
        profileFields.experience.from = req.body.from
    }
    if (req.body.to) {
        profileFields.experience.to = req.body.to
    }
    if (req.body.current) {
        profileFields.experience.current = req.body.current
    }
    //social
    profileFields.social = {};
    if (req.body.youtube) {
        profileFields.social.youtube = req.body.youtube
    }
    if (req.body.twitter) {
        profileFields.social.twitter = req.body.twitter
    }
    if (req.body.facebook) {
        profileFields.social.facebook = req.body.facebook
    }
    if (req.body.instagram) {
        profileFields.social.instagram = req.body.instagram
    }
    if (req.body.linkedin) {
        profileFields.social.linkedin = req.body.linkedin
    }
    Profile.findOne({user: req.user.id})
        .then(profile => {
            if (profile) {
                Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true}).then(profile => res.json(profile));
            } else {
                Profile.findOne({handle: req.body.handle})
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'this handle already exists';
                            res.status(400).json(errors);
                        } else {
                            new Profile(profileFields).save().then(profile => res.json(profile))
                        }
                    })
            } 
        })
});

//route api/profile/experience
//@access private
router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateProfileExp(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };
            profile.experience.unshift(newExp);
            profile.save().then(profile => res.json(profile));
        })
});
//route api/profile/education
//@access private
router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateProfileEducation(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const newEducaion = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };
            profile.education.unshift(newEducaion);
            profile.save().then(profile => res.json(profile));
        })
});
//@type delete request
//@route api/profile/experience
//@access private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const deletedExperience = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
            profile.experience.splice(deletedExperience,1);
            profile.save().then(res.json(profile));
        }).catch(err => res.status(404).json(err));
});
//@type delete request
//@route api/profile/education
//@access private
router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const deletedEducation = profile.education.map(item => item.id).indexOf(req.params.exp_id);
            profile.education.splice(deletedEducation,1);
            profile.save().then(res.json(profile));
        }).catch(err => res.status(404).json(err));
});
//delete whole profile
//@route api/profile
//@access private
router.delete('/',passport.authenticate('jwt', {session: false}), (req, res)=>{
   Profile.findOneAndRemove({user: req.user.id})
       .then(() => {
           User.findOneAndRemove({_id: req.user.id}).then(user=>{res.json(user)});
       })
       .catch(err => res.status(404).json(err));
});
module.exports = router;