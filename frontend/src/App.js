import React, {
  useState,
  useReducer,
  useContext,
  useEffect,
  Suspense,
} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Profile from './components/Profile/Profile';
import Createpost from './components/CreatePost/Createpost';
import { LoginContext } from './context/LoginContext';
import { UserContext } from './context/UserContext';
// import Modal from "./components/LogOutModal/LogoutModal";
import UserProfile from './components/UserProfile/UserProfile';
import FriendPost from './components/FriendsPost/FriendPost';
import Editpost from './components/EditPost/Editpost';
import ResetPassword from './components/ResetPassword/ResetPassword';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { reducer, initialState } from './reducers/userReducer';

// const Navbar = React.lazy(() => import('./components/Navbar/Navbar'));
// const Home = React.lazy(() => import('./components/Home/Home'));
// const SignUp = React.lazy(() => import('./components/SignUp/SignUp'));
// const SignIn = React.lazy(() => import('./components/SignIn/SignIn'));
// const Profile = React.lazy(() => import('./components/Profile/Profile'));
// const Createpost = React.lazy(() =>
//   import('./components/CreatePost/Createpost')
// );

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'USER', payload: user });
    } else {
      // navigate('/');
    }
  }, [dispatch, navigate]);
  // console.log(state);
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/friendposts" element={<FriendPost />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route exact path="/profile" element={<Profile />}></Route>
      <Route path="/createPost" element={<Createpost />}></Route>
      <Route path="/editpost/:pid" element={<Editpost />}></Route>
      <Route path="/profile/:userid" element={<UserProfile />}></Route>
      <Route exact path="/reset-password" element={<ResetPassword />}></Route>
      <Route path="/reset/:token" element={<UpdatePassword />}></Route>

    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{ setUserLogin, setModalOpen }}>
          <UserContext.Provider value={{ state, dispatch }}>
            {/* <Suspense fallback={<div>Loading</div>}> */}
              <Navbar login={userLogin} />
              <Routing />
            {/* </Suspense> */}
            <ToastContainer theme="dark" />
            {/* {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>} */}
          </UserContext.Provider>
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
