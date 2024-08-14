const express = require("express");
const app = express();

const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

const messages = [
  {
    id: 1,
    text: "Pls come back to me",
    user: "Childhood",
    added: new Date().toDateString(),
  },
  {
    id: 2,
    text: "Live with your consequences",
    user: "Monisha",
    added: new Date().toDateString(),
  },
];
app.get("/", (req, res) => {
  res.render("index", { messages: messages });
});
app.get("/new", (req, res) => {
  res.render("form");
});
app.use(express.urlencoded({ extended: true }));

app.get("/letter/:id", (req, res) => {
  const messageId = parseInt(req.params.id, 10);
  const message = messages.find((msg) => msg.id === messageId);
  if (message) res.render("letter", { message: message });
  else {
    res.status(404).send("Message not found");
  }
});
app.post("/new", (req, res) => {
  const lastMessage = messages[messages.length - 1];

  const newId = lastMessage ? lastMessage.id + 1 : 1;

  const newMessage = {
    id: newId,
    text: req.body.message,
    user: req.body.user,
    added: new Date().toDateString(),
  };

  // Check if data is being received correctly

  messages.push(newMessage);
  res.redirect("/");
});

app.listen(3000);
