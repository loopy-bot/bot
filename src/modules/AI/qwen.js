import { exec } from "child_process";

export const reply = (prefix, prompt) => {
  return new Promise((resolve, reject) => {
    exec(
      `python3 script/python/qwen.py "${prefix}" '${prompt}'`,
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
