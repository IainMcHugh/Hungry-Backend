// Validation
const Joi = require("@hapi/joi");


// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    restaurant: Joi.string().min(6).required(),
    owner: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    license: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  return schema;
};

// Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    });
    return schema;
  };

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;