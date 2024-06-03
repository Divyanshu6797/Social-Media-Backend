const express = require('express');
const router = express.Router();


const {follow, unfollow, fetchFollowers, fetchSuggestedFollowers} = require('../controllers/followerController');
const {followMiddle} = require('../middleware/followMiddleware');


router.use(
    [],
    followMiddle
  );

  router.post('/followuser', follow);
  router.post('/unfollowuser', unfollow);
  router.get('/fetchsuggestedfollowers', fetchSuggestedFollowers);
  router.get('/fetchfollowers', fetchFollowers);


module.exports = router;


