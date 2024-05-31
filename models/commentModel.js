const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    },
    content: {
      type: String,
      required: true
    },
    commentedBy : {
      type : String
    }
   
  },
  { timestamps: true });

  module.exports = mongoose.model('Comment', commentSchema);