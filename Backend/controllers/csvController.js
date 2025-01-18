const fs = require('fs');
const { parse } = require('json2csv');
const Expense = require('../models/Expense');

// Controller function to generate and send CSV
const generateCSV = async (req, res) => {
  try {
    // Fetch expenses from the database for the logged-in user
    const expenses = await Expense.find({ userId: req.user.id });

    // Convert expenses data to CSV format
    const csv = parse(expenses);

    // Define file path
    const filePath = './expenses.csv';

    // Write CSV data to a file
    fs.writeFileSync(filePath, csv);

    // Send the CSV file as a download
    res.download(filePath, 'expenses.csv', (err) => {
      if (err) {
        res.status(500).send('Error generating file');
      }
      fs.unlinkSync(filePath); // Delete the file after download
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateCSV };
