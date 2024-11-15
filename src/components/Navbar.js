// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(localStorage.getItem('first_name'));
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('first_name');
        setAuthToken(null);
        setFirstName('');
        navigate('/login');
    };

    useEffect(() => {
        setAuthToken(localStorage.getItem('authToken'));
        setFirstName(localStorage.getItem('first_name'));
    }, []);

    return (
        <nav className="navbar">
            <h1 onClick={() => navigate('/')}>Health Tracker</h1>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                {authToken ? (
                    <>
                        <span>Welcome, {firstName}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;