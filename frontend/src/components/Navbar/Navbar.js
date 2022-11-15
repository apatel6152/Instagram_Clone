import React, { useState } from 'react';
import logo from '../../icons/logo.png';
import './Navbar.css';
// import { LoginContext } from '../../context/LoginContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Avatar from '@mui/material/Avatar';
// import M from 'materialize-css';
import Modal from './../LogOutModal/LogoutModal';
import SearchModal from './../SearchModal/Searchmodal';

const Navbar = ({ login }) => {
  // const searchModal = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [logoutmodal, setLogOutModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  // useEffect(() => {
  //   M.Modal.init(searchModal.current);
  // }, []);

  const openModal = () => {
    setModalOpen(true);
    // setPostId(postid);
    // setPostedById(postedById);
  };

  const token = localStorage.getItem('jwt');
  const loginStatus = () => {
    if (login || token) {
      return [
        <React.Fragment>
          <Link to="/">
            {/* <li>Home</li> */}
            <li>
              {/* <GrHomeRounded  sx={{fontWeight:500, width: 30, height: 30 }}/> */}
              <HomeOutlinedIcon sx={{ width: 30, height: 30 }} />
            </li>
          </Link>
          <Link to="/createPost">
            {/* <li>Create Post</li> */}
            <li>
              <AddBoxOutlinedIcon sx={{ width: 30, height: 30 }} />
            </li>
          </Link>
          <Link to="/profile">
            <li>
              <Avatar src={user.pic} sx={{ width: 30, height: 30 }} />
            </li>
          </Link>
          <Link to={''}>
            {/* <Button  variant="contained" color="error">
              Logout
            </Button> */}
            <li>
              <LogoutIcon
                onClick={() => setLogOutModal(true)}
                sx={{ color: 'red', width: 30, height: 30 }}
              />
            </li>
          </Link>
        </React.Fragment>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>,
      ];
    }
  };

  return (
    <React.Fragment>
      <div className="navbar">
        {logoutmodal && <Modal setLogOutModal={setLogOutModal}></Modal>}
        {modalOpen && <SearchModal setModalOpen={setModalOpen}></SearchModal>}
        <img src={logo} alt="" />
        {token && <div className="search">
          <div className="searchbox">
            <SearchIcon />
            <input
              id="searchinputbox"
              type="text"
              // className="modal-trigger "
              placeholder="Search"
              // data-target="modal1"
              onClick={() => {
                openModal();
              }}
            />
          </div>
        </div>}
        <ul className="nav-menu">{loginStatus()}</ul>
      </div>
      {/* <div
        id="modal1"
        className="modal"
        ref={searchModal}
        style={{ color: 'black' }}
      >
        <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul className="collection">
            {userDetails.map((item) => {
              return (
                <Link
                  to={
                    item._id !== user._id ? '/profile/' + item._id : '/profile'
                  }
                  onClick={() => {
                    M.Modal.getInstance(searchModal.current).close();
                    setSearch('');
                  }}
                >
                  <li className="collection-item">{item.email}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => setSearch('')}
          >
            close
          </button>
        </div>
      </div> */}
    </React.Fragment>
  );
};

export default Navbar;
