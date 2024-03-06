import { exec, spawn } from "child_process";
import iconv from "iconv-lite";
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
      { encoding: "buffer" },
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(
          JSON.parse(iconv.decode(stdout, "utf8"))?.output?.choices[0]?.message
            .content
        );
      }
    );
  });
};

export const chat = () => {
  let retryCount = 0;
  const maxRetries = 10;
  const responseHandlers = {};
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
        ws = new WebSocket("ws://localhost:8765");
        await new Promise((resolve, reject) => {
          ws.on("open", resolve);
          ws.on("error", (e) => {
            console.error(`Failed to connect: ${e.message}, retrying...`);
            ws.close();
            reject(e);
          });
          ws.on("message", (res) => {
            const data = JSON.parse(res);
            const handler = responseHandlers[data.key];
            if (handler) {
              handler(data); // 调用对应 key 的解析函数
              delete responseHandlers[data.key]; // 移除已调用的解析函数
            }
          });
        });

        return (text, key) =>
          new Promise((resolve, reject) => {
            responseHandlers[key] = resolve; // 存储解析函数以便稍后调用
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
