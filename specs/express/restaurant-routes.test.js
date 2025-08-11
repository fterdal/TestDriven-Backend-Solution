const request = require("supertest");
const apiRouter = require("../../api");
const express = require("express");
const { db, Restaurant, Review } = require("../../database");

describe("Restaurant Routes", () => {
  let app;

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
      app = express();
      app.use(express.json());
      app.use("/api", apiRouter);
    } catch (error) {
      console.error("Error seeding database for tests:", error.message);
      console.log(error);
    }
  });

  // TIER 1: GET ALL
  it("should return all restaurants", async () => {
    const response = await request(app).get("/api/restaurants");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(restaurants.length);
    const responseNames = response.body.map((restaurant) => restaurant.name);
    const expectedNames = restaurants.map((restaurant) => restaurant.name);
    expect(responseNames).toEqual(expectedNames);
  });

  // TIER 2: GET ONE
  it("should return a single restaurant", async () => {
    const response = await request(app).get("/api/restaurants/2");
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Ramen House");
  });

  // TIER 2.5: GET REVIEWS
  // NOTE: You'll need to finish the Review model and associate the reviews to the restaurants first
  describe("Reviews", () => {
    const reviews = [
      {
        rating: 5,
        text: "Great food!",
        reviewer_name: "John Doe",
        visit_date: "2024-01-01",
        restaurantId: 1,
      },
      {
        rating: 4,
        text: "Good experience",
        reviewer_name: "Jane Smith",
        visit_date: "2024-02-01",
        restaurantId: 1,
      },
    ];

    beforeEach(async () => {
      const createdRestaurants = await Restaurant.bulkCreate(restaurants);
      const createdReviews = await Review.bulkCreate(reviews);
    });
    it("should return all reviews for a restaurant", async () => {
      const response = await request(app).get("/api/restaurants/1/reviews");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });
  });

  // TIER 3: CREATE
  it("should create a new restaurant", async () => {
    const newRestaurant = {
      name: "Test Restaurant",
      location: "Test Location",
      cuisine_type: "Test Cuisine",
      price_range: 2,
      open_since: "12:00:00",
    };
    const response = await request(app)
      .post("/api/restaurants")
      .send(newRestaurant);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newRestaurant.name);
  });

  // TIER 4: DELETE
  it("should delete a restaurant", async () => {
    const response = await request(app).delete("/api/restaurants/1");
    expect(response.status).toBe(204);
    const allRestaurants = await Restaurant.findAll();
    expect(allRestaurants.length).toBe(restaurants.length - 1);
  });

  // TIER 5: UPDATE
  it("should update a restaurant", async () => {
    const restaurantUpdates = { name: "Updated Restaurant" };
    const response = await request(app)
      .patch("/api/restaurants/1")
      .send(restaurantUpdates);
    expect(response.status).toBe(204);
    const updatedRestaurant = await Restaurant.findByPk(1);
    expect(updatedRestaurant.name).toBe(restaurantUpdates.name);
  });
});
