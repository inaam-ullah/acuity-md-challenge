/* eslint-disable no-console */

const fs = require('fs');

const {
  HealthcareProfessional,
  SiteOfCare,
  ProcedureData,
  SaleData,
} = require('../src/db/models');
const db = require('../src/db');

const rawProcedures = fs.readFileSync('seed/raw/procedureData.json');
const procedures = JSON.parse(rawProcedures);

const rawSales = fs.readFileSync('seed/raw/salesData.json');
const sales = JSON.parse(rawSales);

async function seed() {
  await db.sync({ force: true });

  const healthcareProfessionals = new Set();
  const sitesOfCare = new Set();

  // Create all healthcare professionals and sites of care
  procedures.forEach((procedureJSON) => {
    sitesOfCare.add(procedureJSON.soc);
    healthcareProfessionals.add(procedureJSON.hcp);
  });

  sales.forEach((saleJSON) => {
    sitesOfCare.add(saleJSON.soc);
    healthcareProfessionals.add(saleJSON.hcp);
  });

  const sitesOfCarePromises = [...sitesOfCare].map((soc) =>
    SiteOfCare.create({ id: soc })
  );
  const healthcareProfessionalsPromises = [...healthcareProfessionals].map(
    (hcp) => HealthcareProfessional.create({ id: hcp })
  );

  try {
    console.log(`- ${sitesOfCarePromises.length} sitesOfCare`);
    await Promise.all(sitesOfCarePromises);
    console.log(
      `- ${healthcareProfessionalsPromises.length} healthcareProfessionals`
    );
    await Promise.all(healthcareProfessionalsPromises);
  } catch (error) {
    console.log('error', error);
  }

  // Create procedure and sales data
  console.log(`- ${procedures.length} procedures`);
  for (const procedureJSON of procedures) {
    try {
      const procedure = await ProcedureData.create({
        volume: procedureJSON.volume,
      });
      await procedure.setHealthcareProfessional(procedureJSON.hcp);
      await procedure.setSiteOfCare(procedureJSON.soc);
    } catch (error) {
      console.log('error', error);
    }
  }

  console.log(`- ${sales.length} sales`);
  for (const saleJSON of sales) {
    try {
      const sale = await SaleData.create({
        volume: saleJSON.volume,
      });
      await sale.setHealthcareProfessional(saleJSON.hcp);
      await sale.setSiteOfCare(saleJSON.soc);
    } catch (error) {
      console.log('error', error);
    }
  }

  console.log('seeded all data');
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = { runSeed };
