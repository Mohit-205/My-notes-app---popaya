const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/notes", require("./routes/notes"));

//Running Status
app.get("/", (req, res) => {
  res.json({ message: "Notes API is running" });
});

//404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

//Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });