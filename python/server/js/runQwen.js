import { exec } from "child_process";

exec("python3 script/python/qwen.py", (err, stdout, stderr) => {
  if (err) {
    console.error(`执行出错: ${err}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
