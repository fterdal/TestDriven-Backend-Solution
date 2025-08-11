const express = require("express");
const router = express.Router();
const { Restaurant } = require("../database");

// GET all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.send(restaurants);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch restaurants" });
  }
});

// GET a single restaurant by id
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      return res.status(404).send({ error: "Restaurant not found" });
    }
    res.send(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurant" });
  }
});

// GET all reviews for a restaurant by id
router.get("/:id/reviews", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      return res.status(404).send({ error: "Restaurant not found" });
    }
    const reviews = await restaurant.getReviews();
    res.send(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurant's reviews" });
  }
});

// POST a new restaurant
router.post("/", async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).send(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Failed to create restaurant" });
  }
});

// DELETE a restaurant
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      return res.status(404).send({ error: "Restaurant not found" });
    }
    await restaurant.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete restaurant" });
  }
});

// PATCH an existing restaurant
router.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await Restaurant.update(req.body, { where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to update restaurant" });
  }
});

module.exports = router;
