function formatResponse(document) {
    return document.response || "Sorry, I couldn't find the requested information.";
}

module.exports = {
    formatResponse
};