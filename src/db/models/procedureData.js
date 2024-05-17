const Sequelize = require('sequelize');
const db = require('../db');

const ProcedureData = db.define(
  'ProcedureData',
  {
    volume: {
      type: Sequelize.BIGINT,
    },
  },
  {
    timestamps: true,
  }
);

ProcedureData.getProcedureData = async function () {
  return db.query('SELECT hcp, soc, volume FROM ProcedureData', {
    type: Sequelize.QueryTypes.SELECT,
  });
};

module.exports = ProcedureData;
