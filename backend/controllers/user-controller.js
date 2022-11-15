const mongoose = require('mongoose');

const POST = mongoose.model('POST');
const USER = mongoose.model('USER');

const getUsers = async (req, res) => {
  await USER.findOne({ _id: req.params.id })
    .select('-password')
    .then((user) => {
      POST.find({ postedBy: req.params.id })
        .populate('postedBy', '_id name')
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(400).json({ error: 'User Not Fonud' });
    });
};

const follow = (req, res) => {
  USER.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      USER.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        {
          new: true,
        }
      )
        .select('-password')
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
};

const unfollow = (req, res) => {
  USER.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
        // console.log(err)
      }
      USER.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        {
          new: true,
        }
      )
        .select('-password')
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
};

const updateprofile = (req, res) => {
  USER.findByIdAndUpdate(
    req.user._id,
    { $set: { pic: req.body.pic } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: 'pic cannot updated' });
      }
      res.json(result);
    }
  );
};

const searchusers = (req, res) => {
  let userPattern = new RegExp('^' + req.body.query);
  USER.find({ email: { $regex: userPattern } })
    .select('_id email pic userName')
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUsers = getUsers;
exports.follow = follow;
exports.unfollow = unfollow;
exports.updateprofile = updateprofile;
exports.searchusers = searchusers
