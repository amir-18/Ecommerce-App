import mongoose from 'mongoose';
import {Schema,model} from 'mongoose';

const cartItemSchema = new Schema({
    product : {
        type : Schema.Types.ObjectId,
        ref : 'Product',
        required : true,
    },
    quantity : {
        type : Number,
        min : 1,
        default : 1
    }
}, {_id : false}); // THIS WILL PREVENT THE SAME PRODUCT ID ENTERING TWICE

const cartItems = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    items : [cartItemSchema],
}, {timestamps : true});

const cartModel = model('Cart',cartItems);
export default cartModel;   