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
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  };

  const capitalize = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const greeting = getGreeting();
  const firstName = user?.username ? capitalize(user.username) : "";


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
          <button className="loign-sign" onClick={() => navigate('/login')}>Login</button>
          <button className="loign-sign" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      ) : (
        <div className="navbar-user">
          <span className='greeting'>Hii {greeting}, {firstName}</span>
          <button className="loign-sign" onClick={() => navigate('/products')}>Products</button>
          <button className="loign-sign" onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}