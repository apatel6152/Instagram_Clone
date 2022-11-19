import React, { useState, useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import logo from '../../icons/logo.png';
import './SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginContext } from './../../context/LoginContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SignIn = () => {
  const { state, dispatch } = useContext(UserContext);
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () => {
    //checking email
    if (!emailRegex.test(email)) {
      notifyA('Invalid email');
      return;
    }

    // Sending data to server
    fetch('http://localhost:5000/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          // console.log(data);
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('user', JSON.stringify(data.savedUser));
          dispatch({ type: 'USER', payload: data.savedUser });
          // console.log(state);
          setUserLogin(true);
          navigate('/');
        }
        // console.log(data);
      });
  };

  return (
    <div className="signIn">
      <div className="form-container">
        <div className="form">
          <img className="signInLogo" src={logo} alt="" />
          <div>
            {/* <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email Address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            /> */}
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="Email Address"
              variant="outlined"
              size="small"
              value={email}
              sx={{ width: 270, m: 0.5 }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              type="password"
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="password"
              variant="outlined"
              size="small"
              sx={{ width: 270, m: 0.5 }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {/* <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            /> */}
          </div>

          <Button
            type="submit"
            variant="contained"
            sx={{ width: 270, m: 0.5 }}
            onClick={() => {
              postData();
            }}
          >
            Log In
          </Button>
          {/* <input
            type="submit"
            id="submit-btn"
            value="Log In"
            onClick={() => {
              postData();
            }}
          /> */}
          <div className="forget-password">
            <Link to="/reset-password">
              <span style={{ cursor: 'pointer', fontSize: '14px' }}>
                Forgotten your Password?
              </span>
            </Link>
          </div>
        </div>

        <div className="form2">
          Don't have an account?
          <Link to="/signup">
            <span
              style={{ color: '#0095f6', cursor: 'pointer', fontSize: '12px' }}
            >
              {' '}
              Sign up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
