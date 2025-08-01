const express = require("express");
const router = express.Router();
const { Review, Restaurant } = require("../database");

// GET all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.send(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// GET a single review by id
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.send(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch review" });
  }
});

// Patch a review by id
router.patch("/:id", async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    const updatedReview = await review.update(req.body);
    res.send(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "Failed to update review" });
  }
});

// Delete a review by id
router.delete("/:id", async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    await review.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete review" });
  }
});

// Create a new review
router.post("/", async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).send(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to create review" });
  }
});

module.exports = router;
