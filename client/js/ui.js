export function showWelcomeMessage() {

    addBotMessage(
        "Hello! I'm CARRIE 👋\n\nHow can I help you today?"
    );

}
function getTime() {

    const now = new Date();

    return now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });


}
function formatMessage(text) {

    return text

        .replace(/\n/g, "<br>")

        .replace(/•/g, "&#8226; ")

        .replace(/- /g, "&nbsp;&nbsp;• ");

}
function createMessage(text, sender) {

    const message = document.createElement("div");
    message.className = `message ${sender}`;

    // Add avatar only for bot
    if (sender === "bot") {

        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.textContent = "🤖";

        message.appendChild(avatar);

    }

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    bubble.innerHTML = formatMessage(text);

    const time = document.createElement("div");
    time.className = "time";
    time.textContent = getTime();

    bubble.appendChild(time);

    message.appendChild(bubble);

    return message;

}
export function addBotMessage(text) {

    const chatBox = document.getElementById("chat-box");

    chatBox.appendChild(createMessage(text, "bot"));

    scrollToBottom();

}
export function addUserMessage(text) {

    const chatBox = document.getElementById("chat-box");

    chatBox.appendChild(createMessage(text, "user"));

    scrollToBottom();

}
export function scrollToBottom() {

    const chatBox = document.getElementById("chat-box");

    chatBox.scrollTop = chatBox.scrollHeight;

}
export function showTyping() {

    const chatBox = document.getElementById("chat-box");

    const typing = document.createElement("div");

    typing.className = "message bot";
    typing.id = "typing";

    typing.innerHTML = `
        <div class="typing">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    chatBox.appendChild(typing);

    scrollToBottom();

}
export function hideTyping() {

    const typing = document.getElementById("typing");

    if (typing) {
        typing.remove();
    }

}