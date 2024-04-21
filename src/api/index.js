const express = require('express');
const sales = require('./sales');
const healthcareProfessionals = require('./healthcareProfessionals');
const router = express.Router();

router.use('/sales', sales);
router.use('/healthcare-professionals', healthcareProfessionals);

module.exports = router;
