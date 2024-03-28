import { getTasks, activeTask } from "./service.js";
import schedule from "node-schedule";

let bot = null;
let wx = {
  contact: null,
  room: null,
  find(type, name) {
    if (type === "room") {
      return this.room.find((i) => i.name === name).entity;
    } else {
      return this.contact.find((i) => i.name === name).entity;
    }
  },
};
const jobsMap = new Map();

const pollInterval = 1000 * 60 * 3; // 轮询间隔设为3分钟

const pollForTaskUpdates = async () => {
  const res = await getTasks(); // 假设这个函数会返回最新的任务数组

  const diff = async (updatedTasks, type) => {
    // 取消不在更新任务列表中的任务
    for (const [jobId, job] of jobsMap) {
      if (!updatedTasks.find((task) => task.name + task.id === jobId)) {
        job.cancel();
        jobsMap.delete(jobId);
        console.log(`任务 ${jobId} 已取消`);
      }
    }

    // 添加或更新任务
    for (const task of updatedTasks) {
      const existingJob = jobsMap.get(`${task.name}_${task.id}`);
      if (existingJob) {
        // 如果任务时间有更新，则重置任务
        if (existingJob.hash !== task.time + task.count) {
          existingJob.reschedule(task.time);
          console.log(`任务 ${task.name}_${task.id} 已更新时间`);
        }
      } else {
        // 如果是新任务，则添加
        await initTaskForEntity(type, task.name, task);
        console.log(`任务 ${task.name}_${task.id} 已添加`);
      }
    }
  };
  await Promise.all([diff(res.friendTasks, "friend"), diff(res.roomTasks, "room")]);
  console.log("diff success");
};

const initTaskForEntity = async (type, name, task) => {
  const entity = wx.find(type, name);
  if (!entity) {
    console.log(`未找到对象: ${name}`);
    return;
  }
  const job = schedule.scheduleJob(task.time, async function () {
    try {
      const res = await activeTask(task.id);
      if (res === "$done") {
        const jobToCancel = jobsMap.get(`${name}_${task.id}`);
        if (jobToCancel) {
          jobToCancel.cancel();
          jobsMap.delete(`${name}_${task.id}`);
        }
      } else {
        await entity.say(res);
      }
    } catch (e) {
      console.error(`执行任务时发生错误: ${e}`);
    }
  });
  // 记录cron用来diff
  job.hash = task.time + task.count;
  jobsMap.set(`${name}_${task.id}`, job);

  //test
  // const res = await activeTask(task.id);
  // console.log("生成的文案", res);
  // if (res === "$done") {
  //   const jobToCancel = jobsMap.get(`${name}_${task.id}`);
  //   if (jobToCancel) {
  //     jobToCancel.cancel();
  //     jobsMap.delete(`${name}_${task.id}`);
  //   }
  // } else {
  //   await entity.say(res);
  // }
};

const initTasks = async (type, tasks = []) => {
  for (const task of tasks) {
    try {
      await initTaskForEntity(type, task.wxName, task);
    } catch (e) {
      console.error(`初始化${type}任务时发生错误: ${e}`);
    }
  }
};

export const initTask = async (Bot, contact, room) => {
  if (!Bot) {
    console.error("未提供有效的bot实例。");
    return;
  }
  bot = Bot;
  Object.assign(wx, { contact, room });
  try {
    const res = await getTasks();

    await Promise.all([initTasks("friend", res.friendTasks), initTasks("room", res.roomTasks)]);
    console.log("jobsMap", jobsMap);

    // 启动轮询机制
    setInterval(() => {
      pollForTaskUpdates().catch(console.error);
    }, pollInterval);
  } catch (e) {
    console.error(`获取任务时发生错误: ${e}`);
  }
};
