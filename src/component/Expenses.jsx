import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/expenses.css';
import { AddExpensePopup } from './Components';

export default function Expenses() {
    const [showPopup, setShowPopup] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Load expenses from local storage when the component mounts
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
        const expenseId = `e${Date.now()}`;  // Unique ID for the expense

        const updatedExpenses = [...expenses, { id: expenseId, name: newExpense.expenseName, date, cost: totalCost }];
        setExpenses(updatedExpenses);

        // Save the new list of expenses to local storage
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        storedExpenses.push({
            id: expenseId,
            expense: newExpense.expenseName,
            date,
            products: newExpense.products.map((product, index) => ({
                id: `p${index + 1}`,
                name: product.name,
                amount: parseFloat(product.price),
            })),
            contributors: newExpense.contributors.map((contributor, index) => ({
                id: `c${index + 1}`,
                name: contributor.name,
                amount: parseFloat(contributor.price),
            }))
        });
        localStorage.setItem('expenses', JSON.stringify(storedExpenses));
    };

    const handleExpenseClick = (expenseId) => {
        navigate(`/expense/${expenseId}`);
    };

    return (
        <div className="expenses-container">
            <nav className="expenses-nav">
                <h1>Your Expenses</h1>
                <button onClick={() => setShowPopup(true)}>+ Add Expenses</button>
            </nav>
            <div className="expenses-list">
                {expenses.map((expense, index) => (
                    <div
                        key={index}
                        className="expense"
                        onClick={() => handleExpenseClick(expense.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="user-name">{expense.name}</span>
                        <div className="date">{expense.date}</div>
                        <div className="cost">₹{expense.cost.toFixed(2)}</div>
                    </div>
                ))}
            </div>
            {showPopup && (
                <AddExpensePopup
                    onClose={() => setShowPopup(false)}
                    onAddExpense={handleAddExpense}
                />
            )}
        </div>
    );
}
