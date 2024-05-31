const express = require('express');
const router = express.Router();

const {addPost, fetchAllPosts } = require('../controllers/postController');

const {postMiddle} = require('../middleware/postMiddleware');


router.use(
    [],
    postMiddle
  );


router.post('/addpost', addPost);
router.get('/allposts', fetchAllPosts);






module.exports = router;


