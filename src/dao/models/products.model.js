// src/models/Product.js
import mongoose from 'mongoose';

mongoose.pluralize(null);

const collection = 'products';

const schema = new mongoose.Schema({
    status: { type: String, enum: ['success', 'error'], required: true },
    payload: {
        type: [
            {
                name: { type: String, required: true },
                price: { type: Number, required: true },
                description: String,
                stock: { type: Number, default: 0 },
            },
        ],
        required: true,
    },
    totalPages: { type: Number, required: true },
    prevPage: { type: Number, default: null },
    nextPage: { type: Number, default: null },
    page: { type: Number, required: true },
    hasPrevPage: { type: Boolean, required: true },
    hasNextPage: { type: Boolean, required: true },
    prevLink: { type: String, default: null },
    nextLink: { type: String, default: null },
});

const model = mongoose.model(collection, schema);

export default model;
