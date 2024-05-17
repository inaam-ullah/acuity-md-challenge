# AcuityMD Challenge

Thanks for your interest in joining the AcuityMD team. In this challenge, you will be writing a back-end API route for an Express server. The purpose of this challenge is to replicate a real-world working environment and to test a diverse set of skills, to see how you would work with us on our team. The challenge itself is similar to the work you would be doing on our team, but with miminized complexity so it can be completed in the time allotted.

Below is some high level detail about the project. Good luck!

## Project Context

[AcuityMD](https://acuitymd.com/) is a commercial platform built for the medical technology industry. One of the purposes of this platform is to help sales professionals identify target markets. This project contains two important pieces of information:

- The SaleData table contains information about medical devices that were sold to healthcare professionals (HCPs) at various sites of care (SOCs)
- The ProcedureData table contains information about medical procedures that happened by a HCP at a SOC

Both of these datasets will be used in this application to help sales professionals identify target markets.

## Language & Tools

- [NodeJS](https://nodejs.org/en/) - we recommend using v16
- [Yarn](https://yarnpkg.com/) - as a package manager, [here](https://classic.yarnpkg.com/lang/en/docs/install/) are the installation instructions for Yarn
- [Express](https://expressjs.com/) - web framework
- [Sequelize](https://sequelize.org/) and [SQLite](https://www.sqlite.org/) for the database
- [SuperTest](https://github.com/visionmedia/supertest#readme)
- [Jest](https://jestjs.io/)

## Seed data

We've included sample data that the application has been configured to use. For more information on how the database is set up, please reference [Database](#Database).

## Quickstart

This section contains all the information required for getting the server up and running.

### Environment

Create a `.env` file in this directory, and copy the contents from [.env.sample](./.env.sample).

### Installing Dependencies

Install the required dependencies by running `yarn install`

### Run the server

`yarn start` - launches the express server in debug mode (with hot-reloading) on port 8080.

### Testing Routes

#### Example cURL Commands

You can use curl, [postman](https://www.postman.com/), or any browser to test out the API. Here is a curl request to the one of the existing API routes of this project:

```bash
curl --request GET 'localhost:8080/api/sales?limit=2'
```

You can also enter `http://localhost:8080/api/sales?limit=2` into your browser to see the response. This should return the following data if your server is running properly:

```json
[
  {
    "hcp": 0,
    "soc": 0,
    "volume": 15
  },
  {
    "hcp": 0,
    "soc": 91,
    "volume": 15
  }
]
```

### Unit tests

`yarn test` - runs all the tests with [jest](https://jestjs.io/) and [supertest](https://github.com/visionmedia/supertest#readme). These tests just make sure the API is not completely broken and provides you feedback in your pull request to make sure the API is working properly.

### Formatting

`yarn lint` will format your code using [prettier](https://prettier.io/). To ensure you are using the correct version of prettier, make sure to format your code after installing the dependencies (`yarn install`).

## Database

**Note: No database setup should be required to get started with running the project.**

This project uses SQLite, which stores your tables inside a file (`database.db`) for development, and uses an in-memory database for testing. You can inspect the seed data by looking into the [/seed](/seed) folder.

If you would like to reset your database, you can run `yarn seed`.

The project contains helper functions you can use to complete your tasks without writing any SQL or ORM logic:
- [ProcedureData.getProcedureData](../main/src/db/models/procedureData.js) in the models folder returns all the relevant data to fetch from the procedure data table
- [SaleData.getSalesData](../main/src/db/models/saleData.js) in the models folder returns all the relevant data to fetch from the sale data table

## Common Setup Errors

If you are running Windows and run into an error related to `running scripts is disabled on this system` when using `yarn`, see [this page](https://www.nextofwindows.com/fix-unable-to-run-yarn-in-windows-terminal-powershell) for details on how to fix this.
