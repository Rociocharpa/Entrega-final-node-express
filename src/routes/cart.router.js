import {Router} from 'express';
import CartController from '../dao/cart.controller.js';

const router = Router();
const cartController = new CartController();

// Ruta para agregar un producto al carrito
router.post('/add', cartController.addProductToCart);

// Ruta para obtener el carrito de un usuario
router.get('/:userId', cartController.getCart);

// Ruta para eliminar un producto del carrito
router.delete('/remove', cartController.removeProductFromCart);

export default router;