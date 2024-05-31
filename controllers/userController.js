const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const maxAge = 3 * 24 * 60 * 60; //3 days
createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: maxAge,
  });
};

const signup = async (req, res) => {
  const { name, username, emailID, password } = req.body;
  if (!name || !username || !emailID || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }
  const user = await userModel.findOne({
    $or: [{ emailID }, { username }],
  });

  if (user) {
    console.log("User already exists");
    return res
      .status(400)
      .json({ error: "User with same username or email already exists" });
  }
  if (!user) {
    try {
      const user = await userModel.create({
        name,
        username,
        emailID,
        password,
      });
      console.log("user signed up", user);
      const token = createToken(user._id);

      res.status(200).json({ token });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  } else {
    res.status(400).json({ error: "email already exists" });
  }
};

const login = async (req, res) => {
  const { emailID, password } = req.body;
  if (!emailID || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }
  try {
    const user = await userModel.login(emailID, password);
    console.log(user);
    const token = createToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const getUserId = async (req, res) => {
  try {
    res.send(req.userid)
    
  } catch (error) {
    console.error("Error finding current user:", error);
    res.send(400).json({ error: error });
    
  }

}



module.exports = {
  signup,
  login,
  getUserId
};
