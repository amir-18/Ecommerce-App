import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String, // optional: can create a Category model later
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  images: [
    {
      type: String, // URL or file path
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User", // optional: track which admin added this product
  },
}, { timestamps: true });

const productModel = model('Product', productSchema);
export default productModel;