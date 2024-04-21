const express = require('express');
const { SaleData, ProcedureData } = require('../db/models');
const { query, validationResult } = require('express-validator');

const router = express.Router();

/**
 * Combine sales and procedure data into a unified structure.
 * @param {array} salesData - Array of sales data
 * @param {array} procedureData - Array of procedure data
 * @returns {object} - Combined data structure
 */
const combineSalesAndProcedures = (salesData, procedureData) => {
  const hcpData = {};

  salesData.forEach(sale => {
    const key = `${sale.hcp}-${sale.soc}`;
    if (!hcpData[key]) {
      hcpData[key] = { hcp: sale.hcp, soc: sale.soc, sales: 0, procedures: 0 };
    }
    hcpData[key].sales = sale.volume;
  });

  procedureData.forEach(proc => {
    const key = `${proc.hcp}-${proc.soc}`;
    if (!hcpData[key]) {
      hcpData[key] = { hcp: proc.hcp, soc: proc.soc, sales: 0, procedures: 0 };
    }
    hcpData[key].procedures = proc.volume;
  });

  return hcpData;
};

/**
 * Calculate the "elephant" strategy score
 * @param {object} hcpData - Combined HCP data with sales and procedure volumes
 * @returns {array} - Array of HCPs with their gap scores
 */
const calculateElephantStrategy = (hcpData) => {
  return Object.values(hcpData)
    .map(hcp => ({ hcp: hcp.hcp, gap: hcp.procedures - hcp.sales }))
    .sort((a, b) => b.gap - a.gap || a.hcp - b.hcp);
};

/**
 * Validate query parameters and handle errors.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {boolean} - Returns true if validation errors are found, false otherwise
 */
const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return true;
  }
  return false;
};

/**
 * GET /api/healthcare-professionals/top
 * @summary Returns the top healthcare professionals based on the strategy
 * @param {number} limit.query.required - the number of top HCPs to return
 * @param {string} strategy.query.optional - the strategy to use (default is "elephant")
 * @return {array<object>} 200 - returns an array of top HCPs
 * @return {object} 400 - validation errors from the input parameters
 */
router.get(
  '/top',
  query('limit', 'Limit is a required query param').exists(),
  query('limit', 'Limit must be an int').isInt(),
  query('strategy', 'Invalid strategy').optional().isIn(['elephant']),
  
  async (req, res, next) => {
    if (handleValidationErrors(req, res)) return;

    try {
      const { limit, strategy = 'elephant' } = req.query;
      const salesData = await SaleData.getSalesData();
      const procedureData = await ProcedureData.getProcedureData();

      if (strategy !== 'elephant') {
        return res.status(400).json({ error: 'Invalid strategy parameter' });
      }

      const hcpData = combineSalesAndProcedures(salesData, procedureData);
      const results = calculateElephantStrategy(hcpData);

      res.status(200).json(results.slice(0, parseInt(limit, 10)));
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
