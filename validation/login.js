const validator = require('validator');

const isEmpty = require('./isEmpty');

module.exports = function (data) {
    let errors = {};

    data.password = isEmpty(data.password) ? "" : data.password;
    data.email = isEmpty(data.email) ? "" : data.email;

    if (!validator.isEmail(data.email)) {
        errors.email = "Enter a valid email"
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "email field is required"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "password field is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};