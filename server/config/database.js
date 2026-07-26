const mongoose = require("mongoose");

const connectDB = async () => {
    console.log("Inside connectDB...");
    console.log("URI:", process.env.MONGODB_URI ? "Loaded" : "Missing");

    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error);
    }
};

module.exports = connectDB;