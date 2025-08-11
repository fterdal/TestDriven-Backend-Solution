const { DataTypes } = require("sequelize");
const db = require("./db");

/**
 * name: string
 * location: string
 * cuisine_type: string
 * price_range: number (1-4 dollar signs)
 * open_since: date only
 */
const Restaurant = db.define("restaurant", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
  },
  cuisine_type: {
    type: DataTypes.STRING,
  },
  price_range: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 4,
    },
  },
  open_since: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

module.exports = Restaurant;
