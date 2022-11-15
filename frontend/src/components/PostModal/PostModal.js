import React from 'react';
import './PostModal.css';
// import { useNavigate } from "react-router-dom";
// import { LoginContext } from '../../context/LoginContext';

const PostModal = ({ setModalOpen, mypost }) => {
  // console.log(mypost);
  return (
    <div className="darkBg" onClick={() => setModalOpen(false)}>
      <div className="centered">
        <div className="postmodal">
          {/* modal header */}
          {/* <div className="modalHeader">
              <h5 className="heading">Confirm</h5>
            </div> */}
          {/* <button className="closeBtn" onClick={() => setModalOpen(false)}>
            <RiCloseLine></RiCloseLine>
          </button> */}
          {/* modal content */}
          <div className="postmodalContent">
            <div className="postImage1">
              <img
                //   onClick={openModel}
                key={mypost._id}
                className="postimage"
                src={mypost.photo}
                alt=""
              />
            </div>
            <div className="mypostContent">
              {/* <h1>post</h1> */}
              <div className="mypostContent_heading">
                {/* <div className="mypostContent_heading-image"> */}
                <img
                  className="mypostContent_heading-image"
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
                {/* </div> */}
                <h4>{mypost.postedBy.name}</h4>
              </div>
              {/* <hr></hr> */}
              <div className="postcomments">
                <div className="comments">
                  {/* <h6>No cometns yet.</h6> */}
                  {mypost.comments.map((comment) => {
                    return (
                      <div className="viewcomment">
                        {/* <img
                    className='mypostContent_heading-image'
                    src={mypost.photo}
                    alt=""
                  /> */}
                        <span>
                          <b>{mypost.postedBy.name}</b> {comment.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
