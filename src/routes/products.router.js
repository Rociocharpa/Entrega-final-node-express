// src/routes/products.router.js
import { Router } from 'express';
import ProductController from '../dao/products.controller.js';

const router = Router();
const productController = new ProductController();

// Ruta para obtener la vista de productos
router.get('/views', async (req, res) => {
    try {
        const products = await productController.getAllProducts();
        res.render('products', { products });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Ruta de búsqueda
router.get('/search', async (req, res) => {
    const { search } = req.query;  // Obtener el término de búsqueda de la URL
    try {
        // Llamar a la función de búsqueda del controlador
        const products = await productController.searchProducts(req.query);  
        res.render('products', { products });  // Renderizar la vista con los productos encontrados
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al buscar productos');
    }
});


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
