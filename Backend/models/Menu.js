const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  dishName: { 
    type: String, 
    required: true 
},
  dishPrice: { 
    type: Number, 
    required: true 
},
  dishPrepTime: { type: Number, required: true },
  dishCategory: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model('Dish', menuSchema, 'dishes');