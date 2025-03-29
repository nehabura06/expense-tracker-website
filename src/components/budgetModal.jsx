import React, { useState, useEffect } from "react";
import axios from "axios";

const BudgetModal = ({ isOpen, onClose, budgetData, onBudgetSet }) => {
  const [category, setCategory] = useState("Overall Budget");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (budgetData) {
      setCategory(budgetData.category);
      setAmount(budgetData.budgetAmount);
    } else {
      setCategory("Overall Budget");
      setAmount("");
    }
  }, [budgetData]);

  const handleSave = async () => {
    if (Number.isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid budget amount.");
      return;
    }

    const payload = { category, budgetAmount: Number(amount) };
    try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('No token found. Please log in again.');
          return;
        }
        // const authToken = `Bearer ${token}`;
        const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  
        if (budgetData) {
          await axios.put(`http://localhost:5000/api/budget/${budgetData._id}`, payload, { headers: { Authorization: authToken } });
        } else {
          await axios.post("http://localhost:5000/api/budget/set", payload, { headers: { Authorization: authToken } });
        }
        onBudgetSet?.(); // Refresh budget data if the callback exists
        onClose();
      } catch (error) {
        console.error("Error saving budget:", error?.response?.data?.message || error.message);
        alert(error?.response?.data?.message || "Failed to save budget.");
      }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">&times;</button>
        <h2 className="text-2xl font-bold mb-4">{budgetData ? "Edit Budget" : "Add Budget"}</h2>

        <label className="block mb-2">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded-md">
          {["Overall Budget", "Food", "Transport", "Entertainment", "Education", "Housing", "Health"].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label className="block mt-4 mb-2">Budget Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter amount"
        />

        <button
          onClick={handleSave}
          className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-bold"
        >
          {budgetData ? "Update Budget" : "Add Budget"}
        </button>
      </div>
    </div>
  );
};

export default BudgetModal;