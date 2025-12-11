import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/Logo.png';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem('loggedUser');
    setUser(null);
    navigate('/auth');
  };

  // Show loading state while determining authentication status
  if (user === undefined) {
    return (
      <div className="navbar">
        <img
          src={logo}
          alt="Logo"
          className="navbar-logo"
          onClick={() => navigate('/')}
        />
        <div className="navbar-buttons">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="navbar">
      <img
        src={logo}
        alt="Logo"
        className="navbar-logo"
        onClick={() => navigate('/')}
      />
      {!user ? (
        <div className="navbar-buttons">
          <button onClick={() => navigate('/auth')}>Login</button>
          <button onClick={() => navigate('/auth')}>Sign Up</button>
        </div>
      ) : (
        <div className="navbar-user">
          <span>Hi, {user.username}</span>
          <button onClick={() => navigate('/products')}>Products</button>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}