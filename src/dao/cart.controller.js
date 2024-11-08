import CartModel from "./models/cart.model.js";
import productModel from "./models/products.model.js";

class CartController {
  constructor() {}

    // Método para agregar un producto al carrito
    async addProductToCart(req, res) {
      const { productId, cartId } = req.body;
      try {
          // Verifica si el producto existe
          const product = await productModel.findById(productId);
          if (!product) {
              return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
          }
  
          // Busca el carrito por ID
          let cart = await CartModel.findById(cartId);
          
          // Si no se encuentra el carrito, lo crea
          if (!cart) {
              cart = new CartModel({ _id: cartId, items: [] });
              await cart.save(); // Guarda el carrito recién creado
          }
  
          // Verifica si el producto ya está en el carrito
          const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
          if (productIndex === -1) {
              cart.items.push({ productId, quantity: 1 });
          } else {
              cart.items[productIndex].quantity += 1;
          }
  
          // Guarda el carrito con el producto agregado
          await cart.save();
          return res.status(200).json({ status: 'success', message: 'Producto agregado al carrito', cart });
      } catch (error) {
          console.error('Error interno:', error);
          return res.status(500).json({ status: 'error', message: 'Error al agregar producto al carrito', error: error.message });
      }
    }

    // Método para obtener el carrito del usuario
    async getCart(req, res) {
        const { userId } = req.params;

        try {
            const cart = await CartModel.findOne({ userId }).populate('items.productId');
            if (!cart) {
                return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
            }
            return res.status(200).json({ status: 'success', cart });
        } catch (error) {
            return res.status(500).json({ status: 'error', message: 'Error al obtener el carrito', error: error.message });
        }
    }

    // Método para eliminar un producto del carrito
    async removeProductFromCart(req, res) {
        const { userId, productId } = req.body;

        try {
            const cart = await CartModel.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
            }

            const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (productIndex === -1) {
                return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
            }

            cart.items.splice(productIndex, 1);
            await cart.save();
            return res.status(200).json({ status: 'success', message: 'Producto eliminado del carrito', cart });
        } catch (error) {
            return res.status(500).json({ status: 'error', message: 'Error al eliminar producto del carrito', error: error.message });
        }
    }
}

export default CartController;
