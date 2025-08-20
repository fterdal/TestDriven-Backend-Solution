const { db, Review, Restaurant } = require("./index");

const seed = async () => {
  db.logging = false;
  await db.sync({ force: true }); // Drop and recreate tables
  const reviews = await Review.bulkCreate([
    { text: "This is a review" },
    { text: "This is another review" },
    { text: "This is a third review" },
  ]);

  console.log(`💬 Created ${reviews.length} reviews`);

  const restaurants = await Restaurant.bulkCreate([
    {
      name: "Tony's Pizza",
    },
    {
      name: "Ramen House",
    },
    {
      name: "Shawarma Palace",
    },
  ]);

  await reviews[0].setRestaurant(restaurants[0]);
  await reviews[1].setRestaurant(restaurants[1]);
  await reviews[2].setRestaurant(restaurants[2]);

  console.log(`🍔 Created ${restaurants.length} restaurants`);

  console.log("🌱 Seeded the database");
  db.close();
};

if (require.main === module) {
  seed();
}

module.exports = seed;
