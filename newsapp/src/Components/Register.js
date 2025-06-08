import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthForm from './AuthForm';

const Register = ({ onAuthSuccess }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async ({ username, password, country }) => {
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password, country }),
      });

      const data = await response.json();

      if (response.ok) {
        onAuthSuccess(data.user); // Pass user data up to App.js
        navigate('/'); // Redirect to home page on successful registration and login
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="auth-page">
      <AuthForm onSubmit={handleRegister} isRegistering={true} />
      {error && <p className="error-message">{error}</p>}
      <p className="auth-switch-text">Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

Register.propTypes = {
  onAuthSuccess: PropTypes.func.isRequired,
};

export default Register; 