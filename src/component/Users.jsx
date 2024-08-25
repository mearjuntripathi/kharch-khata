import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate
import './style/users.css';
import { AddUserPopup } from './Components';

export default function Users() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); // Updated to useNavigate

    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        } else {
            localStorage.setItem('users', JSON.stringify([]));
        }
    }, []);

    const handleAddUser = (user) => {
        const newUser = { 
            id: `u${users.length + 1}`, 
            user: user.name, 
            borrowed: [], 
            give: [] 
        };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    const handleUserClick = (userId) => {
        navigate(`/user/${userId}`); // Updated to use navigate
    };

    return (
        <div className="container">
            <nav className="users-nav">
                <h1>Your Friends</h1>
                <button onClick={() => setIsPopupOpen(true)}>+ Add Friend</button>
            </nav>
            <div className="users-list">
                {users.map((user, index) => (
                    <div 
                        key={index} 
                        className="user" 
                        onClick={() => handleUserClick(user.id)} // Navigate on click
                    >
                        <span className="user-name">{user.user}</span>
                        <div className="borrow-money">₹{user.borrowed.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}</div>
                        <div className="give-money">₹{user.give.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}</div>
                    </div>
                ))}
            </div>
            {isPopupOpen && (
                <AddUserPopup onClose={() => setIsPopupOpen(false)} onAddUser={handleAddUser} />
            )}
        </div>
    );
}