import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AuthForm = ({ onSubmit, isRegistering }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('us'); // Default country

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password, country: isRegistering ? country : undefined });
  };

  const countries = [
    { code: 'us', name: 'United States' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'ca', name: 'Canada' },
    { code: 'au', name: 'Australia' },
    { code: 'in', name: 'India' },
    // Add more countries as needed
  ];

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-input"
        />
      </div>
      {isRegistering && (
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="form-select"
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <button type="submit" className="form-button">
        {isRegistering ? 'Register' : 'Login'}
      </button>
    </form>
  );
};

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isRegistering: PropTypes.bool,
};

AuthForm.defaultProps = {
  isRegistering: false,
};

export default AuthForm; 