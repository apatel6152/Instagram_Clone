import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import PostModal from './../PostModal/PostModal';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';

import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [myposts, setMyposts] = useState([]);
  const [image, setImage] = useState('');
  const [postModalOpen, setPostModalOpen] = useState(false);
  // const {setModelOpen} = useContext(LoginContext);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      navigate('./signup');
    }

    //Fetching all posts
    fetch('http://localhost:5000/myposts', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setMyposts(result);
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      navigate('./signup');
    }

    if (image) {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'insta-clone');
      data.append('cloud_name', 'cnq');

      fetch('https://api.cloudinary.com/v1_1/amitinstagramclone/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch('http://localhost:5000/updateprofile', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              // console.log(result);
              localStorage.setItem(
                'user',
                JSON.stringify({ ...user, pic: result.pic })
              );
              dispatch({ type: 'UPDATEPIC', payload: result.pic });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image, dispatch, navigate]);

  const openModel = () => {
    // setShowModel(true);
    setPostModalOpen(true);
  };
  // console.log(user);
  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        {/* profile-pic */}
        <div className="profile-pic">
          <img src={user.pic} alt="profile-pic" />
          <div className="inner">
            <input
              className="inputfile"
              type="file"
              name="pic"
              accept="image/*"
              onChange={(e) => updatePhoto(e.target.files[0])}
            />
            <CameraAltRoundedIcon
              sx={{ color: 'blue', width: 30, height: 30, mt: '10px' }}
            />
          </div>
        </div>

        <div className="profile-data">
          <h1>{user.name}</h1>
          <ul className="">
            <li className="">
              <div className="">
                <span className="">{myposts.length}</span> posts
              </div>
            </li>
            <li className="">
              <div className="">
                <span className="" title="451">
                  {user.followers.length}
                </span>{' '}
                followers
              </div>
            </li>
            <li className="">
              <div className="">
                <span className="">{user.following.length}</span> following
              </div>
            </li>
          </ul>
        </div>
      </div>
      <hr
        style={{
          width: '90%',
          opacity: '0.8',
          margin: '25px auto',
        }}
      />
      {/* Gallery */}
      <div className="gallery">
        {myposts.map((mypost) => {
          return (
            <React.Fragment key={mypost._id}>
              {/* {showModel && <div><h1>hello</h1></div>} */}
              <img
                onClick={openModel}
                key={mypost._id}
                className="profileImg"
                src={mypost.photo}
                alt=""
              />
              {postModalOpen && (
                <PostModal
                  mypost={mypost}
                  setModalOpen={setPostModalOpen}
                ></PostModal>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
