const Customer = require("../models/Customer");

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const customers = await Customer.find({
      userId: req.user._id,
    });

    const totalCustomers =
      customers.length;

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

    const totalBalance = customers.reduce(
      (acc, customer) =>
        acc + customer.balance,
      0
    );

    res.json({
      totalCustomers,
      totalCredit,
      totalPaid,
      totalBalance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};