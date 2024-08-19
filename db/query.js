const mongoose = require("mongoose");
const Message = require("./Schema");
async function insertData(username) {
  try {
    const message = new Message({
      text: username.text,
      user: username.user,
      added: username.added,
    });
    console.log("Data inserted:", username);
    await message.save();
  } catch (error) {
    console.error("Failed to insert data:", error.message);
  }
}
async function getMessages() {
  const messages = await Message.find({});
  return messages;
}
async function findMessage(id) {
  try {
    const message = await Message.findById(id);
    return message;
  } catch (err) {
    console.log(err.Message);
  }
}
async function updateMessage(id, updatedMessage) {
  try {
    return await Message.findByIdAndUpdate(id, updatedMessage, {
      new: true,
    }).exec();
  } catch (error) {
    console.error("Error updating message:", error);
    throw error;
  }
}
// _id not equal to id
async function deleteMessage(id) {
  try {
    await Message.findByIdAndDelete(id); // Delete the message by id
  } catch (error) {
    console.error("Error in deleteMessage:", error);
    throw error;
  }
}

module.exports = {
  insertData,
  getMessages,
  findMessage,
  deleteMessage,
  updateMessage,
};
