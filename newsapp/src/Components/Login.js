import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthForm from './AuthForm';

const Login = ({ onAuthSuccess }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async ({ username, password }) => {
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onAuthSuccess(data.user); // Pass user data up to App.js
        navigate('/'); // Redirect to home page on successful login
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="auth-page">
      <AuthForm onSubmit={handleLogin} isRegistering={false} />
      {error && <p className="error-message">{error}</p>}
      <p className="auth-switch-text">Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

Login.propTypes = {
  onAuthSuccess: PropTypes.func.isRequired,
};

export default Login; 