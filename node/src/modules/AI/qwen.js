import { chat, generate } from "../../services/qwen-api/index.js";

export const reply = generate;

export const createChat = () => {
    const MAX_CONTEXT = 8;
    const contextStorage = {};
    const messageQueues = {};
    const pendingPromises = {};

    const getContext = (key) => contextStorage[key] || [];
    const updateContext = (key, message) => {
        if (!contextStorage[key]) {
            contextStorage[key] = [];
        }
        // 限制上下文长度
        if (contextStorage[key].length >= MAX_CONTEXT) {
            contextStorage[key].shift();
        }
        contextStorage[key].push(message);
    };

    const processQueue = async (key, callback) => {
        if (messageQueues[key].length === 0 || pendingPromises[key]) {
            return; // 如果队列为空或者已经有一个消息正在处理，则不进行操作
        }

        pendingPromises[key] = true;

        while (messageQueues[key].length > 0) {
            const text = messageQueues[key].shift();
            updateContext(key, { role: "user", content: text });
            const res = await chat(getContext(key)); // 假定chat是一个异步函数
            updateContext(key, { role: "assistant", content: res });
            callback(res);
        }

        pendingPromises[key] = false;
    };

    const assembleMessage = async (key, text, callback) => {
        if (!messageQueues[key]) {
            messageQueues[key] = [];
        }

        messageQueues[key].push(text);

        processQueue(key, callback); // 不需要await，这样就允许不同的key并行处理
    };

    return {
        assembleMessage,
    };
};

// export const chat = () => {
//   let retryCount = 0;
//   const maxRetries = 10;
//   const responseHandlers = {};
//   console.log("connect to ws");
//   // const startPythonScript = () => {
//   //   const pythonProcess = spawn(python, ["script/python/qwenws.py"]);
//   //   pythonProcess.stdout.on("data", (data) => {
//   //     console.log(`stdout: ${data}`);
//   //   });
//   //   pythonProcess.stderr.on("data", (data) => {
//   //     console.error(`stderr: ${data}`);
//   //   });
//   //   pythonProcess.on("close", (code) => {
//   //     console.log(`Python script exited with code ${code}`);
//   //   });

//   //   // Handle Python process termination on Node.js exit events
//   //   const terminatePythonProcess = () => {
//   //     if (!pythonProcess.killed) {
//   //       pythonProcess.kill();
//   //     }
//   //   };

//   //   process.on("exit", terminatePythonProcess);
//   //   process.on("SIGINT", terminatePythonProcess);
//   //   process.on("SIGTERM", terminatePythonProcess);
//   // };

//   const connectWebSocket = async () => {
//     while (retryCount < maxRetries) {
//       try {
//         ws = new WebSocket("ws://localhost:8765");
//         await new Promise((resolve, reject) => {
//           ws.on("open", resolve);
//           ws.on("error", (e) => {
//             console.error(`Failed to connect: ${e}, retrying...`);
//             ws.close();
//             reject(e);
//           });
//           ws.on("message", (res) => {
//             const data = JSON.parse(res);
//             const handler = responseHandlers[data.key];
//             if (handler) {
//               handler(data); // 调用对应 key 的解析函数
//               delete responseHandlers[data.key]; // 移除已调用的解析函数
//             }
//           });
//         });

//         return (text, key) =>
//           new Promise((resolve, reject) => {
//             responseHandlers[key] = resolve; // 存储解析函数以便稍后调用
//             ws.send(JSON.stringify({ text, key }));
//           });
//       } catch (e) {
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         retryCount++;
//       }
//     }

//     throw new Error("Max retries reached, stopping attempts to connect.");
//   };

//   // startPythonScript();
//   return connectWebSocket(); // No need for the extra setTimeout or Promise wrapper
// };

// test:

// reply("1+1", "what").then((res) => console.log(res));

// const { assembleMessage } = createChat();
// for (let i = 0; i < 5; i++) {
//     assembleMessage(i, "你会什么");
//     assembleMessage(i, "随机抽一个点回答");
//     assembleMessage(i, "你认为你回答的怎么样");
// }
