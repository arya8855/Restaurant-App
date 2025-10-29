const mongoose = require('mongoose');

const dishOrderedSchema = new mongoose.Schema({
    dishId: { type: mongoose.Schema.Types.ObjectId, required: true },
    dishName: { type: String, required: true },
    dishCategory: { type: String, required: true },
    dishPrice: { type: Number, required: true },
    dishPrepTime: { type: Number, required: true },
    dishQuantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerMobileNumber: { type: String, required: true },
    numberOfPeople: { type: Number, required: true },
    dishOrdered: { type: [dishOrderedSchema], required: true },
    orderType: { type: String, enum: ['Dine In', 'Take Away', 'Served'], required: true },
    customerAddress: { type: String, default: null },
    customerCount: { type: Number, default: null },
    orderPrice: { type: Number, required: true },
    orderPrepTime: { type: Number, required: true },
    orderCookingInstructions: { type: String, default: '' },
    orderNumber: { type: Number, required: true },
    orderedTime: { type: Date, default: Date.now },
    table: { type: mongoose.Schema.Types.ObjectId, ref: "Table" }
});

module.exports = mongoose.model('Order', orderSchema, 'orders');