const express = require('express');
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
console.log(authMiddleware,authMiddleware)
const router = express.Router();

router.get('/users',authMiddleware,adminMiddleware,async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const deletePendingAccounts = async () => {
    try {
      const users = await User.find({ deletionRequest: true });
      users.forEach(async (user) => {
        const timeElapsed = Date.now() - new Date(user.createdAt).getTime();
        if (timeElapsed > 15 * 24 * 60 * 60 * 1000) {
          await User.findByIdAndDelete(user._id);
        }
      });
    } catch (error) {
      console.error('Error deleting pending accounts:', error);
    }
  };

  // Schedule the deletion task to run once a day
  setInterval(deletePendingAccounts, 24 * 60 * 60 * 1000); // 24 hours
  
module.exports = router;
