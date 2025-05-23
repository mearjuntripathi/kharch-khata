import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/users.css';
import { AddUserPopup } from './Components';
import BottomNav from './BottomNav';

export default function Users() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // Load users from localStorage
    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            try {
                setUsers(JSON.parse(storedUsers));
            } catch (err) {
                console.error('Failed to parse users from localStorage:', err);
                setUsers([]);
            }
        } else {
            localStorage.setItem('users', JSON.stringify([]));
        }
    }, []);

    // Add new user
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
        navigate(`/user/${userId}`);
    };

    // Calculate amounts
    const calculateIncompleteAmounts = (user) => {
        const incompleteBorrowed = (user.borrowed || [])
            .filter(item => !item.complete)
            .reduce((sum, item) => sum + (item.amount || 0), 0);

        const incompleteGive = (user.give || [])
            .filter(item => !item.complete)
            .reduce((sum, item) => sum + (item.amount || 0), 0);

        return { incompleteBorrowed, incompleteGive };
    };

    return (
        <div className="users-container">
            <nav className="users-header">
                <h1>👥 Friends List</h1>
            </nav>

            <div className="users-list">
                {users.map((user) => {
                    const { incompleteBorrowed, incompleteGive } = calculateIncompleteAmounts(user);

                    // Handle initials safely
                    const initials = (user.user || '??')
                        .split(' ')
                        .map(n => n?.[0]?.toUpperCase() || '')
                        .join('')
                        .slice(0, 2) || '??';

                    return (
                        <div
                            key={user.id}
                            className="user-card"
                            onClick={() => handleUserClick(user.id)}
                        >
                            <div className="user-avatar">{initials}</div>
                            <div className="user-info">
                                <div className="user-name">{user.user || 'Unnamed'}</div>
                                <div className="user-balance">
                                    <div className="balance-item borrowed">
                                        ₹{incompleteGive.toFixed(2)}
                                    </div>
                                    <div className="balance-item given">
                                        ₹{incompleteBorrowed.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Popup */}
            {isPopupOpen && (
                <AddUserPopup
                    onClose={() => setIsPopupOpen(false)}
                    onAddUser={handleAddUser}
                />
            )}

            {/* Floating Add Button */}
            <button className="fab-add-user" onClick={() => setIsPopupOpen(true)}>＋</button>

            <BottomNav />
        </div>
    );
}
