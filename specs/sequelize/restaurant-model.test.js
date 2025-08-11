const { db, Restaurant, Review } = require("../../database");

describe("Restaurant Model", () => {
  const restaurants = [
    {
      name: "Tony's Pizza",
      location: "123 Main St",
      cuisine_type: "Italian",
      price_range: 2,
      open_since: "09:00:00",
    },
    {
      name: "Ramen House",
      location: "456 Oak Ave",
      cuisine_type: "Japanese",
      price_range: 3,
      open_since: "11:00:00",
    },
    {
      name: "Shawarma Palace",
      location: "789 Pine Rd",
      cuisine_type: "Middle Eastern",
      price_range: 1,
      open_since: "10:00:00",
    },
  ];

  beforeEach(async () => {
    try {
      await db.sync({ force: true });

      await Restaurant.bulkCreate(restaurants);
    } catch (error) {
      console.error("Error seeding database for tests:", error.message);
      console.log(error);
    }
  });

  it.only("should have a name", async () => {
    const restaurant = await Restaurant.findByPk(1);

    expect(restaurant.name).toBe(restaurants[0].name);
  });

  it("should have a location", async () => {
    const restaurant = await Restaurant.findByPk(1);

    expect(restaurant.location).toBe(restaurants[0].location);
  });

  it("should have a cuisine type", async () => {
    const restaurant = await Restaurant.findByPk(1);

    expect(restaurant.cuisine_type).toBe(restaurants[0].cuisine_type);
  });

  it("should have a price range between 1 and 4", async () => {
    const restaurant = await Restaurant.findByPk(1);

    expect(restaurant.price_range).toBe(restaurants[0].price_range);
    expect(restaurant.price_range).toBeGreaterThanOrEqual(1);
    expect(restaurant.price_range).toBeLessThanOrEqual(4);
  });

  it("should have an open since time", async () => {
    const restaurant = await Restaurant.findByPk(1);

    expect(restaurant.open_since).toBe(restaurants[0].open_since);
  });

  it("should validate price_range is within valid range", async () => {
    const invalidRestaurant = Restaurant.build({
      name: "Test Restaurant",
      location: "Test Location",
      cuisine_type: "Test Cuisine",
      price_range: 5, // Invalid: should be 1-4
      open_since: "12:00:00",
    });

    await expect(invalidRestaurant.validate()).rejects.toThrow();
  });

  it("should validate price_range minimum value", async () => {
    const invalidRestaurant = Restaurant.build({
      name: "Test Restaurant",
      location: "Test Location",
      cuisine_type: "Test Cuisine",
      price_range: 0, // Invalid: should be 1-4
      open_since: "12:00:00",
    });

    await expect(invalidRestaurant.validate()).rejects.toThrow();
  });

  it("should require all required fields", async () => {
    const incompleteRestaurant = Restaurant.build({
      name: "Test Restaurant",
      // Missing required fields: price_range, open_since
    });

    await expect(incompleteRestaurant.validate()).rejects.toThrow();
  });
});
