const express = require("express");

const {
  addCustomer,
  getCustomers,
  deleteCustomer,
} = require("../controllers/customerController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addCustomer);

router.get("/", protect, getCustomers);

router.delete("/:id", protect, deleteCustomer);

module.exports = router;