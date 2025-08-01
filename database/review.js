const { DataTypes } = require("sequelize");
const db = require("./db");

const Review = db.define("review", {
  text: {
    type: DataTypes.STRING,
  },
});

module.exports = Review;
