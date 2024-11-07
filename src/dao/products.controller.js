// src/dao/products.controller.js
import Product from './models/products.model.js'; // Asegúrate de que la ruta sea correcta

/**
 * Controlador para manejar operaciones CRUD en productos
 */
class ProductController {
    constructor() {}

    /**
     * GET: Obtiene todos los productos
     */
    get = async () => {
        try {
            return await Product.find().lean(); // lean devuelve objetos planos
        } catch (err) {
            return { status: 'error', message: err.message };
        }
    }

    /**
     * POST: Agrega un nuevo producto
     * @param {Object} data - Datos del producto a crear
     */
    add = async (data) => {
        try {
            return await Product.create(data);
        } catch (err) {
            return { status: 'error', message: err.message };
        }
    }

    /**
     * PUT: Actualiza un producto
     * @param {Object} req - Objeto de la solicitud que contiene los parámetros y el cuerpo
     * @param {Object} res - Objeto de respuesta para enviar respuestas HTTP
     */
    update = async (req, res) => {
        const { id } = req.params; // Obtiene el ID desde los parámetros de la URL
        const { status, payload } = req.body; // Obtiene los nuevos datos del cuerpo de la solicitud

        const options = { new: true, runValidators: true }; // Devuelve el documento actualizado y valida los campos

        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, { status, payload }, options);

            if (!updatedProduct) {
                return res.status(404).json({ status: "error", message: "Producto no encontrado" });
            }

            return res.status(200).json({ status: "success", payload: updatedProduct });
        } catch (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
    };

    /**
     * DELETE: Elimina un producto por su ID
     * @param {Object} req - Objeto de la solicitud que contiene los parámetros y el cuerpo
     * @param {Object} res - Objeto de respuesta para enviar respuestas HTTP
     */
    delete = async (req, res) => {
        const { id } = req.params; // Obtiene el ID desde los parámetros de la URL
        const cleanedId = id.trim(); // Limpia el ID eliminando espacios en blanco y saltos de línea
    
        try {
            const deletedProduct = await Product.findByIdAndDelete(cleanedId); // Elimina el producto
    
            if (!deletedProduct) {
                return res.status(404).json({ status: "error", message: "Producto no encontrado" });
            }
    
            return res.status(200).json({ status: "success", message: "Producto eliminado exitosamente" });
        } catch (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
    };



    async getAllProducts() {
        try {
            return await Product.find().lean(); // Devuelve directamente los productos planos
        } catch (err) {
            throw new Error(err.message);
        }
    }
    
    async renderProducts(req, res) {
        try {
            const products = await this.getAllProducts(); // Llama a `getAllProducts()` que devuelve un array de productos
            res.render('productos', { products }); // Pasa `products` directamente a la vista
            console.log(products)
        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).send('Error al obtener los productos');
        }
    }

    // Otras funciones como add, update y delete
}

export default ProductController;
