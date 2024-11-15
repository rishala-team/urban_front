import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [otp, setOtp] = useState('');
    const [isDoctor, setIsDoctor] = useState(false);

    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: '',
        height: '',
        weight: '',
        age: '',
    });

    useEffect(() => {
        // Check if the user is already authenticated
        const savedFirstName = localStorage.getItem('first_name');
        const authToken = localStorage.getItem('authToken');
        if (savedFirstName && authToken) {
            navigate('/'); // Redirect to home if already authenticated
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData({ ...userData, [name]: type === 'checkbox' ? checked : value });
        if (name === 'is_doctor') {
            setIsDoctor(checked); // Track if the user is a doctor
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (!isOtpSent) {
            const formBody = new URLSearchParams();
            formBody.append('first_name', userData.first_name);
            formBody.append('last_name', userData.last_name);
            formBody.append('email', userData.email);
            formBody.append('password', userData.password);
            formBody.append('re_password', userData.re_password);
            formBody.append('is_doctor', isDoctor);

            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/auth/register/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formBody,
                });

                if (response.ok) {
                    alert('OTP sent to your email for verification');
                    setIsOtpSent(true);
                } else {
                    const data = await response.json();
                    console.error('Registration failed:', data);
                    alert('Registration failed');
                }
            } catch (error) {
                console.error('Error during registration:', error);
            }
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/auth/activate-account/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userData.email, activation_code: otp }),
            });

            if (response.ok) {
                alert('Account activated! Please complete additional information.');
                setIsVerified(true);
            } else {
                const data = await response.json();
                console.error('OTP verification failed:', data);
                alert('OTP verification failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during OTP verification:', error);
        }
    };

    const handleCompleteRegistration = () => {
        // Save first name and authentication token to local storage
        localStorage.setItem('first_name', userData.first_name);
        localStorage.setItem('authToken', 'someAuthToken'); // Replace with real token if available
        alert(`Welcome, ${userData.first_name}`);

        // Redirect to home page
        navigate('/');
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={!isOtpSent ? handleRegisterSubmit : isVerified ? handleCompleteRegistration : handleOtpSubmit}>
                {!isOtpSent ? (
                    <>
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={userData.first_name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            value={userData.last_name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={userData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="password"
                            name="re_password"
                            placeholder="Confirm Password"
                            value={userData.re_password}
                            onChange={handleInputChange}
                            required
                        />
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                name="is_doctor"
                                checked={isDoctor}
                                onChange={handleInputChange}
                            />
                            Are you a doctor?
                        </label>
                        <button type="submit">Send OTP</button>
                    </>
                ) : isVerified ? (
                    <>
                        {!isDoctor && (
                            <>
                                <input
                                    type="text"
                                    name="height"
                                    placeholder="Height (cm)"
                                    value={userData.height}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="weight"
                                    placeholder="Weight (kg)"
                                    value={userData.weight}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Age"
                                    value={userData.age}
                                    onChange={handleInputChange}
                                    required
                                />
                            </>
                        )}
                        <button type="button" onClick={handleCompleteRegistration}>Complete Registration</button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            name="otp"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                        <button type="submit">Verify OTP</button>
                    </>
                )}
            </form>
        </div>
    );
};

export default Register;