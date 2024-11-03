// src/app.js
import express from 'express';
import mongoose from 'mongoose';
import productsRouter from './routes/products.router.js'; // Asegúrate de que la ruta sea correcta
import config from './config.js';
import { engine } from 'express-handlebars';
import path from 'path'; // Asegúrate de importar 'path'

const app = express();

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(process.cwd(), 'src', 'views')); // Asegúrate de que la ruta sea correcta

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productsRouter); // Asegúrate de que esta línea esté presente

// Ruta para renderizar la vista de productos
app.get('/views/products', async (req, res) => {
    try {
        const products = await productsController.getAllProducts(); // Llama al controlador para obtener productos
        res.render('products', { payload: products }); // Pasa los productos a la vista
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Conexión a la base de datos y inicio del servidor
const httpServer = app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGODB_URI);
    console.log(`Server activo en puerto ${config.PORT} conectado a bbdd`);
});
