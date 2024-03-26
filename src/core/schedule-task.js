import { getTasks, activeTask } from "./service.js";
import schedule from "node-schedule";

const jobsMap = new Map();

const initTaskForEntity = async (entityFinder, entityId, task) => {
  const entity = await entityFinder({ id: entityId });
  if (!entity) {
    console.log(`未找到对象: ${entityId}`);
    return;
  }
  const job = schedule.scheduleJob(task.time, async function () {
    try {
      const res = await activeTask(task.id);
      if (res === "$done") {
        const jobToCancel = jobsMap.get(task.id);
        if (jobToCancel) {
          jobToCancel.cancel();
          jobsMap.delete(task.id);
        }
      } else {
        await entity.say(res);
      }
    } catch (e) {
      console.error(`执行任务时发生错误: ${e}`);
    }
  });
  jobsMap.set(task.id, job);
};

const initTasks = async (type, bot, tasks) => {
  const entityFinder = type === "friend" ? bot.Contact.find : bot.Room.find;
  for (const task of tasks) {
    try {
      await initTaskForEntity(entityFinder, task.wxId, task);
    } catch (e) {
      console.error(`初始化${type}任务时发生错误: ${e}`);
    }
  }
};

export const initTask = async (bot) => {
  if (!bot) {
    console.error("未提供有效的bot实例。");
    return;
  }

  try {
    const res = await getTasks();
    await Promise.all([
      initTasks("friend", bot, res.friendTasks),
      initTasks("room", bot, res.roomTasks),
    ]);
  } catch (e) {
    console.error(`获取任务时发生错误: ${e}`);
  }
};
