// src/components/Header.js
import React from 'react';
import './Header.css';
// Then use it in the JSX

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="text-section">
                    <h1>Welcome to Health Tracker</h1>
                    <p>
                        Our Health Tracker app is designed to bridge the gap between patients and doctors. With this app, patients can receive personalized advice and treatment plans directly from medical professionals. It also features an X-ray scanning tool powered by AI with 99% accuracy, a step counter, a nutrition calculator, and a virtual assistant. Whether you’re a patient seeking better health insights or a doctor aiming to provide top-notch care remotely, Health Tracker is here for you.
                    </p>
                </div>
                <div className="image-section">
                    <img src="/images/img1.svg" alt="Health Tracker" />

                </div>
            </div>
        </header>
    );
};

export default Header;