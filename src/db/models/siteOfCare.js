const Sequelize = require('sequelize');
const db = require('../db');

const SiteOfCare = db.define(
  'SiteOfCare',
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

module.exports = SiteOfCare;
