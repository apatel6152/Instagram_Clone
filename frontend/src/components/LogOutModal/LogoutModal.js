import React , {useContext} from 'react'
import {RiCloseLine} from 'react-icons/ri';
import "./LogoutModal.css";
import { useNavigate } from "react-router-dom";
import { LoginContext } from '../../context/LoginContext';
import { UserContext } from '../../context/UserContext';

const Modal = ({setLogOutModal}) => {
    const navigate = useNavigate();
    const { setUserLogin } = useContext(LoginContext);
    const {state,dispatch} = useContext(UserContext)
    // const {setLogOutModal} = useContext(LoginContext);
    return (
      <div className="darkBg" onClick={() => setLogOutModal(false)}>
        <div className="centered">
          <div className="modal">
            {/* modal header */}
            <div className="modalHeader">
              <h5 className="heading">Confirm</h5>
            </div>
            <button className="closeBtn" onClick={() => setLogOutModal(false)}>
              <RiCloseLine></RiCloseLine>
            </button>
            {/* modal content */}
            <div className="modalContent">Are you really want to log Out ?</div>
            <div className="modalActions">
              <div className="actionsContainer">
                <button
                  className="logOutBtn"
                  onClick={() => {
                    setUserLogin(false);
                    setLogOutModal(false);
                    localStorage.clear();
                    dispatch({type:"CLEAR"})
                    navigate("./signin");
                  }}
                >
                  Log Out
                </button>
  
                <button className="cancelBtn" onClick={() => setLogOutModal(false)}>
                  cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Modal;