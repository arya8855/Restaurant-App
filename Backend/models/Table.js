const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  tableName: { type: String, required: true },
  tableNumber: { type: Number, required: true ,unique:true},
  tableSize: {
    type: Number,
    enum: [2, 4, 6, 8], 
    required: true,
  },
  flag:{type:Boolean,default:false},
  tableStatus: { type: String, enum: ['A', 'X'], default: 'A' },
}, { timestamps: true });

module.exports = mongoose.model('Table', TableSchema, 'tables');