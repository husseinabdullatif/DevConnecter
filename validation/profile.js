const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function (data) {

    data.handle = isEmpty(data.handle) ? '' : data.handle;
    data.status = isEmpty(data.status) ? '' : data.status;
    data.skills = isEmpty(data.skills) ? '' : data.skills;

    data.youtube = isEmpty(data.youtube) ? '' : data.youtube;
    data.twitter = isEmpty(data.twitter) ? '' : data.twitter;
    data.facebook = isEmpty(data.facebook) ? '' : data.facebook;
    data.linkedin = isEmpty(data.linkedin) ? '' : data.linkedin;
    data.instagram = isEmpty(data.instagram) ? '' : data.instagram;

    let errors = {};

    if (!validator.isLength(data.handle, {min: 2, max: 30})) {
        errors.handle = 'handle needs to be between 2 and 4 characters';
    }
    //required field
    if (validator.isEmpty(data.handle)) {
        errors.handle = 'profile handle is required';
    }

    if (validator.isEmpty(data.status)) {
        errors.status = 'status field handle is required';
    }

    if (validator.isEmpty(data.skills)) {
        errors.skills = 'skills field handle is required';
    }
    //social
    if (!isEmpty(data.linkedin)) {
        if (!validator.isURL(data.linkedin)) {
            errors.linkedin = 'not a valid URL';
        }
    }
    if (!isEmpty(data.youtube)) {
        if (!validator.isURL(data.youtube)) {
            errors.youtube = 'not a valid URL';
        }
    }
    if (!isEmpty(data.instagram)) {
        if (!validator.isURL(data.instagram)) {
            errors.instagram = 'not a valid URL';
        }
    }
    if (!isEmpty(data.twitter)) {
        if (!validator.isURL(data.twitter)) {
            errors.twitter = 'not a valid URL';
        }
    }
    if (!isEmpty(data.facebook)) {
        if (!validator.isURL(data.facebook)) {
            errors.facebook = 'not a valid URL';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};