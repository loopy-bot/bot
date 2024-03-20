import { WechatyBuilder } from 'wechaty';
// import { startScheduledTasks } from './modules/scheduled-tasks/index.js';
import { createProcessMessage } from './modules/process-message/index.js';
import { uploadWxData } from './services/ai.js';

let name = 'loopy_bot';
let bot = '';
let handleMessage;
bot = WechatyBuilder.build({
  name, // generate xxxx.memory-card.json and save login data for the next login
  puppet: 'wechaty-puppet-wechat4u',
});

bot
  .on('scan', (qrcode, status) => {
    console.log(`https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`);
  })
  .on('login', (user) => {
    handleMessage = createProcessMessage(bot);
  })
  .on('ready', async () => {
    // 开启定时任务
    // startScheduledTasks(bot);
    console.log('ready');
    extractKeyData(bot)
      .then(uploadWxData)
      .catch((error) => {
        console.error('Failed to extract key data:', error);
      });
  })
  .on('logout', () => {
    console.log('logout');
  })
  .on('room-join', async (room) => {
    room.say(`欢迎${nameList}🤪加入🎉${await room.topic()}🎉，一起来开启变强之旅🧑‍🦲\n\n哇呜！有问题看群公告嗷🧸`);
  })
  .on('error', (error) => {
    console.warn(error);
  })
  .on('message', async (message) => {
    handleMessage(message);
  })
  .start();

async function extractKeyData(bot) {
  const [contactList, roomList] = await Promise.all([bot.Contact.findAll(), bot.Room.findAll()]); // Get all contacts

  const contactsData = contactList
    .map((contact) => ({
      id: contact.id,
      name: contact.payload.name,
      alias: contact.payload.alias,
      friend: contact.payload.friend,
    }))
    .filter((i) => i.friend);

  const roomsData = roomList.map(async (room) => ({
    id: room.id,
    topic: await room.topic(),
    memberCount: (await room.memberAll()).length, // Use memberAll() to get all members and count them
  }));

  // Use Promise.all to wait for all room data to be resolved
  return Promise.all(roomsData).then((resolvedRoomsData) => {
    return {
      friends: contactsData,
      rooms: resolvedRoomsData,
    };
  });
}
