import React, { useState } from "react";
import "./style/user.css";
import { AddBorrow, AddGive, UpdateBorrow, UpdateGive } from "./Components";

export default function User() {
    const [showBorrowList, setShowBorrowList] = useState(true);
    const [showAddBorrowPopup, setShowAddBorrowPopup] = useState(false);
    const [showAddGivePopup, setShowAddGivePopup] = useState(false);
    const [showUpdateBorrowPopup, setShowUpdateBorrowPopup] = useState(false);
    const [showUpdateGivePopup, setShowUpdateGivePopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // To pass the selected item data to the popup

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

    return (
        <div className="user-container">
            <nav className="user-nav">
                <h1>User Name</h1>
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
                    <div
                        className="borrow"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleBorrowClick({ name: "name", date: "date", cost: "cost" })}
                    >
                        <span className="money-name">name</span>
                        <div className="date">date</div>
                        <div className="cost">₹ cost</div>
                    </div>
                    <div
                        className="borrow complete"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleBorrowClick({ name: "name", date: "date", cost: "cost" })}
                    >
                        <span className="money-name">name</span>
                        <div className="date">date</div>
                        <div className="cost">₹ cost</div>
                    </div>
                </div>
            ) : (
                <div className="give-list">
                    <div className="add" onClick={() => setShowAddGivePopup(true)}>
                        Add Give
                    </div>
                    <div
                        className="give"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleGiveClick({ name: "name", date: "date", cost: "cost" })}
                    >
                        <span className="money-name">name</span>
                        <div className="date">date</div>
                        <div className="cost">₹ cost</div>
                    </div>
                    <div
                        className="give complete"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleGiveClick({ name: "name", date: "date", cost: "cost" })}
                    >
                        <span className="money-name">name</span>
                        <div className="date">date</div>
                        <div className="cost">₹ cost</div>
                    </div>
                </div>
            )}

            {/* Add Borrow and Give popups */}
            {showAddBorrowPopup && (
                <AddBorrow onClose={() => setShowAddBorrowPopup(false)} />
            )}
            {showAddGivePopup && (
                <AddGive onClose={() => setShowAddGivePopup(false)} />
            )}

            {/* Update Borrow and Give popups */}
            {showUpdateBorrowPopup && (
                <UpdateBorrow
                    onClose={() => setShowUpdateBorrowPopup(false)}
                    item={selectedItem} // Pass the selected item data
                />
            )}
            {showUpdateGivePopup && (
                <UpdateGive
                    onClose={() => setShowUpdateGivePopup(false)}
                    item={selectedItem} // Pass the selected item data
                />
            )}
        </div>
    );
}