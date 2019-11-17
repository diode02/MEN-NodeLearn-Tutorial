const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//for creating a chema AND SETTTING UP MIDDLE WARE for hashing
const newSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    useCreateIndex: true,
    lowercase: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value))
        throw new Error('Email is invalid')
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be positie number')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password can not contain  \'passowrd\'');
      }
    }
  },
  tokens: [{
    token: {
      type : String,
      required: true
    }
  }]
})

newSchema.methods.generateAuthToken = async function (){
    const token =  jwt.sign({_id: this._id.toString()}, 'wannaachangeit');
    this.tokens = this.tokens.concat({token})
    await this.save();
    return token;
}

newSchema.statics.checkCradentials = async (email, password) => {
  const user = await Users.findOne({ email });
  if (!user)
    throw new Error('Unable To Login');

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch)
    throw new Error('Unable To Login');

  return user;
}

newSchema.pre('save', async function (next) {
  if (this.isModified('password'))
    this.password = await bcryptjs.hash(this.password, 8);
  next();
})

const Users = mongoose.model('User', newSchema)

module.exports = { Users }