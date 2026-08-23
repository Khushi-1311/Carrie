const mongoose = require("mongoose");

async function search(collectionName, message) {
    try {
        const collection = mongoose.connection.db.collection(collectionName);

        const text = message.toLowerCase().trim();

        const documents = await collection.find({}).toArray();

        for (const doc of documents) {
            if (!doc.keywords || !Array.isArray(doc.keywords)) continue;

            for (const keyword of doc.keywords) {
                if (text.includes(keyword.toLowerCase())) {
                    return doc;
                }
            }
        }

        return null;

    } catch (error) {
        console.error("Database search error:", error);
        return null;
    }
}

module.exports = {
    search
};