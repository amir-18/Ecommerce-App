import cartModel from "./cartModel.js";

export const addToCart = async (userid,productid,quantity) => {
    const existingCart = await cartModel.user.find({userid});

    if(!existingCart){
        const Cart = await cartModel.create({
            user : userid,
            items : {product : productid,quantity : quantity}
        });
        Cart.save();
        console.log(Cart);
        return Cart;
    }
}