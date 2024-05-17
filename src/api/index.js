const express = require('express');

const sales = require('./sales');
const router = express.Router();

router.use('/sales', sales);

module.exports = router;
