const express = require("express");
const app = express();
const path = require("node:path");
const pool = require("./db/pool");
const Message = require("./db/Schema");
const queries = require("./db/query");
pool();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.get("/", async (req, res) => {
  // stuck here for 20 min just because u didnt add await keyword
  let message = await queries.getMessages();
  if (message.length == 0) {
    await queries.insertData({
      text: "I miss you",
      user: "Monu",
      date: new Date().toDateString(),
    }),
      await queries.insertData({
        text: "I am bored",
        user: "Damon",
        date: new Date().toDateString(),
      });
  }

  res.render("index", { messages: message });
});
app.get("/new", (req, res) => {
  res.render("form", { message: "", action: "new" });
});
app.use(express.urlencoded({ extended: true }));

//javascript objects cant be passed in url as params only strings can be passed
// so we cant send whole message object instead just send id
app.get("/letter/:id", async (req, res) => {
  const message = await queries.findMessage(req.params.id);
  if (message) res.render("letter", { message: message });
  else {
    res.status(404).send("Message not found");
  }
});
app.post("/new", async (req, res) => {
  const newMessage = {
    text: req.body.message,
    user: req.body.user,
    added: new Date().toDateString(),
  };
  const newmessages = await queries.insertData(newMessage);

  // Check if data is being received correctly
  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id; // Extract id from URL parameters
  try {
    await queries.deleteMessage(id); // Call the delete function with the id
    res.redirect("/"); // Redirect to homepage or a confirmation page after deletion
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).send("An error occurred while deleting the message");
  }
});

app.get("/update/:id", async (req, res) => {
  message = await queries.findMessage(req.params.id);
  if (message) {
    res.render("form", { message, action: "update" });
  } else {
    res.status(404).send("Message not found");
  }
});
// app.js
app.post("/update/:id", async (req, res) => {
  const messageId = req.params.id;
  const updatedMessage = {
    text: req.body.message,
    user: req.body.user,
    added: new Date().toDateString(), // Assuming you want to update the date as well
  };
  await queries.updateMessage(messageId, updatedMessage); // Implement this in queries
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
