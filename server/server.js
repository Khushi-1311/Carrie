require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const chatRoutes = require("./routes/chatRoutes");
const connectDB = require("./config/database");
console.log("Calling connectDB...");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Serve the frontend
app.use(express.static(path.join(__dirname, "../client")));

// API Routes
app.use("/api/chat", chatRoutes);

// Open index.html when visiting /
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 CARRIE running at http://localhost:${PORT}`);
});