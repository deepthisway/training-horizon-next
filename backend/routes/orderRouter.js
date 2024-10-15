const express = require("express");
const router = express.Router();
const { Orders } = require("../models/orders");
const zod = require("zod");

router.post("/checkout", async function (req, res) {
  try {
    const newOrder = new Orders(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
