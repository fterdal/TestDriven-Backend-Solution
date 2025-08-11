const { db, Restaurant, Review } = require("../../database");

describe("Restaurant Model", () => {
  const restaurants = [
    {
      name: "Tony's Pizza",
      location: "123 Main St",
      cuisine_type: "Italian",
      price_range: 2,
      open_since: "2025-01-01",
    },
    {
      name: "Ramen House",
      location: "456 Oak Ave",
      cuisine_type: "Japanese",
      price_range: 3,
      open_since: "2025-01-01",
    },
    {
      name: "Shawarma Palace",
      location: "789 Pine Rd",
      cuisine_type: "Middle Eastern",
      price_range: 1,
      open_since: "2025-01-01",
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

  it("should have a name", async () => {
    const restaurant = await Restaurant.findByPk(1);

    expect(restaurant.name).toBe(restaurants[0].name);
  });

  it("requires a name", async () => {
    const restaurant = Restaurant.build({
      location: "123 Main St",
      cuisine_type: "Italian",
      price_range: 2,
      open_since: "2025-01-01",
    });

    await expect(restaurant.validate()).rejects.toThrow();
  });

  it("should have a location", async () => {
    const restaurant = await Restaurant.findByPk(1);

    expect(restaurant.location).toBe(restaurants[0].location);
  });

  it("should have a cuisine type", async () => {
    const restaurant = await Restaurant.findByPk(1);

    expect(restaurant.cuisine_type).toBe(restaurants[0].cuisine_type);
  });

  it("should have a price range", async () => {
    const restaurant = await Restaurant.findByPk(1);

    expect(restaurant.price_range).toBe(restaurants[0].price_range);
  });

  it("should have an open since date", async () => {
    const restaurant = await Restaurant.findByPk(1);

    expect(restaurant.open_since).toBe(restaurants[0].open_since);
  });

  it("should validate price_range is within valid range", async () => {
    const invalidRestaurantAbove = Restaurant.build({
      name: "Test Restaurant Above",
      location: "Test Location",
      cuisine_type: "Test Cuisine",
      price_range: 5,
      open_since: "2025-01-01",
    });

    await expect(invalidRestaurantAbove.validate()).rejects.toThrow();

    const invalidRestaurantBelow = Restaurant.build({
      name: "Test Restaurant Below",
      location: "Test Location",
      cuisine_type: "Test Cuisine",
      price_range: 0,
      open_since: "2025-01-01",
    });

    await expect(invalidRestaurantBelow.validate()).rejects.toThrow();

    const validRestaurant = Restaurant.build({
      name: "Test Restaurant",
      location: "Test Location",
      cuisine_type: "Test Cuisine",
      price_range: 2,
      open_since: "2025-01-01",
    });

    await expect(validRestaurant.validate()).resolves.not.toThrow();
  });
});
