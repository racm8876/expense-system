const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ id: user._id, role: user.role }, 'SECRET', { expiresIn: '1d' });
//     res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, 'SECRET', { expiresIn: '1d' });
  
      // Return the token and role in the response body
      res.status(200).json({
        message: 'Login successful',
        token, // Send token in the response body
        role: user.role, // Send the user role as well
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
router.post('/request-deletion', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (user.deletionRequest) {
        return res.status(400).json({ message: 'Deletion request already sent.' });
      }
  
      user.deletionRequest = true;
      await user.save();
      res.status(200).json({ message: 'Account deletion request received. Your account will be deleted in 15 days.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
