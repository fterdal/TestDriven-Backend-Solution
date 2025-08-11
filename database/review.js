const { DataTypes } = require("sequelize");
const db = require("./db");

/**
 * text: string
 * rating: number (1-5)
 * reviewer_name: string
 * visit_date: date
 */
const Review = db.define("review", {
  text: {
    type: DataTypes.STRING,
  },
});

module.exports = Review;
