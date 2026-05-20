const express = require("express");

const {
  saveFee,
  getFees,
  deleteFee
} = require("../controllers/feeController");

const router = express.Router();

// SAVE / UPDATE
router.post("/save", saveFee);

// GET ALL
router.get("/all", getFees);

// DELETE
router.post("/delete", deleteFee);

module.exports = router;