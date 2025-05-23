import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style/user.css";
import { AddBorrow, AddGive, UpdateBorrow, UpdateGive } from "./Components";
import BottomNav from "./BottomNav";

export default function User() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("borrow");
    const [showAddBorrowPopup, setShowAddBorrowPopup] = useState(false);
    const [showAddGivePopup, setShowAddGivePopup] = useState(false);
    const [showUpdateBorrowPopup, setShowUpdateBorrowPopup] = useState(false);
    const [showUpdateGivePopup, setShowUpdateGivePopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const foundUser = storedUsers.find((u) => u.id === userId);
        setUser(foundUser);
    }, [userId]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
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
                <div className="tab-slider">
                    <button
                        className={`tab-btn ${activeTab === "borrow" ? "active" : ""}`}
                        onClick={() => handleTabChange("borrow")}
                    >
                        Borrow
                    </button>
                    <button
                        className={`tab-btn ${activeTab === "give" ? "active" : ""}`}
                        onClick={() => handleTabChange("give")}
                    >
                        Give
                    </button>
                    <div className={`slider ${activeTab}`} />
                </div>
            </nav>

            <div className="list-container">
                {activeTab === "borrow" && (
                    <>
                        {user.borrowed.length === 0 && (
                            <p className="empty-msg">No borrow entries yet.</p>
                        )}
                        {user.borrowed.map((item) => (
                            <div
                                key={item.id}
                                className={`borrow ${item.complete ? "complete" : ""}`}
                                onClick={() => handleBorrowClick(item)}
                            >
                                <span className="money-name">{item.name}</span>
                                <div className="date">{item.date}</div>
                                <div className="cost">₹{item.amount}</div>
                            </div>
                        ))}
                    </>
                )}

                {activeTab === "give" && (
                    <>
                        {user.give.length === 0 && (
                            <p className="empty-msg">No give entries yet.</p>
                        )}
                        {user.give.map((item) => (
                            <div
                                key={item.id}
                                className={`give ${item.complete ? "complete" : ""}`}
                                onClick={() => handleGiveClick(item)}
                            >
                                <span className="money-name">{item.name}</span>
                                <div className="date">{item.date}</div>
                                <div className="cost">₹{item.amount}</div>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Floating action buttons */}
            <div className="fab-container">
                {activeTab === "borrow" && (
                    <button
                        className="fab-btn borrow-btn"
                        title="Add Borrow"
                        onClick={() => setShowAddBorrowPopup(true)}
                    >
                        +
                    </button>
                )}
                {activeTab === "give" && (
                    <button
                        className="fab-btn give-btn"
                        title="Add Give"
                        onClick={() => setShowAddGivePopup(true)}
                    >
                        +
                    </button>
                )}
            </div>

            {/* Popups */}
            {showAddBorrowPopup && (
                <AddBorrow onClose={() => setShowAddBorrowPopup(false)} userId={userId} />
            )}
            {showAddGivePopup && (
                <AddGive onClose={() => setShowAddGivePopup(false)} userId={userId} />
            )}
            {showUpdateBorrowPopup && (
                <UpdateBorrow
                    onClose={() => setShowUpdateBorrowPopup(false)}
                    item={selectedItem}
                    userId={userId}
                />
            )}
            {showUpdateGivePopup && (
                <UpdateGive
                    onClose={() => setShowUpdateGivePopup(false)}
                    item={selectedItem}
                    userId={userId}
                />
            )}

            <BottomNav />
        </div>
    );
}
