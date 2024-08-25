import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './component/Home';
import Users from './component/Users';
import User from './component/User'
import Expenses from './component/Expenses';
import Expense from './component/Expense'; // Updated import
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Function to initialize local storage
const initializeLocalStorage = () => {
  const usersData = localStorage.getItem('usersData');
  const expensesData = localStorage.getItem('expensesData');

  if (!usersData) {
    localStorage.setItem('usersData', JSON.stringify([]));
  }
  if (!expensesData) {
    localStorage.setItem('expensesData', JSON.stringify([]));
  }
};

// Component to handle initialization and redirect
const AppWrapper = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usersData = localStorage.getItem('users');
    const expensesData = localStorage.getItem('expenses');

    if (usersData && expensesData) {
      setIsInitialized(true);
    } else {
      initializeLocalStorage();
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      navigate('/'); // Navigate to the Home route after initialization
    }
  }, [isInitialized, navigate]);

  return isInitialized ? <Home /> : null; // Render Home component once initialized
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppWrapper />} />
        <Route path="/users" element={<Users />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/expense/:expenseId" element={<Expense/>} /> {/* Corrected path */}
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();