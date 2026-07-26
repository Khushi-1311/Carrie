const chatService = require("../services/chatService");

exports.chat = async (req, res) => {
    try {
        const { message } = req.body;

        const reply = await chatService.getResponse(message);

        res.json({ reply });

    } catch (err) {
        console.error(err);

        res.status(200).json({
            reply: "⚠️ Carrie is having trouble reaching the AI service. Please try again."
        });
    }
};