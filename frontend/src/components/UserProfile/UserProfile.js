import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostModal from '../PostModal/PostModal';
import Button from '@mui/material/Button';
// import { LoginContext } from '../../context/LoginContext';
import './UserProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const { userid } = useParams();
  const [userprofile, setProfile] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  const [showfollow, setShowFollow] = useState(
    user ? !user.following.includes(userid) : true
  );

  const [postModalOpen, setPostModalOpen] = useState(false);
  // const {setModelOpen} = useContext(LoginContext);

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      navigate('./signup');
    }

    //Fetching all posts
    fetch(`http://localhost:5000/user/${userid}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => console.log(err));
  }, [navigate, userid]);

  const openModel = () => {
    setPostModalOpen(true);
  };

  const followUser = () => {
    fetch(`http://localhost:5000/follow`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };

  const unfollowUser = () => {
    fetch(`http://localhost:5000/unfollow`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
        setProfile((prevState) => {
          const newFollowers = prevState.user.followers.filter(
            (item) => item !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollowers,
            },
          };
        });
        setShowFollow(true);
      });
  };

  return (
    <React.Fragment>
      {userprofile ? (
        <div className="profile">
          {/* Profile frame */}
          <div className="profile-frame">
            {/* profile-pic */}
            <div className="profile-pic">
              <img src={userprofile.user.pic} alt="profile-pic" />
            </div>
            {/* profile-data */}
            <div className="profile-data">
              <h1>{userprofile.user.name}</h1>
              <ul className="">
                <li className="">
                  <div className="">
                    <span className="">{userprofile.posts.length}</span> posts
                  </div>
                </li>
                <li className="">
                  <div className="">
                    <span className="">
                      {userprofile.user.followers.length}
                    </span>{' '}
                    followers
                  </div>
                </li>
                <li className="">
                  <div className="">
                    <span className="">
                      {userprofile.user.following.length}
                    </span>{' '}
                    following
                  </div>
                </li>
              </ul>

              {showfollow ? (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: 150, m: 0.5 }}
                  onClick={() => {
                    followUser();
                  }}
                >
                  Follow
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: 150, m: 0.5 }}
                  onClick={() => {
                    unfollowUser();
                  }}
                >
                  Unfollow
                </Button>
              )}
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
            {userprofile.posts.map((userpost) => {
              return (
                <React.Fragment>
                  <img
                    onClick={openModel}
                    key={userpost._id}
                    className="profileImg"
                    src={userpost.photo}
                    alt=""
                  />
                  {postModalOpen && (
                    <PostModal
                      mypost={userpost}
                      setModalOpen={setPostModalOpen}
                    ></PostModal>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ) : (
        <h2>loading</h2>
      )}
    </React.Fragment>
  );
};

export default UserProfile;
