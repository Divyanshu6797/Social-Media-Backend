const userModel = require("../models/userModel");
const commentModel = require("../models/commentModel");
const postModel = require("../models/postModel");

const addCommentOnPost = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.userid", req.userid);

  try {
    const userId = req.userid;

    // Ensure the user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ error: "there is no username with this user id " });
    }

    const { content, postId } = req.body;
    if (!content) {
      return res.status(400).json({ error: "content is required" });
    }
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    console.log(post);

    // Create a new comment
    const newComment = new commentModel({
      user: userId,
      post: postId,
      content,
      commentedBy: user.username,
    });
    console.log("bfuyebf");
    console.log("new comment :", newComment);

    // Save the post to the database
    await newComment.save();

    // Respond with the created post
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error commenting on post", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchCommentOnPost = async (req, res) => {
  console.log(req.query);
  const { postId } = req.query;

  try {
    // Validate postId
    if (!postId) {
      return res.status(400).json({ error: "postId is required" });
    }

    // Find comments by post ID
    const comments = await commentModel
      .find({ post: postId }, " user id commentedBy content")
      .sort({ updatedAt: -1 });

    // Respond with the comments
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments on post", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteComment = async (req, res) => {
  const { commentId } = req.body;

  if (!commentId) {
    return res.status(400).json({ error: 'Comment ID is required' });
  }

  try {
    const deletedComment = await commentModel.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateComment = async (req, res) => {
  const { commentId, content } = req.body;

  if (!commentId || !content) {
    return res.status(400).json({ error: 'Comment ID and content are required' });
  }

  try {
    const updatedComment = await commentModel.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment updated successfully', updatedComment });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};




module.exports = {
  addCommentOnPost,
  fetchCommentOnPost,
  deleteComment,
  updateComment,
};
