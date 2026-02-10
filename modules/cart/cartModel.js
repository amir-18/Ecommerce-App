import mongoose from 'mongoose';
import {Schema,model} from 'mongoose';

const cartItemSchema = Schema.create({
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

const cartItems = Schema.model({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    items : [cartItemSchema],
    {timestamps : true}
});