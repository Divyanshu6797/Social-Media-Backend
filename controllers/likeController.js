const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const followModel = require("./../models/followModel");
const postModel = require("./../models/postModel");
const likeModel = require("./../models/likeModel");

const likeAPost = async (req, res) => {
    const likedbyId = req.userid;
    const { postId } = req.body;
    try {
        if (!postId) {
            return res.status(400).json({ message: "postId is required" });
        }
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        const like = await likeModel.findOne({
            post: postId,
            user: likedbyId,
        });
        if (!like) {
            const newLike = new likeModel({
                post: postId,
                user: likedbyId,
            });
            await newLike.save();
            res.status(200).json({ message: "Post liked successfully", "liked by" : likedbyId });
        } else {
            res.status(400).json({ message: "Post is already being liked" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}
const unLikeAPost = async (req, res) => {
    const likedbyId = req.userid;
    const { postId } = req.body;
    try {
        if (!postId) {
            return res.status(400).json({ message: "postId is required" });
        }
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        const like = await likeModel.findOneAndDelete({
            post: postId,
            user: likedbyId,
        });
        if (like) {
            res.status(200).json({ message: "Post unliked successfully" });
        } else {
            res.status(400).json({ message: "Post is not liked" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}
const fetchLikesOnAPost = async (req, res) => {

    console.log("query",req.query)
    const { postId } = req.query;
    try {
        if (!postId) {
            return res.status(400).json({ message: "postId is required" });
        }
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        const likes = await likeModel.find({
            post: postId,
        });
        res.status(200).json(likes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}
const findIfAPostIsLiked = async (req, res) => {
    const likedbyId = req.userid;
    const { postId } = req.query;
    try {
        if (!postId) {
            return res.status(400).json({ message: "postId is required" });
        }
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        const like = await likeModel.findOne({
            post: postId,
            user: likedbyId,
        });
        if (like) {
            res.status(200).json({booleanVal:true});
        } else {
            res.status(200).json({booleanVal:false});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }

}



module.exports = {
    likeAPost,
    unLikeAPost,
    fetchLikesOnAPost,
    findIfAPostIsLiked

}