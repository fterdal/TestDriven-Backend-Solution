const request = require("supertest");
const apiRouter = require("../../api");
const express = require("express");
const { db, Restaurant, Review } = require("../../database");

describe("Restaurant Routes", () => {
  let app;

  beforeEach(async () => {
    await db.sync({ force: true });

    await Restaurant.bulkCreate([
      { name: "Tony's Pizza" },
      { name: "Ramen House" },
      { name: "Shawarma Palace" },
    ]);

    app = express();
    app.use(express.json());
    app.use("/api", apiRouter);
  });

  // TIER 1: GET ALL
  it("should return all restaurants", async () => {
    const response = await request(app).get("/api/restaurants");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });

  // TIER 2: GET ONE
  it("should return a single restaurant", async () => {
    const response = await request(app).get("/api/restaurants/1");
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Tony's Pizza");
  });

  // TIER 3: CREATE
  it("should create a new restaurant", async () => {
    const response = await request(app).post("/api/restaurants").send({
      name: "Test Restaurant",
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Test Restaurant");
  });
});
