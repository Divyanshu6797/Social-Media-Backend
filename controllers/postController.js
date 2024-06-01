const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

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

    // Create a new post instance
    const newPost = new postModel({
      user: userId,
      caption,
      imageUrl,
      postedBy: user.username,
    });

    // Save the post to the database
    await newPost.save();

    // Populate the user field
    const populatedPost = await newPost.populate("user");

    // Respond with the created post
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

    // Respond with the posts
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchUserPosts =  async (req, res) => {
    const userId = req.userid
    console.log(typeof userId, userId)
    try {
      const posts = await postModel
        .find({user : userId}, "id caption imageUrl postedBy")
        .sort({ updatedAt: -1 });
  
      // Respond with the posts
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
  addPost,
  fetchAllPosts,
  fetchUserPosts,
 
};
