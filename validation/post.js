const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function (body) {
    let errors = {};
    body.text = isEmpty(body) ? '' : body.text;
    if(validator.isEmpty(body.text)){
        errors.text = 'text field is required';
    }
    return{
        errors,
        isValid: isEmpty(errors)
    }
};