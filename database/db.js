const { Sequelize } = require("sequelize");
const pg = require("pg");

const NODE_ENV = process.env.NODE_ENV || "development";
const dbName =
  NODE_ENV === "test" ? "restaurant-reviewer-test" : "restaurant-reviewer";

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
  {
    logging: false, // comment this line to enable logging
  }
);

module.exports = db;
