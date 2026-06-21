const Property = require('../models/Property');

exports.createProperty = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Image is required' });
        
        const newProperty = new Property({
            ...req.body,
            imageUrl: req.file.path, // URL returned from Cloudinary
            owner: req.user.id       // Set by auth middleware
        });

        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProperties = async (req, res) => {
    try {
        const filters = {};
        if (req.query.division) filters.division = req.query.division;
        if (req.query.category && req.query.category !== 'All') filters.category = req.query.category;

        const properties = await Property.find(filters).sort({ createdAt: -1 });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('owner', 'fullName email');
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ error: 'Invalid Property ID' });
    }
};