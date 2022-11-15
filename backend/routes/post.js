const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');

const postsController = require('../controllers/post-controller');

// post Routes
router.get('/allposts', requireLogin, postsController.getallposts);

router.get('/friendposts', requireLogin, postsController.getfriendsposts);

router.post('/createPost', requireLogin, postsController.createpost);

router.get('/myposts', requireLogin, postsController.getmyposts);

router.patch('/editpost/:pid', requireLogin, postsController.updatepost);

router.delete('/deletepost/:pid', requireLogin, postsController.deletepost);

router.put('/like',requireLogin, postsController.likepost);

router.put('/unlike',requireLogin, postsController.unlikepost);

router.put('/comment',requireLogin, postsController.commentonpost);

module.exports = router;
