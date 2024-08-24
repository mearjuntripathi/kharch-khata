import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style/expense.css';

export default function Expense() {
    const { expenseId } = useParams();
    const [expense, setExpense] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the expense data from local storage based on expenseId
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const foundExpense = storedExpenses.find(exp => exp.id === expenseId);

        if (foundExpense) {
            setExpense(foundExpense);
        } else {
            // Redirect back if the expenseId does not exist
            navigate('/expenses');
        }
    }, [expenseId, navigate]);

    const handleDelete = () => {
        // Delete the expense from local storage
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const updatedExpenses = storedExpenses.filter(exp => exp.id !== expenseId);
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

        // Navigate back to the Expenses page
        navigate('/expenses');
    };

    const handleEdit = () => {
        // Navigate to the edit page or open an edit popup
        alert('Edit functionality is not implemented yet.');
    };

    const handlePrint = () => {
        window.print();
    };

    if (!expense) {
        return <div>Loading...</div>; // Handle the loading state
    }

    // Calculate totals safely
    const totalProductCost = expense.products.reduce((total, product) => {
        const amount = parseFloat(product.amount) || 0;
        return total + amount;
    }, 0);

    const totalContributorAmount = expense.contributors.reduce((total, contributor) => {
        const amount = parseFloat(contributor.amount) || 0;
        return total + amount;
    }, 0);

    return (
        <div className="expense-container">
            <nav className="expenses-nav">
                <h1>{expense.expense}</h1>
                <div className="options">
                    <button style={{ backgroundColor: 'rgb(0, 206, 0)' }} onClick={handleEdit}>
                        <i className="uil uil-edit"></i>
                    </button>
                    <button onClick={handleDelete}>
                        <i className="uil uil-trash"></i>
                    </button>
                    <button style={{ backgroundColor: 'rgb(72, 72, 246)' }} onClick={handlePrint}>
                        <i className="uil uil-clipboard"></i>
                    </button>
                </div>
            </nav>
            <div className="expense-list">
                <div className="product-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expense.products.length > 0 ? (
                                expense.products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>₹{(parseFloat(product.amount) || 0).toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No products available</td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Total</td>
                                <td>₹{totalProductCost.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                {expense.contributors.length > 0 && (
                    <div className="contributor-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Contributor Name</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expense.contributors.map(contributor => (
                                    <tr key={contributor.id}>
                                        <td>{contributor.name}</td>
                                        <td>₹{(parseFloat(contributor.amount) || 0).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Total</td>
                                    <td>₹{totalContributorAmount.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}