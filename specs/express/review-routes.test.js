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

  // Sample very basic test just to show the anatomy of a test
  describe("Basic Arithmetic", () => {
    it("should be able to add two", () => {
      expect(BasicArithmetic.addTwo(2)).toBe(4);
    });
    it("should be able to subtract two", () => {
      expect(BasicArithmetic.subtractTwo(2)).toBe(0);
    });
  });


  describe("Review Routes", () => {
  it("should return all reviews", async () => {
    const response = await request(app).get("/api/reviews");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });

  it("should return a single review", async () => {
    const response = await request(app).get("/api/reviews/1");
    expect(response.status).toBe(200);
    expect(response.body.text).toBe("This is a review");
  });

  it("should create a new review", async () => {
    const response = await request(app).post("/api/reviews").send({
      text: "Test Review",
    });
    expect(response.status).toBe(201);
    expect(response.body.text).toBe("Test Review");
  });
});
