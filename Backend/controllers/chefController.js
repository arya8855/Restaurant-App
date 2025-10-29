const Chef = require('../models/Chef');

exports.list = async (req, res) => {
    try {
        const chefs = await Chef.find().lean();
        res.json(chefs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const chef = new Chef(req.body);
        await chef.save();
        res.status(201).json(chef);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.assignToChef = async (req, res) => {
    try {
       
        const chefs = await Chef.find().sort({ currentOrders: 1 }).limit(1);
        if (!chefs.length) return res.status(400).json({ message: 'No chefs available' });
        const chef = chefs[0];
        chef.currentOrders += 1;
        chef.assignedOrderIds.push(req.body.orderId);
        await chef.save();
        res.json(chef);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};  