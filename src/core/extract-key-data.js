export async function extractKeyData(bot) {
  const [contactList, roomList] = await Promise.all([bot.Contact.findAll(), bot.Room.findAll()]); // Get all contacts

  const contactsData = contactList
    .filter((i) => i.payload.friend)
    .map((contact) => ({
      name: contact.payload.name,
      alias: contact.payload.alias,
      entity: contact,
    }));

  const roomsData = roomList.map(async (room) => ({
    entity: room,
    name: await room.topic(),
    memberCount: (await room.memberAll()).length, // Use memberAll() to get all members and count them
  }));

  // Use Promise.all to wait for all room data to be resolved
  return Promise.all(roomsData)
    .then((resolvedRoomsData) => {
      return {
        friends: contactsData,
        rooms: resolvedRoomsData,
      };
    })
    .catch((error) => {
      console.error("Failed to extract key data:", error);
    });
}
