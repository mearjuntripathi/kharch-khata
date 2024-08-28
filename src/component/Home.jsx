import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/home.css';
import { BorrowPopup, GivePopup } from './Components';

export default function Home() {
    const [isBorrowPopupOpen, setIsBorrowPopupOpen] = useState(false);
    const [isGivePopupOpen, setIsGivePopupOpen] = useState(false);
    const navigate = useNavigate();

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const borrowedList = users.flatMap(user => 
        user.borrowed.filter(item => !item.complete)
    );

    const giveList = users.flatMap(user => 
        user.give.filter(item => !item.complete)
    );

    // Calculate total incomplete borrowed amount
    const totalBorrowed = borrowedList.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

    // Calculate total incomplete give amount
    const totalGive = giveList.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

    // Calculate total expenses
    const totalExpenses = JSON.parse(localStorage.getItem('expenses') || '[]')
        .reduce((total, expense) =>
            total + (expense.products || [])
                .reduce((sum, product) => sum + parseFloat(product.amount || 0), 0),
            0);

    return (
        <div className="home-container">
            <div className="home-box home-users-icon" onClick={() => navigate('/users')}>
                <p className="home-label">Users</p>
                <i className="uil uil-users-alt"></i>
            </div>
            <div className="home-box home-borrow" onClick={() => setIsBorrowPopupOpen(true)}>
                <p className="home-label">Borrowed</p>
                <span className="home-symbol">₹</span>{totalBorrowed.toFixed(2)}
            </div>
            <div className="home-box home-give" onClick={() => setIsGivePopupOpen(true)}>
                <p className="home-label">Give</p>
                <span className="home-symbol">₹</span>{totalGive.toFixed(2)}
            </div>
            <div className="home-box home-money-icon" onClick={() => navigate('/expenses')}>
                <p className="home-label">Expenses</p>
                <i className="uil uil-money-bill"></i>
                <span className="home-symbol">₹</span>{totalExpenses.toFixed(2)}
            </div>

            {/* Borrow Popup */}
            {isBorrowPopupOpen && (
                <BorrowPopup
                    onClose={() => setIsBorrowPopupOpen(false)}
                    borrowedList={borrowedList}
                />
            )}

            {/* Give Popup */}
            {isGivePopupOpen && (
                <GivePopup
                    onClose={() => setIsGivePopupOpen(false)}
                    giveList={giveList}
                />
            )}
        </div>
    );
}
