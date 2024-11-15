import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';

const App = () => {
  // Define states for authToken and firstName
  const [XAHeBSni8cP8b0YL5R1rNYZ3OhADSUno6OtskKC06bp93OC2b9gELKKg0w6nEPdi, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [firstName, setFirstName] = useState(localStorage.getItem('first_name') || '');

  const handleLogout = () => {
    localStorage.removeItem('XAHeBSni8cP8b0YL5R1rNYZ3OhADSUno6OtskKC06bp93OC2b9gELKKg0w6nEPdi');
    localStorage.removeItem('first_name');
    setAuthToken(null);
    setFirstName('');
  };

  useEffect(() => {
    if (XAHeBSni8cP8b0YL5R1rNYZ3OhADSUno6OtskKC06bp93OC2b9gELKKg0w6nEPdi) {
      console.log('User is authenticated with token:', XAHeBSni8cP8b0YL5R1rNYZ3OhADSUno6OtskKC06bp93OC2b9gELKKg0w6nEPdi);
    }
  }, [XAHeBSni8cP8b0YL5R1rNYZ3OhADSUno6OtskKC06bp93OC2b9gELKKg0w6nEPdi]);

  return (
    <div>
      {/* Pass authToken, handleLogout, and firstName to Navbar */}
      <Navbar authToken={XAHeBSni8cP8b0YL5R1rNYZ3OhADSUno6OtskKC06bp93OC2b9gELKKg0w6nEPdi} handleLogout={handleLogout} firstName={firstName} />
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={<Register setAuthToken={setAuthToken} setFirstName={setFirstName} />}
          />
          <Route
            path="/login"
            element={<Login setAuthToken={setAuthToken} setFirstName={setFirstName} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;