import React, { useState } from 'react';
import logo from '../../icons/logo.png';
import './ResetPassword.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

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
    axios
        .post(
          `http://localhost:5000/reset-password`,
          { email:email },
          {
            headers: {
              'Content-Type': 'application/json',
              // Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
          }
        )
        .then((result) => {
          if (result.data.error) {
            notifyA(result.data.error);
          } else {
            // console.log(data);
            notifyB(result.data.message);
            navigate('/signin');
          }
        })
        .catch((err) => console.log(err));

    // fetch('http://localhost:5000/reset-password', {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.error) {
    //       notifyA(data.error);
    //     } else {
    //       notifyB(data.message);
    //       navigate('/signin');
    //     }
    //     // console.log(data);
    //   });
  };

  return (
    <div className="signIn">
      <div className="form-container">
        <div className="form">
          <img className="signInLogo" src={logo} alt="" />
          <div>
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

          <Button
            type="submit"
            variant="contained"
            sx={{ width: 270, m: 0.5 }}
            onClick={() => {
              postData();
            }}
          >
            Reset Password
          </Button>
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

export default ResetPassword;
