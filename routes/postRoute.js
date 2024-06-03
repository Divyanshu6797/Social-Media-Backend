const express = require('express');
const router = express.Router();

const {addPost, fetchAllPosts, fetchUserPosts , deletePostAndItsComments, editPost} = require('../controllers/postController');

const {postMiddle} = require('../middleware/postMiddleware');


router.use(
    [],
    postMiddle
  );


router.post('/addpost', addPost);
router.get('/allposts', fetchAllPosts);
router.get('/userposts', fetchUserPosts);
router.delete('/deletepostanditscomments', deletePostAndItsComments);
router.put('/editpost', editPost);







module.exports = router;


