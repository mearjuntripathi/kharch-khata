import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './style/bottomnav.css';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <div className={`nav-item ${location.pathname === '/' ? 'active' : ''}`} onClick={() => navigate('/')}>
        <i className="uil uil-home"></i>
        <span>Home</span>
      </div>
      <div className={`nav-item ${location.pathname === '/users' ? 'active' : ''}`} onClick={() => navigate('/users')}>
        <i className="uil uil-users-alt"></i>
        <span>Users</span>
      </div>
      <div className={`nav-item ${location.pathname === '/expenses' ? 'active' : ''}`} onClick={() => navigate('/expenses')}>
        <i className="uil uil-money-bill"></i>
        <span>Expenses</span>
      </div>
    </div>
  );
}
