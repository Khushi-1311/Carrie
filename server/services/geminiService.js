require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// Currently active Flash models + fallback alias
const models = [
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-flash-latest"
];

async function askGemini(prompt) {
    for (const model of models) {
        let retries = 3;
        let delayMs = 1000;

        while (retries > 0) {
            try {
                console.log(`Using ${model}...`);

                const response = await ai.models.generateContent({
                    model,
                    contents: prompt,
                });

                return response.text;

            } catch (err) {
                const status = err.status || err?.error?.code;

                // If model is deprecated/not found (404), break immediately to try the next model
                if (status === 404) {
                    console.warn(`[Gemini API] ${model} returned 404 Not Found. Skipping...`);
                    break; 
                }

                const isRateLimit = status === 429;
                const isOverloaded = status === 503;

                // Retry on Rate Limit (429) or Server Overloaded (503)
                if (isRateLimit || isOverloaded) {
                    retries--;
                    const reason = isRateLimit ? "Rate limit (429)" : "Server busy (503)";

                    console.log(`${model} - ${reason}. Retry ${3 - retries}/3 in ${delayMs / 1000}s...`);

                    await new Promise(resolve => setTimeout(resolve, delayMs));
                    delayMs *= 2; // Exponential backoff (2s -> 4s -> 8s)
                    continue;
                }

                // Rethrow unexpected errors (e.g. 401 Invalid Key, 400 Bad Request)
                throw err;
            }
        }

        console.log(`${model} failed or unavailable. Trying next model...`);
    }

    throw new Error("All specified Gemini models failed or are unavailable.");
}

module.exports = {
    askGemini,
};