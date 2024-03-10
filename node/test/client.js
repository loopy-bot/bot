// client.js
import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", function open() {
    // 发送消息的函数
    const sendAndReceiveOnce = (message) => {
        return new Promise((resolve, reject) => {
            ws.once("message", resolve);
            ws.once("error", reject);
            ws.send(message);
        });
    };

    // 并发发送多个消息
    const messagesToSend = ["Message 1", "Message 2", "Message 3"];
    const messagePromises = messagesToSend.map((msg) =>
        sendAndReceiveOnce(msg)
    );

    // 等待所有消息的响应
    Promise.all(messagePromises)
        .then((responses) => {
            console.log("Received responses:", responses);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

ws.on("error", function error(e) {
    console.log("WebSocket error: " + e.message);
});
