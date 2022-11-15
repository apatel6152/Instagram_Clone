const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');

const usersController = require('../controllers/user-controller');

// user Routes
router.get('/user/:id', requireLogin, usersController.getUsers);

router.put('/follow', requireLogin, usersController.follow);

router.put('/unfollow', requireLogin, usersController.unfollow);

router.put('/updateprofile', requireLogin, usersController.updateprofile);

router.post('/search-users', usersController.searchusers);



module.exports = router;
