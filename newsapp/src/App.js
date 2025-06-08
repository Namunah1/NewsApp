import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import News from './Components/News';
import Login from './Components/Login';
import Register from './Components/Register';
import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [activeCategory, setActiveCategory] = useState('general'); // Default category

  // Check for active session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Important for sending session cookie
        });

        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data.user);
          setActiveCategory(data.user.country); // Set initial category to user's country
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error('Session check error:', err);
        setCurrentUser(null);
      } finally {
        setIsLoadingAuth(false);
      }
    };
    checkSession();
  }, []);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setActiveCategory(user.country); // Set category to user's country upon successful auth
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        setCurrentUser(null);
        setActiveCategory('general'); // Reset to general after logout
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setActiveCategory(newCategory);
  };

  if (isLoadingAuth) {
    return <div className="loading-splash">Loading authentication...</div>; // Simple loading indicator
  }

  return (
    <Router>
      <div className="app-container">
        {currentUser ? (
          <Navbar onCategoryChange={handleCategoryChange} activeCategory={activeCategory} onLogout={handleLogout} />
        ) : (
          <Navbar onCategoryChange={handleCategoryChange} activeCategory={activeCategory} onLogout={null} /> // Navbar without logout if not logged in
        )}
        
        <div className="main-content">
          <Routes>
            <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login onAuthSuccess={handleAuthSuccess} />} />
            <Route path="/register" element={currentUser ? <Navigate to="/" /> : <Register onAuthSuccess={handleAuthSuccess} />} />
            <Route 
              path="/"
              element={currentUser ? <News key={activeCategory} category={activeCategory} userCountry={currentUser.country} /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

