const Transaction = require("../models/Transaction");
const Customer = require("../models/Customer");

// Add Transaction
const addTransaction = async (req, res) => {
  try {
    const { customerId, type, amount, note } =
      req.body;

    const transaction =
      await Transaction.create({
        customerId,
        userId: req.user._id,
        type,
        amount,
        note,
      });

    const customer =
      await Customer.findById(customerId);

    if (type === "credit") {
      customer.totalCredit += Number(amount);

      customer.balance += Number(amount);
    } else {
      customer.totalPaid += Number(amount);

      customer.balance -= Number(amount);
    }

    await customer.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Customer Transactions
const getTransactions = async (req, res) => {
  try {
    const transactions =
      await Transaction.find({
        customerId: req.params.customerId,
      }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
};