const express = require('express');
const router = express.Router();

const {addCommentOnPost, fetchCommentOnPost } = require('../controllers/commentController');
const { commentMiddle } = require('../middleware/commentMiddleware');


router.use(
    [],
    commentMiddle
  );


router.post('/addcomment', addCommentOnPost);
router.get('/fetchcomments', fetchCommentOnPost);






module.exports = router;


