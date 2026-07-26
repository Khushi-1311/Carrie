const mongoose = require("mongoose");

const knowledgeSchema = new mongoose.Schema(
{
    intent: {
        type: String,
        required: true,
    },

    keywords: {
        type: [String],
        required: true,
    },

    answer: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("Knowledge", knowledgeSchema);