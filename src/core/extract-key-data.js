export async function extractKeyData(bot) {
  const [contactList, roomList] = await Promise.all([
    bot.Contact.findAll(),
    bot.Room.findAll(),
  ]); // Get all contacts

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
