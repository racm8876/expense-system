/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState('weekly');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`/api/expenses?filter=${filter}`);
        setExpenses(response.data);
      } catch (error) {
        alert(error.response.data.error);
      }
    };

    fetchExpenses();
  }, [filter]);

  return (
    <div>
      <h2>View Expenses</h2>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.title}: ${expense.amount} - {expense.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewExpenses;
