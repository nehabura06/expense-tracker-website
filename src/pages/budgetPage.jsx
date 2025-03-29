// BudgetPage.jsx
import React, { useState, useEffect } from 'react';
import BudgetCard from '../components/BudgetCard';
import BudgetModal from '../components/budgetModal';
import BudgetService from '../services/BudgetService';

const BudgetPage = () => {
    const [budgets, setBudgets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [loading, setLoading] = useState(true);
    const [overallBudget, setOverallBudget] = useState(null);

    const fetchBudgets = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found. Please log in.');
                return;
            }
            const data = await BudgetService.getCategoryBudgets(`Bearer ${token}`);

            const overall = data.find(budget => budget.category === 'Overall Budget');
            setOverallBudget(overall);

            const filteredData = data.filter(budget => budget.category !== 'Overall Budget');
            setBudgets(filteredData);
            // setBudgets(updatedData);
        } catch (error) {
            console.error('Error fetching budgets:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const handleEdit = (budget) => {
        setSelectedBudget(budget);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedBudget(null);
        fetchBudgets(); // Refresh budgets on close
    };

    return (
        <div className="p-8">
            <div className="flex justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Budgets</h1>
                    <p className="text-gray-600">Set and manage your monthly spending limits</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-purple-500 text-white px-4 py-2 rounded">+ Add Budget</button>
            </div>

            {/* Overall Budget Section */}
            {overallBudget && (
                <div className="p-6 bg-white rounded-lg shadow mb-8">
                    <h2 className="text-xl font-semibold">Total Budget</h2>
                    <p className="text-3xl font-bold">${overallBudget.budgetAmount}</p>
                </div>
            )}

            {/* Budgets Section */}
            {loading ? (
                <p>Loading budgets...</p>
            ) : (
                <div className="grid grid-cols-3 gap-6">
                    {budgets.length > 0 ? (
                        budgets.map((budget) => (
                            <BudgetCard key={budget._id} budget={budget} onEdit={handleEdit} />
                        ))
                    ) : (
                        <p className="text-gray-500">No budgets available. Please add a budget.</p>
                    )}
                </div>
            )}

            {isModalOpen && (
                <BudgetModal isOpen={isModalOpen} onClose={handleModalClose} budgetData={selectedBudget} />
            )}
        </div>
    );
};

export default BudgetPage;
