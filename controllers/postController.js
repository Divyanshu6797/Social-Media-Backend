const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const commentModel = require("../models/commentModel");
const mongoose = require('mongoose');

const addPost = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.userid", req.userid);

  try {
    const userId = req.userid;

    // Ensure the user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found " });
    }
    
    const { caption, imageUrl } = req.body;
    console.log("caption", caption);
    console.log("imageUrl", imageUrl);

    // Create a new post instance
    const newPost = new postModel({
      user: userId,
      caption,
      imageUrl,
      postedBy: user.username,
    });

    await newPost.save();

    // Populate the user field
    const populatedPost = await newPost.populate("user");

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchAllPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find({}, "id caption imageUrl postedBy")
      .sort({ updatedAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchUserPosts = async (req, res) => {
  const userId = req.userid;
  console.log(typeof userId, userId);
  try {
    const posts = await postModel
      .find({ user: userId }, "id caption imageUrl postedBy")
      .sort({ updatedAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePostAndItsComments = async (req, res) => {{
  
  const { postId } = req.body;

  if (!postId) {
    return res.status(400).json({ error: 'Post ID is required' });
  }

  
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    
    const deletedPost = await postModel.findByIdAndDelete(postId).session(session);
    if (!deletedPost) {
      throw new Error('Post not found');
    }

    // Delete all comments associated with the post within the session
    await commentModel.deleteMany({ post: postId }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    console.log('Post and associated comments deleted successfully.');
    return res.status(200).json({ message: 'Post and associated comments deleted successfully' , deletedPost});

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(`Error deleting post and associated comments: ${error}`);
    return res.status(500).json({ error: error.message });
  }
}
};

const editPost = async (req, res) => {
  console.log("hi")
  const { postId, caption } = req.body;

  try {
    const updatedPost= await postModel.findByIdAndUpdate(
      postId,
      { caption },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: 'post not found' });
    }

    res.status(200).json({ message: 'post updated successfully', updatedPost });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }

}

module.exports = {
  addPost,
  fetchAllPosts,
  fetchUserPosts,
  deletePostAndItsComments,
  editPost
};
