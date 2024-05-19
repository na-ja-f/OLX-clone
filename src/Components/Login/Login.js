import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const handleLogin = (e) => {
    e.preventDefault();

    // Reset previous errors
    setEmailError('');
    setPasswordError('');

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Login Error:', error);
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
          setEmailError('Invalid email');
        } else if (error.code === 'auth/wrong-password') {
          setPasswordError('Invalid password');
        } else {
          setEmailError('Login failed. Please check your email.');
        }
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="fname">Email</label>
            <br />
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(''); // Clear email error on change
              }}
              id="fname"
              name="email"
            />
          </div>
          <span className="error">{emailError}</span>
          <div className="form-group">
            <label htmlFor="lname">Password</label>
            <br />
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(''); // Clear password error on change
              }}
              id="lname"
              name="password"
            />
          </div>
          <span className="error">{passwordError}</span>
          <br />
          <button>Login</button>
        </form>
        <a onClick={() => navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
