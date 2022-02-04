const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 50
  },
  lastName: {
    type: String,
    trim: true,
    minLength: 4,
    maxLength: 50
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 50
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 255
  }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  console.log('inside joi function');
  const Schema = Joi.object({
    firstName: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(4).max(50),
    age: Joi.number().required(),
    phone: Joi.string().min(5).max(50).required(),
    address: Joi.string().min(5).max(255).required(),
  });
  console.log('validating dunction');
  return Schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;