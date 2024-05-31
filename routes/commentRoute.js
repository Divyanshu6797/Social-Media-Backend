const express = require('express');
const router = express.Router();

const {addCommentOnPost, fetchCommentOnPost, deleteComment, updateComment } = require('../controllers/commentController');
const { commentMiddle } = require('../middleware/commentMiddleware');


router.use(
    [],
    commentMiddle
  );


router.post('/addcomment', addCommentOnPost);
router.get('/fetchcomments', fetchCommentOnPost);
router.delete('/deletecomment', deleteComment);
router.put('/updatecomment', updateComment);






module.exports = router;


