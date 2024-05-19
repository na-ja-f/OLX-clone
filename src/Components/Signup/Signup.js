import React, { useContext, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset previous errors
    setUsernameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');

    // Validation
    let isValid = true;

    if (!username.trim()) {
      setUsernameError('Username is required');
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    }

    if (!phone.trim()) {
      setPhoneError('Phone number is required');
      isValid = false;
    }

    if (password.trim().length < 6) {
      setPasswordError('6 charecters minimum');
      isValid = false;
    }

    if (isValid) {
      // Proceed with signup
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          result.user
            .updateProfile({ displayName: username })
            .then(() => {
              firebase
                .firestore()
                .collection('users')
                .add({
                  id: result.user.uid,
                  username: username,
                  phone: phone,
                })
                .then(() => {
                  navigate('/login');
                });
            });
        })
        .catch((error) => {
          // Handle signup errors
          console.error('Signup Error:', error);
          // Display error messages as needed
        });
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fname">Username</label>
            <br />
            <input
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="fname"
              name="name"
            />
          </div>
          <span className="error">{usernameError}</span>
          <div className="form-group">
            <label htmlFor="fname">Email</label>
            <br />
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="fname"
              name="email"
            />
          </div>
          <span className="error">{emailError}</span>
          <div className="form-group">
            <label htmlFor="lname">Phone</label>
            <br />
            <input
              className="input"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="lname"
              name="phone"
            />
          </div>
          <span className="error">{phoneError}</span>
          <div className="form-group">
            <label htmlFor="lname">Password</label>
            <br />
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="lname"
              name="password"
            />
          </div>
          <span className="error">{passwordError}</span>
          <br />
          <button type="submit">Signup</button>
        </form>
        <a onClick={()=>{
          navigate('/login')
        }}>Login</a>
      </div>
    </div>
  );
}
