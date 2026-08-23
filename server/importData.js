require("dotenv").config();

const fs = require("fs");
const path = require("path");
const connectDB = require("./config/database");

async function importData() {
    try {
        await connectDB();

        const collection = process.argv[2];

        if (!collection) {
            console.log("Please provide collection name.");
            process.exit(1);
        }

        const filePath = path.join(
            __dirname,
            "./data",
            `${collection}.json`
        );

        if (!fs.existsSync(filePath)) {
            console.log(`File not found: ${collection}.json`);
            process.exit(1);
        }

        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        const db = require("mongoose").connection.db;

        await db.collection(collection).deleteMany({});
        await db.collection(collection).insertMany(
            Array.isArray(data) ? data : [data]
        );

        console.log(`${collection} imported successfully.`);
        process.exit(0);

    } catch (error) {
        console.error("Import failed:", error);
        process.exit(1);
    }
}

importData();