import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Auth({ setUser }) {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
    const navigate = useNavigate();

    const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

    const signup = () => {
        if (!form.username || !form.email || !form.password) {
            alert('All fields required'); return;
        }
        if (form.password !== form.confirm) {
            alert('Passwords do not match'); return;
        }
        localStorage.setItem('signupUser', JSON.stringify(form));
        alert('Signup successful');
        setIsLogin(true);
    }

    const login = () => {
        const saved = JSON.parse(localStorage.getItem('signupUser'));
        if (!saved) return alert('No user exists');

        if (saved.username === form.username && saved.password === form.password) {
            localStorage.setItem('loggedUser', JSON.stringify(saved));
            setUser(saved);
            navigate('/products');
        } else alert('Invalid Credentials');
    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-heading">{isLogin ? 'Login' : 'Sign Up'}</h2>

                {!isLogin && (
                    <input
                        name="email"
                        placeholder="Email"
                        onChange={handle}
                        className="auth-input"
                    />
                )}

                <input
                    name="username"
                    placeholder="Username"
                    onChange={handle}
                    className="auth-input"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handle}
                    className="auth-input"
                />

                {!isLogin && (
                    <input
                        name="confirm"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={handle}
                        className="auth-input"
                    />
                )}

                <button className="auth-button" onClick={isLogin ? login : signup}>
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>

                <p className="auth-toggle" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
}