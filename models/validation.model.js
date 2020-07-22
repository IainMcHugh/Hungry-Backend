// Validation
const Joi = require("@hapi/joi");


// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    restaurant: Joi.string().min(6).required(),
    owner: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    license: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  console.log(schema.validate(data));
  return schema.validate(data);
};

// Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
  };

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;