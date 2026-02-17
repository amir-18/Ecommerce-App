import cartModel from "./cartModel.js";

export const addToCart = async (userid,productid,quantity) => {
    const Cart = await cartModel.findOne({user : userid});

    if(!Cart){
        const Cart = await cartModel.create({
            user : userid,
            items : [{product : productid, quantity : quantity}]
        });
        Cart.save();
        console.log(Cart);
        return Cart;
    };

    const itemIndex = Cart.items.findIndex(item => item.product.toString() === productid);

    if(itemIndex > -1){
        Cart.items[itemIndex].quantity += Number(quantity);
        
         console.log("Increased the Quantity");
    }
    else{
        Cart.items.push({product : productid, quantity : quantity});
       
    };
    await Cart.save();
    return Cart;
};

export const removeFromCart = async (productid,userid) => {
    const deletedCart = await cartModel.findOneAndUpdate(
{user : userid},
{$pull :
     {items : {product : productid}}},
{new : true}
    );
    if(!deletedCart){
        throw new Error('Cart Item Cant Be Removed');
    }

    return deletedCart;
};

export const getCartItems = async (userid) => {
    const cartItems = await cartModel.find({user : userid}).populate('items');
    return cartItems;
}