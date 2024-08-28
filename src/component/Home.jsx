import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/home.css';
import { BorrowPopup, GivePopup } from './Components';
export default function Home() {
    const [isBorrowPopupOpen, setIsBorrowPopupOpen] = useState(false);
    const [isGivePopupOpen, setIsGivePopupOpen] = useState(false);

    // Example data, replace with your actual data
    const borrowedList = [
        { name: 'Arjun', price: 100 },
        { name: 'Meera', price: 200 },
    ];

    const giveList = [
        { name: 'Vijay', price: 150 },
        { name: 'Rohit', price: 50 },
    ];

    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="home-box home-users-icon" onClick={() => navigate('/users')}>
                <p className="home-label">Users</p>
                <i className="uil uil-users-alt"></i>
            </div>
            <div className="home-box home-borrow" onClick={() => setIsBorrowPopupOpen(true)}>
                <p className="home-label">Borrowed</p>
                <span className="home-symbol">₹</span>10.10
            </div>
            <div className="home-box home-give" onClick={() => setIsGivePopupOpen(true)}>
                <p className="home-label">Give</p>
                <span className="home-symbol">₹</span>10.00
            </div>
            <div className="home-box home-money-icon" onClick={() => navigate('/expenses')}>
                <p className="home-label">Expenses</p>
                <i className="uil uil-money-bill"></i>
                <span >₹ {
                    JSON.parse(localStorage.getItem('expenses') || '[]')
                        .reduce((total, expense) =>
                            total + (expense.products || [])
                                .reduce((sum, product) => sum + parseFloat(product.amount || 0), 0),
                            0)
                }
                </span>
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
