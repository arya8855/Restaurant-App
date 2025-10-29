const mongoose = require('mongoose');
const Order = require('../models/Order');
const Chef = require('../models/Chef');
const Table = require('../models/Table');

exports.placeOrder = async (req, res) => {
  try {
    const {
      customerName,
      numberOfPeople,
      customerAddress,
      customerMobileNumber,
      orderType,
      orderPrepTime,
    } = req.body;

    let bookedTable = null;
    let assignedChef = null;
    let newOrder = null;

    //If Dine In, assign a table
    if (orderType === 'Dine In' || orderType === 'dine In') {
      const tableRanges = [
        { min: 1, max: 2, size: 2 },
        { min: 3, max: 4, size: 4 },
        { min: 5, max: 6, size: 6 },
        { min: 7, max: 8, size: 8 },
      ];

      const range = tableRanges.find(
        (r) => numberOfPeople >= r.min && numberOfPeople <= r.max
      );
      if (!range) {
        return res.status(400).json({
          status: "fail",
          message: "We cannot accommodate more than 8 people at a single table",
        });
      }

      bookedTable = await Table.findOne({ tableSize: range.size, flag: false });

      if (!bookedTable) {
        const largerSizes = [2, 4, 6, 8].filter((s) => s > range.size);
        for (let size of largerSizes) {
          bookedTable = await Table.findOne({ tableSize: size, flag: false });
          if (bookedTable) break;
        }
      }

      if (!bookedTable) {
        return res.status(200).json({
          status: "fail",
          message: `No table available for ${numberOfPeople} people`,
        });
      }

      bookedTable.flag = true;
      await bookedTable.save();
    }

    // Assign a chef (for all orders)
    const orderCount = await Order.countDocuments();
    const orderNumber = orderCount + 1;
    const chefs = await Chef.find().sort({ currentOrders: 1 });

    if (!chefs || chefs.length === 0) {
      return res.status(500).json({ error: "No chefs available" });
    }

    const leastOrders = chefs[0].currentOrders;
    const leastBusyChefs = chefs.filter(c => c.currentOrders === leastOrders);
    assignedChef = leastBusyChefs[Math.floor(Math.random() * leastBusyChefs.length)];

    //Create new order (DineIn or TakeAway)
    newOrder = new Order({
      ...req.body,
      orderNumber,
      bookedTable,
      chefName: assignedChef.name,
    });

    await newOrder.save();

    assignedChef.currentOrders += 1;
    await assignedChef.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
      assignedChef: assignedChef.name,
    });

  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({
      error: "Failed to place order",
      details: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching orders',
      error: error.message,
    });
  }
};
