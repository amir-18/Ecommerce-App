import mongoose from "mongoose";
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",       // links to the user who placed the order
    required: true
  },
  stripe_id : {
    type : String,
    required : true
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product", // links to the product
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
        required: true
      },
      price: {                
        type: Number,
        required: true    // store price at order time
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  shippingAddress: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "card", "paypal"], // simple example
    default: "cash"
  }
}, { timestamps: true });

const orderModel = model('Order',orderSchema);

export default orderModel;