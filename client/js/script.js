import { sendMessageToAPI } from "./api.js";

import {
    addUserMessage,
    addBotMessage,
    showTyping,
    hideTyping,
    showWelcomeMessage
} from "./ui.js";

const input = document.getElementById("user-input");
const sendbutton = document.getElementById("send-btn");
const chatBox = document.getElementById("chat-box");
showWelcomeMessage();


sendbutton.addEventListener("click", sendMessage);

input.addEventListener("keydown", (event) => {

    if(event.key === "Enter"){
        sendMessage();
    }

});

async function sendMessage() {

    const message = input.value.trim();

    if (!message) return;

    const welcomeCard = document.getElementById("welcome-card");

    if (welcomeCard) {
        welcomeCard.style.display = "none";
    }
    document.querySelector("main").classList.add("chat-mode");

    addUserMessage(message);

    input.value = "";

    showTyping();

    try {

        const reply = await sendMessageToAPI(message);

        hideTyping();

        addBotMessage(reply);

    }
    catch (error) {

        hideTyping();

        addBotMessage(
            "Sorry, something went wrong. Please try again."
        );

        console.error(error);

    }

}