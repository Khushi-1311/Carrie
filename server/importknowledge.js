require("dotenv").config();

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const Knowledge = require("./models/Knowledge");

async function importKnowledge() {
    try {
        console.log(process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);

        const filePath = path.join(__dirname, "data", "knowledge.json");

        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        // Remove existing data
        await Knowledge.deleteMany();

        // Insert all knowledge
        await Knowledge.insertMany(data);

        console.log("✅ Knowledge imported successfully!");

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

importKnowledge();