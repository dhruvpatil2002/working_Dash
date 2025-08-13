const { timeStamp } = require('console');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true,
    lowercase:true,
    trim:true,
    isActive:Boolean

  },
  email:    { type: String, required: true, 
    lowercase:true,
    unique: true,
    trim:true,
    
  },
  password: { type: String, required: [true,"password is required"] ,
    trim:true,
    
  },
  
  
},{
    timestamps:true
}
);

module.exports = mongoose.model('User', userSchema);