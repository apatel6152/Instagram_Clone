import React, { useEffect, useState } from 'react';
import logo from '../../icons/logo.png';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState(undefined);
  //Toast Function
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  useEffect(()=> {
    if(url) {
      uploadFields();
    }
  },[url]);

  const uploadPic = () => {
    // console.log(body, image);
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'insta-clone');
    data.append('clound_name', 'amitinstagramclone');
    fetch('https://api.cloudinary.com/v1_1/amitinstagramclone/image/upload', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  const uploadFields = () => {
    //checking email
    if (!emailRegex.test(email)) {
      notifyA('Invalid email');
      return;
    } else if (!passRegex.test(password)) {
      notifyA(
        'Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!'
      );
      return;
    }

    //sending data to server
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        userName: userName,
        email: email,
        password: password,
        pic:url
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
        }
        navigate('/signin');
        console.log(data);
      });
  }

  const postData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };

  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
          <img className="signUpLogo" src={logo} alt="" />
          {/* <p className="loginPara">
                Sign up to see photos and videos <br /> from your friends
              </p> */}
          <h2 className="vvzhL">
            Sign up to see photos and videos from your friends.
          </h2>
          <Button
            className="submit-btn"
            type="submit"
            variant="contained"
            sx={{ width: 270, m: 0.5 }}
            onClick={() => {}}
          >
            Log in with Facebook
          </Button>
          {/* <input
            type="submit"
            id="submit-btn"
            value="Log in with Facebook"
            onClick={() => {}}
          /> */}
          <div>
            <TextField
              type="email"
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="Email"
              variant="outlined"
              size="small"
              sx={{ width: 270, m: 0.5 }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
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
          </div>
          <div>
            <TextField
              type="text"
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="FullName"
              variant="outlined"
              size="small"
              sx={{ width: 270, m: 0.5 }}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {/* <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            /> */}
          </div>
          <div>
            <TextField
              type="text"
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="Username"
              variant="outlined"
              size="small"
              sx={{ width: 270, m: 0.5 }}
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            {/* <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            /> */}
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
          <div className="main-div">
            {/* <img
          id="output"
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
          alt="preview"
        /> */}
            <span>Uplaod Pic</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                // loadfile(event);
                setImage(event.target.files[0]);
              }}
            />
          </div>
          <p className="loginPara" style={{ fontSize: '12px' }}>
            People who use our service may have uploaded your contact
            information to Instagram. Learn more.
            {/* <a href="https://www.facebook.com/help/instagram/261704639352628" tabindex="0" target="_blank">Learn more</a> */}
            <br></br>
            <br></br>By signing up, you agree to out Terms, privacy policy and
            cookies policy.
          </p>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: 270, m: 0.5 }}
            onClick={() => {
              postData();
            }}
          >
            Sign Up
          </Button>
          {/* <input
            type="submit"
            id="submit-btn"
            value="Sign Up"
            onClick={() => {
              postData();
            }}
          /> */}
        </div>
        <div className="form2">
          Have an account?
          <Link to="/signin">
            <span
              style={{ color: '#0095f6', cursor: 'pointer', fontSize: '14px' }}
            >
              {' '}
              Log in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
