import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';

const Login = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const formBody = new URLSearchParams(loginData).toString();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/auth/token/create/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formBody,
            });

            if (response.ok) {
                const data = await response.json();
                // Assuming `data.token` and `data.first_name` are part of the response
                localStorage.setItem('XAHeBSni8cP8b0YL5R1rNYZ3OhADSUno6OtskKC06bp93OC2b9gELKKg0w6nEPdi', data.token);
                localStorage.setItem('first_name', data.first_name || 'User'); // Use actual first name if available
                alert(`Login successful! Welcome, ${data.first_name || 'User'}`);

                navigate('/'); // Redirect to home after login
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="modal-background">
            <div className="modal">
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <input type="email" name="email" placeholder="Email" required onChange={handleInputChange} />
                    <input type="password" name="password" placeholder="Password" required onChange={handleInputChange} />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;