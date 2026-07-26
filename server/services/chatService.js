const { searchKnowledge } = require("./knowledgeService");
const { askGemini } = require("./geminiService");

async function getResponse(message) {

    const replies = await searchKnowledge(message);

    if (replies.length > 0) {
        return replies.join("\n\n");
    }

    return await askGemini(message);
}

module.exports = {
    getResponse
};