import React, { useState } from "react";
import "./Analytics.css";
import { Chart, registerables } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// ✅ Register Chart.js components
Chart.register(...registerables);

const Analytics = () => {
  const [income, setIncome] = useState(7000);
  const [expenses, setExpenses] = useState(4500);
  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [newExpense, setNewExpense] = useState({ category: "", amount: "" });
  const [expenseList, setExpenseList] = useState([
    { category: "Dining & Groceries", amount: 800 },
    { category: "Transportation", amount: 1400 },
    { category: "Rent & Utilities", amount: 3000 },
    { category: "Entertainment", amount: 300 },
    { category: "Shopping", amount: 500 },
    { category: "Savings & Investments", amount: 1100 },
  ]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  // 🔹 Calculate savings dynamically
  const savings = income - expenses;

  const handleAddExpense = () => {
    if (newExpense.category && newExpense.amount) {
      const amount = parseFloat(newExpense.amount);
      setExpenses(expenses + amount);
      setExpenseList([...expenseList, { category: newExpense.category, amount }]);
      setNewExpense({ category: "", amount: "" });
      setShowExpenseForm(false);
    }
  };

  const handleIncomeChange = (e) => {
    setIncome(Number(e.target.value));
  };

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Income",
        data: [800, 980, 600, 700, 500, 400, 600, 700, 650, 900, 950, 1000],
        backgroundColor: "#14b8a6",
      },
      {
        label: "Expenses",
        data: [500, 430, 300, 400, 350, 200, 300, 400, 380, 600, 700, 800],
        backgroundColor: "#0f172a",
      },
    ],
  };

  const pieData = {
    labels: expenseList.map((expense) => expense.category),
    datasets: [
      {
        data: expenseList.map((expense) => expense.amount),
        backgroundColor: ["#14b8a6", "#0f172a", "#1e40af", "#a3e635", "#e11d48", "#6366f1"],
      },
    ],
  };

  return (
    <div className="analytics-container">
      <div className="header">
        <h1>Welcome back, Tayo</h1>
        <p>You're ${150 - savings < 0 ? 0 : 150 - savings} away from your savings goal <span>keep going! 🫶</span></p>
        <div className="buttons">
          <button className="add-expense" onClick={() => setShowExpenseForm(true)}>+ Add Expense</button>
        </div>
        {showExpenseForm && (
          <div className="expense-form">
            <input
              type="text"
              placeholder="Expense Category"
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
            <button onClick={handleAddExpense}>Submit</button>
          </div>
        )}
      </div>

      <div className="stats-cards">
        <div className="card">
          <h3>Total Income</h3>
          <h2 onClick={() => setIsEditingIncome(true)}>${income}</h2>
          {isEditingIncome && (
            <input
              type="number"
              value={income}
              onChange={handleIncomeChange}
              onBlur={() => setIsEditingIncome(false)}
              autoFocus
            />
          )}
          <p className="increase">⬆ 40% vs last month</p>
        </div>
        <div className="card">
          <h3>Total Expenses</h3>
          <h2>${expenses}</h2>
          <p className="decrease">⬇ 10% vs last month</p>
        </div>
        <div className="card">
          <h3>Savings This Month</h3>
          <h2>${savings}</h2>
          <p className="increase">⬆ 20% vs last month</p>
        </div>
      </div>

      <div className="charts">
        <div className="bar-chart">
          <h3>Monthly Income vs Expenses</h3>
          {/* ✅ FIX: Add `redraw` prop to prevent chart errors */}
          <Bar data={barData} redraw />
        </div>
        <div className="pie-chart">
          <h3>Spending Distribution</h3>
          {/* ✅ FIX: Add `redraw` prop */}
          <Pie data={pieData} redraw />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
