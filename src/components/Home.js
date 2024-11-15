import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import React from 'react';
import ZoomMeeting from './ZoomMeeting';

const Home = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('XAHeBSni8cP8b0YL5R1rNYZ3OhADSUno6OtskKC06bp93OC2b9gELKKg0w6nEPdi');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {

        localStorage.removeItem('');
        setIsLoggedIn(false);
        alert('Logged out');
    };





    const Home = () => {
        return (
            <div>
                <Header />
                <ZoomMeeting />
            </div>
        );


    };

}

export default Home;
