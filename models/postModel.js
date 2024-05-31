const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    caption: {
      type: String,
    //   required: true
    },
    imageUrl: {
      type: String,
      
    },
     postedBy : {
      type : String
    }
  },{ timestamps: true });



  module.exports = mongoose.model('Post', postSchema);