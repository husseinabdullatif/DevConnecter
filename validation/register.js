const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function (data) {
    let errors = {};
    //
    data.name = isEmpty(data.name) ? "" : data.name;
    data.email = isEmpty(data.email) ? "" : data.email;
    data.password = isEmpty(data.password) ? "" : data.password;
    data.password2 = isEmpty(data.password2) ? "" : data.password2;
    //
    if (!validator.isLength(data.name, {min: 2, max: 30})) {
        errors.name = "name must be between 2 and 30 characters"
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "Enter a valid email"
    }
    if (!validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "password must be at least 6 characters"
    }
    if (!validator.equals(data.password, data.password2)) {
        errors.notEquals = "password must match"
    }
    //
    if (validator.isEmpty(data.name)) {
        errors.name = "Name field is required"
    }
    if (validator.isEmpty(data.email)) {
        errors.email = "email field is required"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "password field is required"
    }
    if (validator.isEmpty(data.password2)) {
        errors.password2 = "password2 field is required"
    }
    //
    return {
        errors,
        isValid: isEmpty(errors)
    }
};