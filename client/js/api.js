export async function sendMessageToAPI(message) {

    const response = await fetch("/api/chat", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            message
        })

    });

    if (!response.ok) {
        throw new Error("Failed to connect to server");
    }

    const data = await response.json();

    return data.reply;

}