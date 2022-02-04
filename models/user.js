import mongoose from 'mongoose';
import Joi from 'joi';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLenght: 5,
    maxLenght: 50
  },
  lastName: {
    type: String,
    trim: true,
    minLenght: 5,
    maxLenght: 50
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minLenght: 5,
    maxLenght: 50
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minLenght: 5,
    maxLenght: 255
  }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const Schema = Joi.object({
    firstName: Joi.string(5).min(50).max().required(),
    lastName: Joi.string(5).min(50).max(),
    age: Joi.number().required(),
    phone: Joi.string().min(5).max(50).required(),
    address: Joi.string().min(5).max(255).required(),
  });
  return Schema.validate(user);
}

export default {
  User,
  validate: validateUser
};