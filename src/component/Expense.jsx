import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style/expense.css';
import { EditExpensePopup } from './Components';
import BottomNav from './BottomNav';

export default function Expense() {
    const { expenseId } = useParams();
    const [expense, setExpense] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const foundExpense = storedExpenses.find(exp => exp.id === expenseId);

        if (foundExpense) {
            setExpense(foundExpense);
        } else {
            navigate(-1);
        }
    }, [expenseId, navigate]);

    const handleDelete = () => {
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const updatedExpenses = storedExpenses.filter(exp => exp.id !== expenseId);
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
        navigate('/expenses');
    };

    const handleEdit = () => setShowEditPopup(true);

    const handleUpdate = (updatedExpense) => {
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const updatedExpenses = storedExpenses.map(exp =>
            exp.id === expenseId ? { ...exp, ...updatedExpense } : exp
        );
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
        setExpense(updatedExpense);
        setShowEditPopup(false);
    };

    const handlePrint = () => window.print();

    if (!expense) return <div>Loading...</div>;

    const totalProductCost = expense.products.reduce((total, p) => total + parseFloat(p.amount || 0), 0);
    const totalContributorAmount = expense.contributors.reduce((total, c) => total + parseFloat(c.amount || 0), 0);

    return (
        <div className="expense-container">
            {/* Top Action Buttons */}
            <div className="top-bar no-print">
                <button className="action-btn delete" onClick={handleDelete}>
                    <i className="uil uil-trash-alt"></i>
                </button>
                <button className="action-btn print" onClick={handlePrint}>
                    <i className="uil uil-print"></i>
                </button>
            </div>

            {/* Expense Title */}
            <h1 className="expense-title">{expense.expense}</h1>

            {/* Product Table */}
            <div className="product-bill">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Amount (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expense.products.length > 0 ? (
                            expense.products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{parseFloat(product.amount || 0).toFixed(2)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">No products found.</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td><strong>₹{totalProductCost.toFixed(2)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Print Summary */}
            <div className="print-summary">
                <p>Date: <strong>{expense.date}</strong></p>
                <p>Total: <strong>₹{totalProductCost.toFixed(2)}</strong></p>
            </div>

            {/* Bottom Edit Button */}
            <div className="edit-section no-print">
                <button className="action-btn edit" onClick={handleEdit}>
                    <i className="uil uil-edit-alt"></i>
                    <span>Edit</span>
                </button>
            </div>

            {showEditPopup && (
                <EditExpensePopup
                    expense={expense}
                    onClose={() => setShowEditPopup(false)}
                    onUpdate={handleUpdate}
                />
            )}

            <BottomNav />
        </div>
    );

}
