import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./App.css";

const CreateAccPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate fields
    if (!username) {
      setErrorMessage('Username is required!');
      return;
    }
    if (!email) {
      setErrorMessage('Email is required!');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Invalid email format! Please include "@" and a valid domain.');
      return;
    }
    if (!password) {
      setErrorMessage('Password is required!');
      return;
    }
    if (!confirmPassword) {
      setErrorMessage('Please confirm your password!');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }
    if (!dob) {
      setErrorMessage('Date of birth is required!');
      return;
    }

    // Clear error message if all validations pass
    setErrorMessage('');

    // Simulate account creation (you can add an API call here)
    alert('Account Created Successfully!');
    navigate('/home'); // Redirect to HomePage after account creation
  };

  return (
    <div className="create-account-page">
      <header>
        <h1>MeshNetak</h1>
      </header>

      <main>
        <section id="create-account">
          <h2>Create an Account</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit} id="createAccountForm">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit">Create Account</button>
          </form>
        </section>
      </main>

      
    </div>
  );
};

export default CreateAccPage;
