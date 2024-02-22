import WebSocket from "ws";
import readline from "readline";

const ws = new WebSocket("ws://localhost:8765");

// 创建readline接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

ws.on("open", () => {
  console.log("Connected to the server.");
  promptForMessage();
});

ws.on("message", (data) => {
  console.log(`Received: ${data}`);
  promptForMessage(); // This will be called after processing the current message.
});

ws.on("close", () => {
  console.log("Disconnected from the server.");
  rl.close();
});

ws.on("error", (error) => {
  console.error(`Error: ${error.message}`);
  rl.close();
});

function promptForMessage() {
  rl.question("Enter message: ", (msg) => {
    if (msg === "exit") {
      ws.close();
    } else {
      ws.send(msg);
    }
  });
}
