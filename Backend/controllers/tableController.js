const Table = require('../models/Table');
const mongoose = require('mongoose');

//Get all tables
exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.find().select('-__v').sort({ tableNumber: 1 });
    res.status(200).json({
      success: true,
      count: tables.length,
      data: tables,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tables',
      error: error.message,
    });
  }
};

//Create a new table
exports.createTable = async (req, res) => {
  try {
    const { tableName, tableNumber, tableSize } = req.body;

    if (!tableName || !tableNumber || !tableSize) {
      return res.status(400).json({
        success: false,
        message: 'tableName, tableNumber, and tableSize are required',
      });
    }

    //Check if tableNumber already exists
    const existingTable = await Table.findOne({ tableNumber });
    if (existingTable) {
      return res.status(400).json({
        success: false,
        message: `Table number ${tableNumber} already exists`,
      });
    }

    const newTable = new Table({
      tableName,
      tableNumber,
      tableSize,
    });

    const savedTable = await newTable.save();

    res.status(201).json({
      success: true,
      message: 'Table created successfully',
      data: savedTable,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating table',
      error: error.message,
    });
  }
};

//Delete a table
exports.deleteTable = async (req, res) => {
  try {
    const tableId = req.params.id;

    if (!mongoose.isValidObjectId(tableId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid table ID format',
      });
    }

    const table = await Table.findByIdAndDelete(tableId);

    if (!table) {
      return res.status(404).json({
        success: false,
        message: 'Table not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Table deleted successfully',
      data: table,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting table',
      error: error.message,
    });
  }
};

//Update table status (Available / Booked)
exports.updateTableStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { tableStatus } = req.body;

    if (!['A', 'X'].includes(tableStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid tableStatus value. Use A (available) or X (booked).',
      });
    }

    const updatedTable = await Table.findByIdAndUpdate(
      id,
      { tableStatus },
      { new: true }
    );

    if (!updatedTable) {
      return res.status(404).json({
        success: false,
        message: 'Table not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Table status updated successfully',
      data: updatedTable,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating table status',
      error: error.message,
    });
  }
};
