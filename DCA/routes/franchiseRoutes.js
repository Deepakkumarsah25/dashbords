const express = require("express");

const {
  registerFranchise,
  approveFranchise
} = require("../controllers/franchiseController");

const router = express.Router();

// REGISTER
router.post("/register", registerFranchise);

// APPROVE
router.get("/approve/:id", approveFranchise);

module.exports = router;