const db = require("./db");
const Review = require("./review");
const Restaurant = require("./restaurant");
const seed = require("./seed");

Review.belongsTo(Restaurant);
Restaurant.hasMany(Review);

module.exports = {
  db,
  Review,
  Restaurant,
  seed,
};
