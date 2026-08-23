const databaseService = require("./databaseService");
const { askGemini } = require("./geminiService");
const { formatResponse } = require("./responseFormatter");

async function getResponse(message) {

    const collections = [
        "greetings",
        "admission",
        "departments",
        "placement",
        "about",
        "notices",
        "committees",
        "contacts"
    ];

    for (const collection of collections) {
        const result = await databaseService.search(collection, message);

        if (result) {
            return formatResponse(result);
        }
    }

    return await askGemini(message);
}

module.exports = {
    getResponse,
};