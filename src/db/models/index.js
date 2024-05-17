const HealthcareProfessional = require('./healthcareProfessional');
const ProcedureData = require('./procedureData');
const SaleData = require('./saleData');
const SiteOfCare = require('./siteOfCare');

HealthcareProfessional.hasMany(ProcedureData, {
  foreignKey: 'hcp',
});
ProcedureData.belongsTo(HealthcareProfessional, {
  foreignKey: 'hcp',
});

SiteOfCare.hasMany(ProcedureData, {
  foreignKey: 'soc',
});
ProcedureData.belongsTo(SiteOfCare, {
  foreignKey: 'soc',
});

HealthcareProfessional.hasMany(SaleData, {
  foreignKey: 'hcp',
});
SaleData.belongsTo(HealthcareProfessional, {
  foreignKey: 'hcp',
});

SiteOfCare.hasMany(SaleData, {
  foreignKey: 'soc',
});
SaleData.belongsTo(SiteOfCare, {
  foreignKey: 'soc',
});

module.exports = {
  HealthcareProfessional,
  ProcedureData,
  SaleData,
  SiteOfCare,
};
