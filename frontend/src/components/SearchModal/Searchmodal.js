import React, { useState } from 'react';
import './Searchmodal.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

const Modal = ({ setModalOpen }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [search, setSearch] = useState('');
  const [userDetails, setUserDetails] = useState([]);

  const fetchUsers = (query) => {
    setSearch(query);

    axios
      .post(
        `http://localhost:5000/search-users`,
        { query },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        }
      )
      .then((result) => setUserDetails(result.data.user))
      .catch((err) => console.log(err));

    // fetch('http://localhost:5000/search-users', {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     query,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((results) => {
    //     setUserDetails(results.user);
    //   });
  };
  return (
    <div className="searchmodal">
      <div className="searchmodal_centered">
        <div className="searchmodal_home">
          {/* modal header */}
          <div className="modal_list">
            <Stack spacing={1} direction="column">
              <div className="search">
                <h1
                  style={{
                    color: 'black',
                    textAlign: 'left',
                    display: 'block',
                  }}
                >
                  Search
                </h1>
                <div className="searchinputbox">
                  <SearchIcon />
                  <input
                    id="searchinputbox"
                    className="searchinput"
                    type="text"
                    // className="modal-trigger "
                    placeholder="Search"
                    onChange={(e) => fetchUsers(e.target.value)}
                  />
                </div>
              </div>
              <ul className="collection">
                {userDetails.map((item) => {
                  return (
                    <Link
                      to={
                        item._id !== user._id
                          ? '/profile/' + item._id
                          : '/profile'
                      }
                      onClick={() => {
                        setSearch('');
                        setModalOpen(false);
                      }}
                    >
                      <li className="collection-item">
                        <Avatar src={item.pic} sx={{ width: 50, height: 50 }} />
                        <div className="searchresultuser">
                          <span className="searchresultemail">
                            {item.email}
                          </span>
                          <span className="searchresultname">
                            {item.userName}
                          </span>
                        </div>
                      </li>
                    </Link>
                  );
                })}
              </ul>
              <Button
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Close
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
