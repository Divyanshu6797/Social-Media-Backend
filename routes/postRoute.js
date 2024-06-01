const express = require('express');
const router = express.Router();

const {addPost, fetchAllPosts, fetchUserPosts } = require('../controllers/postController');

const {postMiddle} = require('../middleware/postMiddleware');


router.use(
    [],
    postMiddle
  );


router.post('/addpost', addPost);
router.get('/allposts', fetchAllPosts);
router.get('/userposts', fetchUserPosts);







module.exports = router;


