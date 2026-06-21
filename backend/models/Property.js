// backend/models/Property.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    area: { type: String, required: true },
    division: { type: String, required: true },
    rent: { type: Number, required: true },
    bedroom: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    imageUrl: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);