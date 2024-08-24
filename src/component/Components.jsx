import React, { useState, useEffect } from 'react';
import './style/components.css';

function AddExpensePopup({ onClose, onAddExpense }) {
    const [expenseName, setExpenseName] = useState('');
    const [products, setProducts] = useState([{ name: '', price: '' }]);
    const [contributors, setContributors] = useState([{ name: '', price: '' }]);

    const handleAddProduct = () => {
        setProducts([...products, { name: '', price: '' }]);
    };

    const handleProductChange = (index, field, value) => {
        const newProducts = [...products];
        newProducts[index][field] = value;
        setProducts(newProducts);
    };

    const handleDeleteProduct = (index) => {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
    };

    const handleAddContributor = () => {
        setContributors([...contributors, { name: '', price: '' }]);
    };

    const handleContributorChange = (index, field, value) => {
        const newContributors = [...contributors];
        newContributors[index][field] = value;
        setContributors(newContributors);
    };

    const handleDeleteContributor = (index) => {
        const newContributors = contributors.filter((_, i) => i !== index);
        setContributors(newContributors);
    };

    const handleAddExpense = () => {
        const validProducts = products.filter(product => product.name.trim() !== '' && product.price.trim() !== '');
        if (expenseName.trim() === '' || validProducts.length === 0) {
            alert('Please add at least one product with a name and price.');
            return;
        }

        const newExpense = {
            id: `e${Date.now()}`,  // Generate a unique ID using the current timestamp
            expense: expenseName,
            date: new Date().toLocaleDateString(),  // Use the current date
            products: validProducts.map((product, index) => ({
                id: `p${index + 1}`,
                name: product.name,
                amount: parseFloat(product.price),
            })),
            contributors: contributors.map((contributor, index) => ({
                id: `c${index + 1}`,
                name: contributor.name,
                amount: parseFloat(contributor.price),
            }))
        };

        // Get the current expenses from localStorage
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

        // Add the new expense to the list
        const updatedExpenses = [...storedExpenses, newExpense];

        // Save the updated list back to localStorage
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

        onAddExpense({ expenseName, products: validProducts, contributors });


        // Close the popup
        onClose();
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <h2 className="popup-title">Add New Expense</h2>
                <label className="popup-label">
                    Expense Name:
                    <input
                        type="text"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                        className="popup-input"
                    />
                </label>

                <h3 className="popup-subtitle">Products</h3>
                <div className="popup-scrollable">
                    {products.map((product, index) => (
                        <div key={index} className="product-input">
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={product.name}
                                onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                                className="popup-input"
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={product.price}
                                onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                                className="popup-input"
                            />
                            <button onClick={() => handleDeleteProduct(index)} className="popup-delete-button">Delete</button>
                        </div>
                    ))}
                    <button onClick={handleAddProduct} className="popup-add-button">+ Add Product</button>

                    <h3 className="popup-subtitle">Contributors</h3>
                    {contributors.map((contributor, index) => (
                        <div key={index} className="contributor-input">
                            <input
                                type="text"
                                placeholder="Contributor Name"
                                value={contributor.name}
                                onChange={(e) => handleContributorChange(index, 'name', e.target.value)}
                                className="popup-input"
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                value={contributor.price}
                                onChange={(e) => handleContributorChange(index, 'price', e.target.value)}
                                className="popup-input"
                            />
                            <button onClick={() => handleDeleteContributor(index)} className="popup-delete-button">Delete</button>
                        </div>
                    ))}
                    <button onClick={handleAddContributor} className="popup-add-button">+ Add Contributor</button>
                </div>

                <div className="popup-footer">
                    <button className="popup-add-expense-button" onClick={handleAddExpense}>
                        Add Expense
                    </button>
                    <button className="popup-close-button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}


export default function EditExpensePopup({ expense, onClose, onUpdate }) {
    const [expenseData, setExpenseData] = useState(expense);

    useEffect(() => {
        setExpenseData(expense);
    }, [expense]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleProductChange = (e, id) => {
        const { name, value } = e.target;
        setExpenseData(prevData => ({
            ...prevData,
            products: prevData.products.map(product =>
                product.id === id ? { ...product, [name]: value } : product
            )
        }));
    };

    const handleContributorChange = (e, id) => {
        const { name, value } = e.target;
        setExpenseData(prevData => ({
            ...prevData,
            contributors: prevData.contributors.map(contributor =>
                contributor.id === id ? { ...contributor, [name]: value } : contributor
            )
        }));
    };

    const handleUpdate = () => {
        onUpdate(expenseData);
    };

    const handleAddProduct = () => {
        setExpenseData(prevData => ({
            ...prevData,
            products: [...prevData.products, { id: Date.now(), name: '', amount: '' }]
        }));
    };

    const handleAddContributor = () => {
        setExpenseData(prevData => ({
            ...prevData,
            contributors: [...prevData.contributors, { id: Date.now(), name: '', amount: '' }]
        }));
    };

    const handleRemoveProduct = (id) => {
        setExpenseData(prevData => ({
            ...prevData,
            products: prevData.products.filter(product => product.id !== id)
        }));
    };

    const handleRemoveContributor = (id) => {
        setExpenseData(prevData => ({
            ...prevData,
            contributors: prevData.contributors.filter(contributor => contributor.id !== id)
        }));
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <h2 className="popup-title">Edit Expense</h2>
                <label className="popup-label">
                    Expense Name:
                    <input
                        type="text"
                        name="expense"
                        placeholder='Expenses Name'
                        value={expenseData.expense}
                        onChange={handleChange}
                        className="popup-input"
                    />
                </label>

                <h3 className="popup-subtitle">Products</h3>
                <div className="popup-scrollable">
                    {expenseData.products.map(product => (
                        <div key={product.id} className="product-input">
                            <input
                                type="text"
                                name="name"
                                value={product.name}
                                placeholder='Product Name'
                                onChange={(e) => handleProductChange(e, product.id)}
                                className="popup-input"
                            />
                            <input
                                type="number"
                                name="amount"
                                value={product.amount}
                                placeholder='Price'
                                onChange={(e) => handleProductChange(e, product.id)}
                                className="popup-input"

                            />
                            <button className="popup-delete-button" onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                        </div>
                    ))}
                    <button onClick={handleAddProduct} className="popup-add-button">Add Product</button>

                    <h3 className="popup-subtitle">Contributors</h3>
                    {expenseData.contributors.map(contributor => (
                        <div key={contributor.id} className="contributor-input">
                            <input
                                type="text"
                                name="name"
                                placeholder="Contributor Name"
                                value={contributor.name}
                                onChange={(e) => handleContributorChange(e, contributor.id)}
                                className="popup-input"

                            />
                            <input
                                type="number"
                                name="amount"
                                placeholder="Amount"

                                value={contributor.amount}
                                onChange={(e) => handleContributorChange(e, contributor.id)}
                                className="popup-input"

                            />
                            <button className="popup-delete-button" onClick={() => handleRemoveContributor(contributor.id)}>Remove</button>
                        </div>
                    ))}
                    <button className="popup-add-button" onClick={handleAddContributor}>Add Contributor</button>
                </div>
                <div className="popup-footer">
                    <button className="popup-add-expense-button" onClick={handleUpdate}>Update Expense</button>
                    <button className="popup-close-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}


function AddUserPopup({ onClose, onAddUser }) {
    const [userName, setUserName] = useState('');

    const handleAddUser = () => {
        if (userName.trim() === '') {
            alert('Please enter a user name.');
            return;
        }

        onAddUser({ name: userName });
        onClose();
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <h2 className="popup-title">Add New Friend</h2>
                <label className="popup-label">
                    Friend's Name:
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="popup-input"
                    />
                </label>

                <div className="popup-footer">
                    <button className="popup-add-user-button" onClick={handleAddUser}>
                        Add Friend
                    </button>
                    <button className="popup-close-button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

function BorrowPopup({ onClose, borrowedList }) {
    return (
        <div className="popup-container">
            <button className="popup-close" onClick={onClose}>
                Close
            </button>
            <div className="popup-content">
                <h2 className="popup-title">You Borrowed From</h2>
                <div className="borrowed-lists">
                    {borrowedList.map((item, index) => (
                        <div key={index} className="borrowed">
                            <span className="borrowed-name">{item.name}</span>
                            <span className="borrowed-price">₹{item.price.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function GivePopup({ onClose, giveList }) {
    return (
        <div className="popup-container">
            <div className="popup-content">
                <button className="popup-close" onClick={onClose}>
                    Close
                </button>
                <h2 className="popup-title">You Gave To</h2>
                <div className="give-lists">
                    {giveList.map((item, index) => (
                        <div key={index} className="give">
                            <span className="give-name">{item.name}</span>
                            <span className="give-price">₹{item.price.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { AddExpensePopup, EditExpensePopup, AddUserPopup, BorrowPopup, GivePopup }