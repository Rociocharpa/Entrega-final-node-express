// src/routes/products.router.js
import { Router } from 'express';
import ProductController from '../dao/products.controller.js';

const router = Router();
const productController = new ProductController();

// Ruta para obtener la vista de productos
router.get('/views', productController.renderProducts); 


router.get('/', async (req, res) => {
    const result = await productController.get();
    res.status(200).json(result);
});

router.post('/', async (req, res) => {
    const result = await productController.add(req.body);
    res.status(201).json(result);
});

router.put('/:id', productController.update);


router.delete('/:id', (req, res) => {
    productController.delete(req, res); // `delete` ya maneja la respuesta
});


export default router;
