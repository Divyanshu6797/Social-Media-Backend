const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    individual: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    followedby: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
  },
    { timestamps: true}
);
  
 
  

module.exports = mongoose.model('Follow', followSchema);