const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const problemRoutes = require("./routes/problemRoutes");
const attemptRoutes = require("./routes/attemptRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "LLD Practice Platform API is running"
  });
});

app.use("/api/problems", problemRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/evaluations", evaluationRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Something went wrong on the server."
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
