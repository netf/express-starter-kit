const Joi = require('joi');

const user = { 
    signup: Joi.object().keys({
        email: Joi.string().email().required(), 
        firstname: Joi.string().required(), 
        lastname: Joi.string().required(),
        password: Joi.string().min(6).max(128).required()
    }), 
    signin: Joi.object().keys({
        email: Joi.string().email().required(), 
        password: Joi.string().max(128).required()
    })
};

module.exports = user;