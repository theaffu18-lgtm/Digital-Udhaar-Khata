const express = require("express");

const {
  addTransaction,
  getTransactions,
} = require("../controllers/transactionController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addTransaction);

router.get(
  "/:customerId",
  protect,
  getTransactions
);

module.exports = router;