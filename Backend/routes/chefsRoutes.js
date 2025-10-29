const express = require('express');
const chefController = require('../controllers/chefController');
const router = express.Router();


router.get('/', chefController.list);
router.post('/', chefController.create);
router.put('/assign', chefController.assignToChef);


module.exports = router;