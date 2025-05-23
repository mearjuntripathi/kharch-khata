import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style/user.css";
import { AddBorrow, AddGive, UpdateBorrow, UpdateGive } from "./Components";
import BottomNav from "./BottomNav";

export default function User() {
    const { userId } = useParams(); // Get the userId from the URL
    const [user, setUser] = useState(null);
    const [showBorrowList, setShowBorrowList] = useState(true);
    const [showAddBorrowPopup, setShowAddBorrowPopup] = useState(false);
    const [showAddGivePopup, setShowAddGivePopup] = useState(false);
    const [showUpdateBorrowPopup, setShowUpdateBorrowPopup] = useState(false);
    const [showUpdateGivePopup, setShowUpdateGivePopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Load user data from localStorage
    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const foundUser = storedUsers.find((u) => u.id === userId);
        setUser(foundUser);
    }, [userId]);

    const handleToggle = (listType) => {
        setShowBorrowList(listType === "borrow");
    };

    const handleBorrowClick = (item) => {
        setSelectedItem(item);
        setShowUpdateBorrowPopup(true);
    };

    const handleGiveClick = (item) => {
        setSelectedItem(item);
        setShowUpdateGivePopup(true);
    };

    if (!user) return <div>User not found</div>;

    return (
        <div className="user-container">
            <nav className="user-nav">
                <h1>{user.user}</h1>
                <div className="gap-div">
                    <button onClick={() => handleToggle("borrow")}>Borrow</button>
                    <button onClick={() => handleToggle("give")}>Give</button>
                </div>
            </nav>

            {showBorrowList ? (
                <div className="borrow-list">
                    <div className="add" onClick={() => setShowAddBorrowPopup(true)}>
                        Add Borrow
                    </div>
                    {user.borrowed.map((item) => (
                        <div
                            key={item.id}
                            className={`borrow ${item.complete ? 'complete' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleBorrowClick(item)}
                        >
                            <span className="money-name">{item.name}</span>
                            <div className="date">{item.date}</div>
                            <div className="cost">₹{item.amount}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="give-list">
                    <div className="add" onClick={() => setShowAddGivePopup(true)}>
                        Add Give
                    </div>
                    {user.give.map((item) => (
                        <div
                            key={item.id}
                            className={`give ${item.complete ? 'complete' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleGiveClick(item)}
                        >
                            <span className="money-name">{item.name}</span>
                            <div className="date">{item.date}</div>
                            <div className="cost">₹{item.amount}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Borrow and Give popups */}
            {showAddBorrowPopup && (
                <AddBorrow
                    onClose={() => setShowAddBorrowPopup(false)}
                    userId={userId}
                />
            )}
            {showAddGivePopup && (
                <AddGive
                    onClose={() => setShowAddGivePopup(false)}
                    userId={userId}
                />
            )}


            {/* Update Borrow and Give popups */}
            {showUpdateBorrowPopup && (
                <UpdateBorrow
                    onClose={() => setShowUpdateBorrowPopup(false)}
                    item={selectedItem} // Pass the selected item data
                    userId={userId} // Pass the user ID
                />
            )}
            {showUpdateGivePopup && (
                <UpdateGive
                    onClose={() => setShowUpdateGivePopup(false)}
                    item={selectedItem} // Pass the selected item data
                    userId={userId} // Pass the user ID
                />
            )}

            <BottomNav />
        </div>
    );
}