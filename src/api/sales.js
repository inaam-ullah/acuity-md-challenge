const router = require('express').Router();
const { SaleData } = require('../db/models');
const { query, validationResult } = require('express-validator');

/**
 * GET /api/sales
 * @summary Returns the sales data from the database
 * @param {number} limit.query.required - the number of records to return of sales data
 * @return {array<object>} 200 - returns an array of sales data
 * @return {object} 400 - validation errors from the input parameters
 */
router.get(
  '/',
  query('limit', 'Limit is a required query param').exists(),
  query('limit', 'Limit must be an int').optional().isInt(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { limit } = req.query;
      const allSales = await SaleData.getSalesData();
      return res.json(allSales.slice(0, limit));
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
