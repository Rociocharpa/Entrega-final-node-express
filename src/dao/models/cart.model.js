import mongoose from 'mongoose';

mongoose.pluralize(null);

const collection = 'cart';

const schema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 } 
});


const CartModel = mongoose.model(collection, schema);

export default CartModel;
