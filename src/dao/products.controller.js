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
    delete = async (id) => {
        const cleanedId = id.trim(); // Limpia el ID eliminando espacios en blanco y saltos de línea
    
        try {
            const deletedProduct = await Product.findByIdAndDelete(cleanedId); // Elimina el producto
    
            if (!deletedProduct) {
                return { status: "error", message: "Producto no encontrado" };
            }
    
            return { status: "success", message: "Producto eliminado exitosamente" };
        } catch (err) {
            return { status: "error", message: err.message };
        }
    };



    renderProducts = async (req, res) => {
        try {
            const products = await Product.find().lean(); // Obtiene todos los productos
            res.render('products', { products }); // Renderiza la vista products.handlebars con los productos
        } catch (err) {
            res.status(500).json({ status: 'error', message: err.message });
        }
    };

    // Método para obtener todos los productos
    getAllProducts = async () => {
        try {
            return await Product.find().lean(); // Obtiene todos los productos
        } catch (err) {
            throw new Error(err.message);
        }
    }

    // Otras funciones como add, update y delete
}

export default ProductController;
