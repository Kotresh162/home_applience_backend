const User = require('../models/user');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

// Hash password before saving the user
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await hashPassword(password); // Hash the password
  const user = new User({ fullName, email, password: hashedPassword }); // Save hashed password

  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) return res.status(400).json({ message: 'Invalid credentials' });

  res.json({ token: generateToken(user._id), message: 'Login successful' });
};
