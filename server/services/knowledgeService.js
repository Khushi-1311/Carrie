const Knowledge = require("../models/Knowledge");

async function searchKnowledge(message) {

    message = message.toLowerCase();

    const knowledge = await Knowledge.find();

    let replies = [];

    for (const item of knowledge) {

        for (const keyword of item.keywords) {

            if (message.includes(keyword.toLowerCase())) {

                replies.push(item.answer);
                break;

            }

        }

    }

    return replies;
}

module.exports = {
    searchKnowledge
};