import mongoose from "mongoose";
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
  cartItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product", // reference to Product model
    },
  ],
}, { timestamps: true }); // optional but good practice

export default model("User", userSchema);
