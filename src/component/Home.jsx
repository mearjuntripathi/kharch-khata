import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/home.css';
import { BorrowPopup, GivePopup } from './Components';

export default function Home() {
    const [isBorrowPopupOpen, setIsBorrowPopupOpen] = useState(false);
    const [isGivePopupOpen, setIsGivePopupOpen] = useState(false);
    const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);
    const navigate = useNavigate();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');

    const borrowedList = users.flatMap(user => 
        user.borrowed.filter(item => !item.complete)
    );

    const giveList = users.flatMap(user => 
        user.give.filter(item => !item.complete)
    );

    const totalBorrowed = borrowedList.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    const totalGive = giveList.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

    const totalExpenses = expenses
        .reduce((total, expense) =>
            total + (expense.products || [])
                .reduce((sum, product) => sum + parseFloat(product.amount || 0), 0),
            0);

    const exportData = () => {
        const data = {
            users,
            expenses
        };
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
        if (file) {
            reader.readAsText(file);
        }
        setIsUploadPopupOpen(false); // Close popup after uploading
    };

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
                <span>₹ {totalExpenses.toFixed(2)}</span>
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

            {/* Export and Import Buttons */}
            <div className="bottom-right-buttons">
                <button onClick={exportData}><i className="uil uil-import"></i></button>
                <button onClick={() => setIsUploadPopupOpen(true)}> <i className="uil uil-upload"></i> </button>
            </div>

            {/* Upload Popup */}
            {isUploadPopupOpen && (
                <div className="upload-popup">
                    <div className="upload-popup-content">
                        <span className="close-popup" onClick={() => setIsUploadPopupOpen(false)}>×</span>
                        <h2>Upload JSON File</h2>
                        <input 
                            type="file" 
                            accept=".json" 
                            onChange={handleFileUpload}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
