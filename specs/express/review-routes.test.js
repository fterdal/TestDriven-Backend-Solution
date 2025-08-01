const request = require("supertest");
const apiRouter = require("../../api");
const express = require("express");
const { db, Review } = require("../../database");

describe("Review Routes", () => {
  let app;

  beforeEach(async () => {
    await db.sync({ force: true });

    await Review.bulkCreate([
      { text: "This is a review" },
      { text: "This is another review" },
      { text: "This is a third review" },
    ]);

    app = express();
    app.use(express.json());
    app.use("/api", apiRouter);
  });

  // TIER 1: GET ALL
  it("should return all reviews", async () => {
    const response = await request(app).get("/api/reviews");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });

  // TIER 2: GET ONE
  it("should return a single review", async () => {
    const response = await request(app).get("/api/reviews/1");
    expect(response.status).toBe(200);
    expect(response.body.text).toBe("This is a review");
  });

  // TIER 3: CREATE
  it("should create a new review", async () => {
    const response = await request(app).post("/api/reviews").send({
      text: "Test Review",
    });
    expect(response.status).toBe(201);
    expect(response.body.text).toBe("Test Review");
  });
});
