const Customer = require("../models/Customer");

const getAIInsights = async (req, res) => {
  try {
    const customers = await Customer.find({
      userId: req.user._id,
    });

    if (customers.length === 0) {
      return res.json({
        insights: [
          "No customer data available",
        ],
      });
    }

    // Highest Pending Customer
    const highestPending = customers.reduce(
      (max, customer) =>
        customer.balance > max.balance
          ? customer
          : max
    );

    // Totals
    const totalCredit = customers.reduce(
      (acc, customer) =>
        acc + customer.totalCredit,
      0
    );

    const totalPaid = customers.reduce(
      (acc, customer) =>
        acc + customer.totalPaid,
      0
    );

    // Recovery %
    const recoveryRate =
      totalCredit > 0
        ? (
            (totalPaid / totalCredit) *
            100
          ).toFixed(1)
        : 0;

    // Pending Customers
    const pendingCustomers =
      customers.filter(
        (customer) => customer.balance > 0
      );

    // Business Health
    let businessHealth = "Healthy";

    if (recoveryRate < 50) {
      businessHealth = "Risky";
    } else if (recoveryRate < 75) {
      businessHealth = "Moderate";
    }

    const insights = [
      `${highestPending.name} has the highest pending balance ₹${highestPending.balance}`,

      `Recovery rate is ${recoveryRate}%`,

      `Business health status is ${businessHealth}`,

      `${pendingCustomers.length} customers have pending dues`,
    ];

    res.json({
      insights,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAIInsights,
};