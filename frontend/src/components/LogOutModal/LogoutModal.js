import React  from 'react'
import {RiCloseLine} from 'react-icons/ri';
import "./LogoutModal.css";
import { useNavigate } from "react-router-dom";
// import { LoginContext } from '../../context/LoginContext';

const Modal = ({setLogOutModal}) => {
    const navigate = useNavigate();
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
                    setLogOutModal(false);
                    navigate("./signin");
                    localStorage.clear();
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