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
      return res.status(404).json({ error: "there is no username with this user id " });
    }

    const { content, postId } = req.body;
    if(!content){
        return res.status(400).json({ error: "content is required" });
    }
    const post = await postModel.findById(postId);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    console.log(post)
    

    // Create a new comment
    const newComment = new commentModel({
        user: userId,
        post: postId,
        content,
        commentedBy: user.username,
    });
    console.log("bfuyebf")
    console.log("new comment :",newComment)

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
  const { postId } = req.body;

  try {
    // Validate postId
    if (!postId) {
      return res.status(400).json({ error: "postId is required" });
    }

    // Find comments by post ID
    const comments = await commentModel.find({ post: postId }, 'id commentedBy content');

    if (!comments.length) {
      return res.status(404).json({ error: "No comments found for this post" });
    }

    // Respond with the comments
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments on post", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = {
    addCommentOnPost,
    fetchCommentOnPost
};
