import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/home.css';
import { BorrowPopup, GivePopup } from './Components';
import BottomNav from './BottomNav';

export default function Home() {
    const [isBorrowPopupOpen, setIsBorrowPopupOpen] = useState(false);
    const [isGivePopupOpen, setIsGivePopupOpen] = useState(false);
    const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);
    const navigate = useNavigate();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');

    const borrowedList = users.flatMap(user => user.borrowed?.filter(item => !item.complete) || []);
    const giveList = users.flatMap(user => user.give?.filter(item => !item.complete) || []);

    const totalBorrowed = borrowedList.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    const totalGive = giveList.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    const totalExpenses = expenses.reduce((total, expense) =>
        total + (expense.products || []).reduce((sum, product) => sum + parseFloat(product.amount || 0), 0), 0
    );

    const exportData = () => {
        const data = { users, expenses };
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target.result);
                if (jsonData.users && jsonData.expenses) {
                    localStorage.setItem('users', JSON.stringify(jsonData.users));
                    localStorage.setItem('expenses', JSON.stringify(jsonData.expenses));
                    window.location.reload();
                } else {
                    alert('Invalid JSON file structure.');
                }
            } catch (error) {
                alert('Error parsing JSON file.');
            }
        };
        if (file) reader.readAsText(file);
        setIsUploadPopupOpen(false);
    };

    return (
        <div className="home-container">
            <div className="header">
                <h2>Welcome Back 👋</h2>
                <p>Total Balance: ₹ {(totalBorrowed + totalGive + totalExpenses).toFixed(2)}</p>
            </div>

            <div className="card" onClick={() => navigate('/users')}>
                <i className="uil uil-users-alt"></i>
                <p>Users</p>
            </div>

            <div className="card" onClick={() => setIsBorrowPopupOpen(true)}>
                <i className="uil uil-arrow-down"></i>
                <p>Borrowed</p>
                <strong>₹ {totalBorrowed.toFixed(2)}</strong>
            </div>

            <div className="card" onClick={() => setIsGivePopupOpen(true)}>
                <i className="uil uil-arrow-up"></i>
                <p>Given</p>
                <strong>₹ {totalGive.toFixed(2)}</strong>
            </div>

            <div className="card" onClick={() => navigate('/expenses')}>
                <i className="uil uil-money-bill"></i>
                <p>Expenses</p>
                <strong>₹ {totalExpenses.toFixed(2)}</strong>
            </div>

            {/* Modals */}
            {isBorrowPopupOpen && (
                <BorrowPopup onClose={() => setIsBorrowPopupOpen(false)} borrowedList={borrowedList} />
            )}
            {isGivePopupOpen && (
                <GivePopup onClose={() => setIsGivePopupOpen(false)} giveList={giveList} />
            )}

            {/* Floating buttons */}
            <div className="fab-container">
                <button className="fab" title="Export Data" onClick={exportData}>
                    <i className="uil uil-import"></i>
                </button>
                <button className="fab" title="Upload JSON" onClick={() => setIsUploadPopupOpen(true)}>
                    <i className="uil uil-upload"></i>
                </button>
            </div>


            {/* Upload popup */}
            {isUploadPopupOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close" onClick={() => setIsUploadPopupOpen(false)}>×</button>
                        <h3>Upload JSON</h3>
                        <input type="file" accept=".json" onChange={handleFileUpload} />
                    </div>
                </div>
            )}

            <BottomNav />
        </div>
    );
}
