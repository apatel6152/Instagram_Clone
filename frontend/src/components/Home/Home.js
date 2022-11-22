import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Modal from './../Modal/Modal';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [postId, setPostId] = useState();
  const [postedById, setPostedById] = useState();
  const [comment, setComment] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('./signup');
    }

    //Fetching all posts
    axios
      .get(`http://localhost:5000/allposts`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        }
      })
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));

    // fetch('http://localhost:5000/allposts', {
    //   headers: {
    //     Authorization: 'Bearer ' + localStorage.getItem('jwt'),
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((result) => setData(result))
    //   .catch((err) => console.log(err));
  }, [navigate, data]);

  const openModal = (postid, postedById) => {
    setModalOpen(true);
    setPostId(postid);
    setPostedById(postedById);
  };

  const deletePost = (postid) => {

    axios.delete(`http://localhost:5000/deletepost/${postid}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      }
    })
    .then((result) => {
      const newData = data.filter((item) => {
        return item._id !== result.data._id;
      });
      setData(newData);
    })
    .catch((err) => console.log(err));

    // fetch(`http://localhost:5000/deletepost/${postid}`, {
    //   method: 'DELETE',
    //   headers: {
    //     Authorization: 'Bearer ' + localStorage.getItem('jwt'),
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     const newData = data.filter((item) => {
    //       return item._id !== result._id;
    //     });
    //     setData(newData);
    //   })
    //   .catch((err) => console.log(err));
  };

  const likePost = (id) => {

    axios.put(`http://localhost:5000/like`,{ postId: id}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
    .then((result) => {
      const newData = data.map((item) => {
        if (item._id === result.data._id) {
          // console.log(result)
          return result.data;
        } else {
          // console.log(item);
          return item;
        }
      });
      setData(newData);
      // console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

    // fetch('http://localhost:5000/like', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + localStorage.getItem('jwt'),
    //   },
    //   body: JSON.stringify({
    //     postId: id,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     const newData = data.map((item) => {
    //       if (item._id === result._id) {
    //         // console.log(result)
    //         return result;
    //       } else {
    //         // console.log(item);
    //         return item;
    //       }
    //     });
    //     setData(newData);
    //     // console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const unlikePost = (id) => {

    axios.put(`http://localhost:5000/unlike`,{ postId: id}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
    .then((result) => {
      const newData = data.map((item) => {
        if (item._id === result.data._id) {
          // console.log(result)
          return result.data;
        } else {
          // console.log(item);
          return item;
        }
      });
      setData(newData);
      // console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

    // fetch('http://localhost:5000/unlike', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + localStorage.getItem('jwt'),
    //   },
    //   body: JSON.stringify({
    //     postId: id,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     //   console.log(result)
    //     const newData = data.map((item) => {
    //       if (item._id === result._id) {
    //         return result;
    //       } else {
    //         return item;
    //       }
    //     });
    //     setData(newData);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // const [message, setMessage] = useState('');
  const handleChange = (event) => {
    //  Get input value from "event"
    setComment(event.target.value);
  };
  // console.log(message);
  const handleComment = (id) => {
    makeComment(comment, id);
    setComment('');
  };

  const makeComment = (text, postId) => {

    axios.put(`http://localhost:5000/comment`,{ text: text, postId: postId}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
    .then((result) => {
      const newData = data.map((item) => {
        if (item._id === result.data._id) {
          // console.log(result)
          return result.data;
        } else {
          // console.log(item);
          return item;
        }
      });
      setData(newData);
      // console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

    // fetch('http://localhost:5000/comment', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + localStorage.getItem('jwt'),
    //   },
    //   body: JSON.stringify({
    //     text: text,
    //     postId: postId,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     const newData = data.map((item) => {
    //       if (item._id === result._id) {
    //         return result;
    //       } else {
    //         return item;
    //       }
    //     });
    //     setData(newData);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  // console.log(data)
  return (
    <React.Fragment>
      <div className="home">
        {/* card */}
        {data.map((post) => {
          return (
            <div key={post._id} className="card">
              {modalOpen && (
                <Modal
                  deletePost={deletePost}
                  postedById={postedById}
                  postid={postId}
                  setModalOpen={setModalOpen}
                ></Modal>
              )}

              {/* card header */}
              <div className="card-header">
                <div className="card-pic">
                  <img src={post ? post.postedBy.pic : undefined} alt="" />
                </div>
                {/* <div> */}
                <Link
                  to={
                    post.postedBy._id !== user._id
                      ? '/profile/' + post.postedBy._id
                      : '/profile/'
                  }
                >
                  <span className="posttitle">{post.postedBy.name}</span>
                </Link>
                {/* </div> */}

                <button
                  className="dottedButton"
                  onClick={() => {
                    openModal(post._id, post.postedBy._id);
                  }}
                  type="button"
                  tabIndex="0"
                >
                  <div className="">
                    <div className="" style={{ height: 24, width: 24 }}>
                      <svg
                        aria-label="More Options"
                        className="_ab6-"
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <circle cx="12" cy="12" r="1.5"></circle>
                        <circle cx="6" cy="12" r="1.5"></circle>
                        <circle cx="18" cy="12" r="1.5"></circle>
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              {/* card image */}
              <div className="card-image">
                <img src={post.photo} alt="" />
              </div>

              {/* card content */}
              <div className="card-content">
                <div className="card-icon">
                  <div className="favouriteIcon">
                    {/* <i className='material-icons'>thump_up</i> */}
                    {post.likes.includes(user._id) ? (
                      <FavoriteIcon
                        onClick={() => {
                          unlikePost(post._id);
                        }}
                        sx={{ width: 28, height: 28, fill: 'red' }}
                      ></FavoriteIcon>
                    ) : (
                      <FavoriteBorderIcon
                        onClick={() => {
                          likePost(post._id);
                        }}
                        sx={{ width: 28, height: 28 }}
                      ></FavoriteBorderIcon>
                    )}

                    {/* <span className="material-symbols-outlined" >favorite</span> */}

                    {/* <svg
                      aria-label="Like"
                      class="_ab6-"
                      color="#262626"
                      fill="#262626"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path 
                        d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"
                        fill='red'>
                      </path>
                    </svg> */}
                  </div>
                  <div className="commentIcon">
                    <span className="">
                      <svg
                        aria-label="Comment"
                        className="_ab6-"
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path
                          d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  {/* <span className="material-symbols-outlined">favorite</span> */}
                  {/* <span className=""><svg aria-label="Unlike" class="_ab6-" color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg></span> */}
                  <div className="sendIcon">
                    <span className="">
                      {/* <svg aria-label="Comment" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg> */}
                      <svg
                        aria-label="Share Post"
                        className="_ab6-"
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <line
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="22"
                          x2="9.218"
                          y1="3"
                          y2="10.083"
                        ></line>
                        <polygon
                          fill="none"
                          points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></polygon>
                      </svg>
                    </span>
                  </div>
                  <div className="saveIcon">
                    <span className="">
                      <svg
                        aria-label="Save"
                        className="saveSVG"
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <polygon
                          fill="none"
                          points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></polygon>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="likes">
                  <span> {post.likes.length} Like</span>
                </div>
                <div className="body">
                  <span>
                    <b>{post.postedBy.name}</b> {post.body}
                  </span>
                </div>
                {post.comments.length !== 0 && (
                  <div className="viewcommentline">
                    View all <span>{post.comments.length}</span> comments
                  </div>
                )}
                {/* <hr></hr> */}
                {post.comments.map((comment) => {
                  return (
                    <div className="viewcomment">
                      <span>
                        <b>{comment.postedBy.name}</b> {comment.text}
                      </span>
                    </div>
                  );
                })}
                <hr></hr>
                {/* add Comment */}
                <div className="add-comment">
                  {/* <form onSubmit={(e) => {
                    e.preventDefault();
                    makeComment(e.target[0].value, post._id)
                  }}>  */}
                  <span className="material-symbols-outlined">mood</span>
                  <input
                    type="text"
                    value={comment}
                    onChange={handleChange}
                    placeholder="Add a comment..."
                  />
                  <button
                    className="comment"
                    onClick={() => {
                      handleComment(post._id);
                    }}
                  >
                    Post
                  </button>
                  {/* </form> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Home;
