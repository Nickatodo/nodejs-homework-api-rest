const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./db/config");
require("dotenv").config();

const app = express();

const appRouter = require("./routes/api/router");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  connectDB();
}

app.use("/api", appRouter);
app.use(express.static("public"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
