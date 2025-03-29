// // import React from 'react';
// // import { FaEdit, FaTrash } from 'react-icons/fa';

// // // const BudgetCard = ({ budget, onEdit, onDelete }) => {
// // //   const usagePercentage = ((budget.spent / budget.amount) * 100).toFixed(0);

// // // const BudgetCard = ({ budget, onEdit, onDelete }) => {
// // //     const usagePercentage = budget.amount > 0
// // //         ? ((budget.spent / budget.amount) * 100).toFixed(0)
// // //         : 0;

// // //     const progressBarColor = usagePercentage > 80 ? 'bg-red-500' : 'bg-purple-500';
// // // Function to determine the progress bar color based on usage percentage
// // const getProgressBarColor = (percentage) => {
// //     if (percentage < 50) return 'bg-green-500';
// //     if (percentage < 75) return 'bg-yellow-500';
// //     return 'bg-red-500';
// // };

// // const BudgetCard = ({ budget, onEdit, onDelete }) => {
// //     const usagePercentage = ((budget.spent / budget.amount) * 100).toFixed(0);
// //     const progressBarColor = getProgressBarColor(usagePercentage);
// //     return (
// //         <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
// //             <div className="flex justify-between items-center mb-4">
// //                 <h3 className="text-lg font-semibold">{budget.category}</h3>
// //                 <div className="flex gap-2">
// //                     <button onClick={() => onEdit(budget)} className="text-blue-500 hover:text-blue-700">
// //                         <FaEdit />
// //                     </button>
// //                     <button onClick={() => onDelete(budget.id)} className="text-red-500 hover:text-red-700">
// //                         <FaTrash />
// //                     </button>
// //                 </div>
// //             </div>
// //             <p><strong>Budget:</strong> ${budget.amount}</p>
// //             <p><strong>Spent:</strong> ${budget.spent}</p>
// //             <p><strong>Usage:</strong> {usagePercentage}%</p>
// //             <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
// //                 {/* <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${usagePercentage}%` }}></div> */}
// //                 <div className={`h-2.5 rounded-full ${progressBarColor}`} style={{ width: `${usagePercentage}%` }}></div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default BudgetCard;


// // BudgetCard.jsx
// import React from 'react';
// import { FaEdit, FaTrash } from 'react-icons/fa';

// const getProgressBarColor = (percentage) => {
//   if (percentage <= 50) return 'bg-green-500';
//   if (percentage <= 75) return 'bg-yellow-500';
//   return 'bg-red-500';
// };

// const BudgetCard = ({ budget, onEdit, onDelete }) => {
//   const usagePercentage = budget.amount > 0 ? ((budget.spent / budget.amount) * 100).toFixed(0) : 0;
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold">{budget.category}</h3>
//         <div className="flex gap-2">
//           <button onClick={() => onEdit(budget)} className="text-blue-500"><FaEdit /></button>
//           <button onClick={() => onDelete(budget.id)} className="text-red-500"><FaTrash /></button>
//         </div>
//       </div>
//       <p><strong>Budget:</strong> ${budget.amount}</p>
//       <p><strong>Spent:</strong> ${budget.spent}</p>
//       <p><strong>Usage:</strong> {usagePercentage}%</p>
//       <div className="w-full bg-gray-200 h-2 rounded-lg mt-2">
//         <div className={`h-2 rounded-lg ${getProgressBarColor(usagePercentage)}`} style={{ width: `${usagePercentage}%` }}></div>
//       </div>
//     </div>
//   );
// };

// export default BudgetCard;

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
