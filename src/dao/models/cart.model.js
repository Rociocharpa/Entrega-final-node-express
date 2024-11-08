import mongoose from 'mongoose';

mongoose.pluralize(null);

const collection = 'cart';

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },  // Asegúrate de que este campo esté bien configurado
      quantity: { type: Number, default: 1 }
    }]
  });


const CartModel = mongoose.model(collection, schema);

export default CartModel;
