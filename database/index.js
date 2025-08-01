const db = require("./db");
const Review = require("./review");
const Restaurant = require("./restaurant");

Review.belongsTo(Restaurant);
Restaurant.hasMany(Review);

module.exports = {
  db,
  Review,
  Restaurant,
};
