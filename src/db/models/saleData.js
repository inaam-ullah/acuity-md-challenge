const Sequelize = require('sequelize');
const db = require('../db');

const SaleData = db.define(
  'SaleData',
  {
    volume: {
      type: Sequelize.BIGINT,
    },
  },
  {
    timestamps: true,
  }
);

SaleData.getSalesData = async function () {
  return db.query('SELECT hcp, soc, volume FROM SaleData', {
    type: Sequelize.QueryTypes.SELECT,
  });
};

module.exports = SaleData;
