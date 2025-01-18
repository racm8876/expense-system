const express = require('express');
const Expense = require('../models/Expense');
const { authMiddleware } = require('../middleware/authMiddleware');
// const { authMiddleware } = require('../middleware/authMiddleware');
const { generateCSV } = require('../controllers/csvController'); // Import the controller
const router = express.Router();

// router.post('/add', async (req, res) => {
//     const { title, amount, category } = req.body;
//     try {
//       // Replace 'dummyUserId' with an actual user ID from the database
//       const newExpense = new Expense({ ...req.body, userId: '64d9f0e5b7c7a2f1e67890ab' });
//       await newExpense.save();
//       res.status(201).json(newExpense);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });
  
router.post('/add', authMiddleware, async (req, res) => {
    const { title, amount, category } = req.body;
    try {
      const newExpense = new Expense({ ...req.body, userId: req.user.id });  // Use the user ID from the authenticated user
      await newExpense.save();
      res.status(201).json(newExpense);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

router.get('/', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to download expenses as CSV
router.get('/download-expenses', authMiddleware, generateCSV);
module.exports = router;
