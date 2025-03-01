const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ message: 'User already exists' });

  const user = new User({ fullName, email, password });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) return res.status(400).json({ message: 'Invalid credentials' });

  res.json({ token: generateToken(user._id), message: 'Login successful' });
};
