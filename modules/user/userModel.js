import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  role : {
    type : String,
    enum : ['User','Admin'],
    default : 'User',
  },
  email: {
    type: String, // Capital S
    required: true,
    unique: true, // good practice
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
}, { timestamps: true }); // optional but good practice

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {_id : this._id, role : this.role, username : this.username},
    process.env.JWT_SECRET,
    { expiresIn: '7d'}
  );
  return token;
}

const userModel = model('User',userSchema);

export default userModel;