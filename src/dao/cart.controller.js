import CartModel from "./models/cart.model";
import model from "./models/products.model"; 

// Agregar un producto al carrito
export const addProductToCart = async (req, res) => {
    const { userId, productId } = req.body; // Suponiendo que userId y productId se envían en el cuerpo de la solicitud
  
    try {
      // Verificar que el producto exista
      const product = await model.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      // Buscar el carrito del usuario
      let cart = await CartModel.findOne({ userId });
  
      if (!cart) {
        // Si el carrito no existe, crear uno nuevo
        cart = new CartModel({ userId, items: [] });
      }
  
      // Verificar si el producto ya está en el carrito
      const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
  
      if (productIndex === -1) {
        // Si el producto no está en el carrito, agregarlo
        cart.items.push({ productId, quantity: 1 });
      } else {
        // Si el producto ya está, incrementar la cantidad
        cart.items[productIndex].quantity += 1;
      }
  
      await cart.save();
      res.status(200).json({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
      res.status(500).json({ message: 'Error al agregar producto al carrito', error });
    }
  };
  
  // Obtener los productos del carrito
  export const getCart = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const cart = await CartModel.findOne({ userId }).populate('items.productId');
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
  };
  
  // Eliminar un producto del carrito
  export const removeProductFromCart = async (req, res) => {
    const { userId, productId } = req.body;
  
    try {
      const cart = await CartModel.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
  
      const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (productIndex === -1) {
        return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
      }
  
      // Eliminar el producto del carrito
      cart.items.splice(productIndex, 1);
      await cart.save();
  
      res.status(200).json({ message: 'Producto eliminado del carrito', cart });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar producto del carrito', error });
    }
  };