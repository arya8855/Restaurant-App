const express = require('express');
const router = express.Router();
const { getAllTables, deleteTable, createTable, updateTableStatus } = require('../controllers/tableController');

router.get('/', getAllTables);
router.delete('/:id', deleteTable);
router.post('/', createTable);
router.put('/:id/status', updateTableStatus);

module.exports = router;