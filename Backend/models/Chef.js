const mongoose = require('mongoose');

const ChefSchema = new mongoose.Schema({
name: { type: String, required: true },
currentOrders: { type: Number, default: 0 },
assignedOrderIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] 
});

module.exports = mongoose.model('Chef', ChefSchema, 'chefs');