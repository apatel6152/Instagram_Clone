import React, { useState } from 'react';
import logo from '../../icons/logo.png';
import './UpdatePassword.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const { token } = useParams();
  console.log(token);
  const postData = () => {
    // Sending data to server
    fetch('http://localhost:5000/update-password', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate('/signin');
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
            <TextField
              type="password"
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="Enter a New Password"
              variant="outlined"
              size="small"
              value={password}
              sx={{ width: 270, m: 0.5 }}
              onChange={(e) => {
                setPassword(e.target.value);
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
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
