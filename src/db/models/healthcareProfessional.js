const Sequelize = require('sequelize');
const db = require('../db');

const HealthcareProfessional = db.define(
  'HealthcareProfessional',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = HealthcareProfessional;
