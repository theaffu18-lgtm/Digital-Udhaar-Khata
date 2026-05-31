const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const aiRoutes = require("./routes/aiRoutes");
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/ai", aiRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.get("/", (req, res) => {
  res.send("Digital Udhaar Khata API Running...");
});

module.exports = app;