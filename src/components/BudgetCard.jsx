// BudgetCard.jsx
import React from 'react';
import { FaEdit } from 'react-icons/fa';

const getProgressBarColor = (percentage) => {
    if (percentage <= 75) return 'bg-purple-500';
    return 'bg-red-500';
};

const BudgetCard = ({ budget, onEdit }) => {
    //   const usagePercentage = budget.budgetAmount > 0 ? ((budget.spentAmount / budget.budgetAmount) * 100).toFixed(0) : 0;
    const usagePercentage = budget.budgetAmount > 0 ? ((budget.spentAmount / budget.budgetAmount) * 100).toFixed(0) : 0;
    const isOverBudget = budget.spentAmount > budget.budgetAmount;
    const remainingAmount = budget.budgetAmount - budget.spentAmount;
    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 relative">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{budget.icon}</span>
                    <h3 className="text-lg font-semibold">{budget.category}</h3>
                </div>
                <button onClick={() => onEdit(budget)} className="text-gray-500"><FaEdit /></button>
            </div>

            <p><strong>Budget:</strong> ${budget.budgetAmount}</p>
            <p><strong>Spent:</strong> ${budget.spentAmount}</p>
            <p><strong>Usage:</strong> {usagePercentage}%</p>

            <div className="w-full bg-gray-200 h-2 rounded-lg mt-2">
                <div className={`h-2 rounded-lg ${getProgressBarColor(usagePercentage)}`} style={{ width: `${usagePercentage}%` }}></div>
            </div>

            {isOverBudget ? (
                <p className="text-red-500 mt-2">Over budget by ${Math.abs(remainingAmount)}</p>
            ) : (
                <p className="text-gray-500 mt-2">${remainingAmount} remaining</p>
            )}
        </div>
    );
};

export default BudgetCard;
