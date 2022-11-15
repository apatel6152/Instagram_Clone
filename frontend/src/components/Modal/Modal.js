import React from 'react';
import './Modal.css';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import Editpost from '../EditPost/Editpost';

const Modal = ({ setModalOpen, postedById, postid, deletePost }) => {
  const navigate = useNavigate();

  // Toast functions
  //   const notifyA = (msg) => toast.error(msg);
  //   const notifyB = (msg) => toast.success(msg);

  //   const deletePost = (postid) => {
  //     fetch(`http://localhost:5000/deletepost/${postid}`, {
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: 'Bearer ' + localStorage.getItem('jwt'),
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //           notifyB('Successfully Post Deleted');
  //           navigate('/');
  //         })
  //       .catch((err) => {
  //         notifyA(err);
  //         console.log(err);
  //     }
  //     );
  //   };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <React.Fragment>
      <div className="darkBg1" onClick={() => setModalOpen(false)}>
        <div className="centered">
          <div className="modalhome">
            {/* modal header */}
            <div className="modal_list">
              <Stack spacing={1} direction="column">
                {postedById === user._id && (
                  <Button
                    onClick={() => deletePost(postid)}
                    variant="text"
                    color="error"
                  >
                    Delete
                  </Button>
                )}
                {postedById === user._id && (
                  <Button
                    variant="text"
                    onClick={() => {
                      navigate(`/editpost/${postid}`);
                    }}
                  >
                    Edit
                  </Button>
                )}

                <Button variant="text">Hide like count</Button>
                <Button variant="text">Turn off commenting</Button>
                <Button variant="text">Go to post</Button>
                <Button variant="text">Cancel</Button>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
