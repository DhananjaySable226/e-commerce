import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Auth from './components/Auth';
import Products from './components/Products';
import ProductView from './pages/ProductView';
import './App.css';

export default function App() {
  const [user, setUser] = useState<any | undefined>(undefined);

  useEffect(() => {
    const item = localStorage.getItem('loggedUser');
    const saved = item ? JSON.parse(item) : null;
    if (saved) setUser(saved);
    // If no user is found, explicitly set to null
    else setUser(null);
  }, []);

  return (
    <Router>
      <div>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth setUser={setUser} />} />
          <Route path="/products" element={<Products user={user} />} />
          <Route path="/product/:id" element={<ProductView user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}