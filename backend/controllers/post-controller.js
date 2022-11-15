const mongoose = require('mongoose');
const POST = mongoose.model('POST');

const getallposts = async (req, res) => {
  await POST.find()
    .populate('postedBy', '_id name pic')
    .populate('comments.postedBy', '_id name')
    .sort('-createdAt')
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
};

const getfriendsposts = async (req, res) => {
  await POST.find({ postedBy: { $in: [req.user.following] } })
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .sort('-createdAt')
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
};

const createpost = async (req, res) => {
  const { body, pic } = req.body;
  if (!body || !pic) {
    return res.status(422).json({ error: 'Please add all required fields' });
  }
  console.log(req.user);
  const post = new POST({
    body,
    photo: pic,
    postedBy: req.user,
  });

  await post
    .save()
    .then((result) => {
      return res.json({ post: result });
    })
    .catch((err) => console.log(err));
};

const updatepost = async (req, res) => {
  const { body, pic } = req.body;
  const postId = req.params.pid;

  let post;
  try {
    post = await POST.findById(postId);
  } catch (err) {
    console.log(err);
  }

  post.body = body;
  post.photo = pic;

  await post
    .save()
    .then((post) => {
      return res.json({ post: post });
    })
    .catch((err) => console.log(err));
};

const getmyposts = async (req, res) => {
  await POST.find({ postedBy: req.user._id })
    .populate('postedBy', '_id name')
    .then((myposts) => res.json(myposts))
    .catch((err) => console.log(err));
};

const deletepost = async (req, res) => {
  const postId = req.params.pid;

  let post;
  try {
    post = await POST.findById(postId).populate('postedBy', '_id name');
  } catch (err) {
    console.log(err);
    res.status(404).send('Something went wrong, could not delete place.');
  }
  if (!post) {
    console.log('Could not find place for this id.');
    res.status(404).json(`No post with id: ${postId}`);
  }
  try {
    if (post.postedBy._id.toString() === req.user._id.toString()) {
      post
        .remove()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (err) {
    console.log('Something went wrong, could not delete post.');
  }
};

const likepost = async (req, res) => {
  await POST.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
};

const unlikepost = async (req, res) => {
  await POST.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
};

const commentonpost = async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  await POST.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .exec((err, result) => {
      if (err) {
        // console.log(err);
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
};

exports.getallposts = getallposts;
exports.getfriendsposts = getfriendsposts;
exports.createpost = createpost;
exports.getmyposts = getmyposts;
exports.updatepost = updatepost;
exports.deletepost = deletepost;
exports.likepost = likepost;
exports.unlikepost = unlikepost;
exports.commentonpost = commentonpost;
