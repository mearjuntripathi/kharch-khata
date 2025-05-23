import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/expenses.css';
import { AddExpensePopup } from './Components';
import BottomNav from './BottomNav';

export default function Expenses() {
    const [showPopup, setShowPopup] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const formattedExpenses = storedExpenses.map(expense => {
            const totalCost = expense.products.reduce((total, product) => total + parseFloat(product.amount || 0), 0);
            return { id: expense.id, name: expense.expense, date: expense.date, cost: totalCost };
        });
        setExpenses(formattedExpenses);
    }, []);

    const handleAddExpense = (newExpense) => {
        const totalCost = newExpense.products.reduce((total, product) => total + parseFloat(product.price || 0), 0);
        const date = new Date().toLocaleDateString();
        const expenseId = `e${Date.now()}`;
        const updatedExpenses = [...expenses, { id: expenseId, name: newExpense.expenseName, date, cost: totalCost }];
        setExpenses(updatedExpenses);
    };

    const handleExpenseClick = (expenseId) => {
        navigate(`/expense/${expenseId}`);
    };

    return (
        <div className="expenses-container">
            <nav className="expenses-header">
                <h1>💸 Expense Tracker</h1>
            </nav>

            <div className="expenses-list">
                {expenses.map((expense) => (
                    <div
                        key={expense.id}
                        className="expense-card"
                        onClick={() => handleExpenseClick(expense.id)}
                    >
                        <div className="expense-title">{expense.name}</div>
                        <div className="expense-meta">
                            <span className="expense-date">{expense.date}</span>
                            <span className="expense-cost">₹{expense.cost.toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>

            {showPopup && (
                <AddExpensePopup
                    onClose={() => setShowPopup(false)}
                    onAddExpense={handleAddExpense}
                />
            )}

            <button className="fab-add-expense" onClick={() => setShowPopup(true)}>＋</button>


            <BottomNav />
        </div>
    );
}
