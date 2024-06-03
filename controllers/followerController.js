const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const followModel = require("./../models/followModel");

const follow = async (req, res) => {
    
  const followedbyId = req.userid;
  const { individualId } = req.body;

  
// individual
// 665988957e9627f2ab89c239
// followedby
// 6659a145d8c7516eb518ae9d

console.log("followedbyId", followedbyId);
console.log("individualId", individualId);
  
  
  try {
    if (!individualId) {
      return res.status(400).json({ message: "individualId is required" });
    }
    
    const individual = await userModel.findById(individualId);
    if (!individual) {
      return res.status(404).json({ message: "individual not found" });
    }
    
   

    const follow = await followModel.findOne({
      individual: individualId,
      followedby: followedbyId,
    });
    
    
    if (!follow) {
      
      const newFollow = new followModel({
        individual: individualId,
        followedby: followedbyId,
      });
      console.log("newFollow", newFollow)
      await newFollow.save();
      
      res.status(200).json({ message: "User followed successfully" });
    } else {
      
      res.status(400).json({ message: "User is already being followed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const unfollow = async (req, res) => {
    const followedbyId = req.userid;
    const {individualId} = req.body;
    try {
        if (!individualId) {
            return res.status(400).json({ message: "individualId is required" });
        }
        const individual = await userModel.findById(individualId);
        if (!individual) {
            return res.status(404).json({ message: "individual not found" });
        }
        const follow = await followModel.findOne({
            individual: individualId,
            followedby: followedbyId,
        });
        if (follow) {
            await followModel.deleteOne({ individual: individualId, followedby: followedbyId });
            res.status(200).json({ message: "User unfollowed successfully" });
        } else {
            res.status(400).json({ message: "User is not being followed" });
        }
    
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }

};
const fetchSuggestedFollowers = async (req, res) => {
    const followedbyId = req.userid;
  
    try {
      // Find individuals who are not followed by the given followedbyId
      const individuals = await userModel.find(
        {
          _id: { $ne: followedbyId }, // Exclude the user with followedbyId
        },
        { _id: 1, username: 1, name: 1, email: 1 }
      );
      res.json(individuals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  
const fetchFollowers = async (req, res) => {
  const followedById = req.userid;
  try {
    const individuals = await followModel
      .find({ followedby: followedById })
      .populate("individual");
    res.json(individuals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  follow,
  unfollow,
  fetchFollowers,
  fetchSuggestedFollowers,
};
