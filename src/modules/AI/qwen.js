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

        return (text) =>
          new Promise((resolve, reject) => {
            ws.once("message", resolve);
            ws.once("error", reject);
            ws.send(text);
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
