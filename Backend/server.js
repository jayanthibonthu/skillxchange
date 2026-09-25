require("dotenv").config({
    path: __dirname + "/.env"
});

const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));
app.use("/api/users", userRoutes);
app.use("/api/resources", require("./routes/resourceRoutes"));
app.use("/api/certificates", require("./routes/certificateRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Skill Exchange API is running"
    });
});

// 404 Route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});