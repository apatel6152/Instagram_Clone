import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import './Editpost.css';
import axios from 'axios';

const Editpost = () => {
  const navigate = useNavigate();
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const { pid } = useParams();
  //   const { userid } = useParams();

  const user = JSON.parse(localStorage.getItem('user'));

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    //saving post to mongoDb
    // console.log(pid);
    if (url) {
      axios
        .patch(
          `http://localhost:5000/editpost/${pid}`,
          { body, pic: url },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
          }
        )
        .then((result) => {
          if (result.data.error) {
            // console.log(data);
            notifyA(result.data.error);
          } else {
            // console.log(data);
            notifyB('Successfully edited');
            navigate('/');
          }
        })
        .catch((err) => console.log(err));

      // fetch(`http://localhost:5000/editpost/${pid}`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      //   },
      //   body: JSON.stringify({
      //     body,
      //     pic: url,
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (data.error) {
      //       notifyA(data.error);
      //     } else {
      //       notifyB('Successfully edited');
      //       navigate('/');
      //     }
      //   })
      //   .catch((err) => console.log(err));
    }
  }, [url, navigate, body]);

  //posting image to cloundnary
  const editpostDetails = () => {
    console.log(body, image);
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

  const loadfile = (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  return (
    <div className="createPost">
      {/* //header */}
      <div className="post-header">
        <h4 style={{ margin: '3px auto' }}>Edit Post</h4>
        <button
          id="post-btn"
          onClick={() => {
            editpostDetails();
          }}
        >
          Edit
        </button>
      </div>
      {/* image preview */}
      <div className="main-div">
        <img
          id="output"
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
          alt="preview"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0]);
          }}
        />
      </div>
      {/* details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img src={user.pic} alt="post" />
          </div>
          <h5>{user.name}</h5>
        </div>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          type="text"
          placeholder="Add a comment..."
        ></textarea>
      </div>
    </div>
  );
};

export default Editpost;
