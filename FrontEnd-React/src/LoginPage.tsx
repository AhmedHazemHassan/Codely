import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./App.css";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Simulating a user "database"
  const usersDatabase = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if username exists and password matches
    const user = usersDatabase.find((user) => user.username === username);

    if (user) {
      if (user.password === password) {
        console.log('Login successful:', username);
        navigate('/home'); // Redirect to home if successful
      } else {
        setErrorMessage('Incorrect password. Please try again.');
      }
    } else {
      setErrorMessage('Username does not exist. Please sign up first.');
    }
  };

  return (
    <div className="login-page">
      <header>
              <div className="header-left">
        <h1>Codely</h1>
      </div>
      <div className="header-right">
        <nav>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
      </header>

      <main>
        <section id="login">
          <h2>Welcome Back!</h2>
          <form id="loginForm" onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account? <Link to="/create-account">Create one</Link>
          </p>
        </section>
      </main>

      <footer>
        <section id="about">
          <h3>About Codely</h3>
          <p>Codely is an innovative IoT platform connecting real-world locations with seamless data management.</p>
        </section>
        <section id="contact">
          <h3>Contact</h3>
          <p>Email: contact@Codely.com</p>
        </section>
      </footer>
    </div>
  );
};

export default LoginPage;
