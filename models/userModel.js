const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const userSchema = new mongoose.Schema(
    {
      
      name: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      emailID: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      bio : {
        type : String,
      },
      phoneNo : {
        type : String,
      },
         isBlocked: {
        type: Boolean,
        default: false,
      },
      imageUrl : String,
      

    
    },
  
    { timestamps: true }
  );
  
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next(); // If password is not modified, move to the next middleware
    }
  
    try {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });
  
  userSchema.statics.login = async function (emailID, password) {
    const user = await this.findOne({ emailID });
    if (!user) throw Error('no such player');
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) throw Error('wrong password');
    return user;
  };
  
  module.exports = mongoose.model('User', userSchema);