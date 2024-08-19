const mongoose = require("mongoose");
const { Schema } = mongoose;
const messageSchema = new Schema({
  text: String,
  user: String,
  added: {
    type: String,
  },
});
const Message = mongoose.model("messages", messageSchema);
module.exports = Message;
