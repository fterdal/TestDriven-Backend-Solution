const { DataTypes } = require("sequelize");
const db = require("./db");

const Restaurant = db.define("restaurant", {
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = Restaurant;
