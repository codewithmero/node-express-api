const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

// GET REQUEST
router.get('/', async (req, res) => {
  const userList = await User.find().sort('firstName');
  res.send(userList);
});

// POST REQUEST
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if(error)
    return res.status(400).send(error.message);

  console.log('Creating new user');
  const newUser = new User({
    ...req.body
  });

  await newUser.save();
  res.send(newUser);
});

// GET REQUEST FOR A SPECIFIC USER
router.get('/:id', async (req, res) => {
  const userInputId = req.params.id;
  const fetchedUser = await User.findById({ _id: userInputId });
  if(!fetchedUser)
    return res.status(404).send('User with the given ID wasn\'t found!');
  
  res.send(fetchedUser);
});

// PUT REQUEST
router.put('/:id', async (req, res) => {
  const userInputId = req.params.id;
  let fetchedUser = await User.findById({ _id: userInputId });
  if(!fetchedUser)
    return res.status(404).send('User with the given ID wasn\'t found!');
  
  const { error } = validate(req.body);
  if(error)
    return res.status(400).send(error.message);

 
  fetchedUser.firstName = req.body.firstName;
  fetchedUser.age = req.body.age;
  fetchedUser.phone = req.body.phone;
  fetchedUser.address = req.body.address;
  if(req.body.lastName)
    fetchedUser.lastName = req.body.lastName;
  
  await fetchedUser.save();
  res.send(fetchedUser);
  
});

// DELETE REQUEST
router.delete('/:id', async (req, res) => {
  const userInputId = req.params.id;
  const fetchedUser = await User.findByIdAndDelete({ _id: userInputId });
  if(!fetchedUser)
    return res.status(404).send('User with the given ID wasn\'t found!');

  res.send("Record deleted Successfully");
});

module.exports = router;