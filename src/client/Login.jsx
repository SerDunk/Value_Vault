import React, { useState, useEffect } from 'react';
import './Login.css';
import SignUp from './SignUp';
import Home from './Home';

const Login = ({ users }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);

  // Check if user is logged in on component mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignUpClick = () => {
    setMoveLeft(true);
    setTimeout(() => {
      setShowSignUp(true);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const foundUser = users.find(user => user.name === username && user.password === password);

    if (foundUser) {
      setIsLoggedIn(true);
      localStorage.setItem('isAuthenticated', 'true'); // Store authentication status
    } else {
      console.log('Invalid username or password');
    }
  };

  if (isLoggedIn) {
    return <Home />;
  }

  return (
    <div className={`login-container ${moveLeft ? 'move-left' : ''}`}>
      {showSignUp ? (
        <SignUp users={users} />
      ) : (
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <br />
          <a href="#" onClick={handleSignUpClick}>Don't have an account?</a>
        </div>
      )}
    </div>
  );
};

export default Login;