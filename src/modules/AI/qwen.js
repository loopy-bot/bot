import { exec, spawn } from "child_process";
import WebSocket from "ws";

let python;
let ws;

if (process.platform === "darwin") {
  python = "python3";
} else if (process.platform === "win32") {
  python = "python";
}

export const reply = (prefix, prompt) => {
  return new Promise((resolve, reject) => {
    exec(
      `${python} script/python/qwen.py "${prefix}" '${prompt}'`,
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(JSON.parse(stdout).output.choices[0].message.content);
      }
    );
  });
};

export const chat = () => {
  let retryCount = 0;
  const maxRetries = 10;

  const startPythonScript = () => {
    const pythonProcess = spawn(python, ["script/python/qwenws.py"]);
    pythonProcess.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });
    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });
    pythonProcess.on("close", (code) => {
      console.log(`Python script exited with code ${code}`);
    });

    // Handle Python process termination on Node.js exit events
    const terminatePythonProcess = () => {
      if (!pythonProcess.killed) {
        pythonProcess.kill();
      }
    };

    process.on("exit", terminatePythonProcess);
    process.on("SIGINT", terminatePythonProcess);
    process.on("SIGTERM", terminatePythonProcess);
  };

  const connectWebSocket = async () => {
    while (retryCount < maxRetries) {
      try {
        const ws = new WebSocket("ws://localhost:8765");
        await new Promise((resolve, reject) => {
          ws.on("open", resolve);
          ws.on("error", (e) => {
            console.error(`Failed to connect: ${e.message}, retrying...`);
            ws.close();
            reject(e);
          });
        });

        return (text, key) =>
          new Promise((resolve, reject) => {
            ws.once("message", resolve);
            ws.once("error", reject);
            ws.send(JSON.stringify({ text, key }));
          });
      } catch (e) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        retryCount++;
      }
    }

    throw new Error("Max retries reached, stopping attempts to connect.");
  };

  startPythonScript();
  return connectWebSocket(); // No need for the extra setTimeout or Promise wrapper
};

const mockChat = await chat();

// 消息队列处理逻辑
const messageQueues = {};

async function processNext(roomId) {
  if (messageQueues[roomId] && messageQueues[roomId].length > 0) {
    const { text } = messageQueues[roomId][0]; // 取出队列中第一条消息
    const response = await mockChat(text, roomId);
    const data = JSON.parse(response);
    console.log(`房间 ${roomId}，消息：${text}，回复：${data.response}`);
    console.log(roomId + "-" + text);
    messageQueues[roomId].shift(); // 处理完毕后移除队列中的该消息
    if (messageQueues[roomId].length) {
      await processNext(roomId); // 如果队列中还有消息，则继续处理下一条
    }
  }
}

function enqueueMessage(roomId, text) {
  if (!messageQueues[roomId]) {
    messageQueues[roomId] = [];
  }

  messageQueues[roomId].push({ text });

  if (messageQueues[roomId].length === 1) {
    processNext(roomId); // 如果是队列中的第一条消息，则立即处理
  }
}

// 测试代码
enqueueMessage("room1", "1 + 1");
enqueueMessage("room3", "2 + 2");
enqueueMessage("room2", "3 + 3");
enqueueMessage("room4", "4 + 4");
console.log(messageQueues);
