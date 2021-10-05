import socketController from "./socketController";
import events from "./events";

const express = require("express");
const path = require("path");

const socketIO = require("socket.io");
const logger = require("morgan");

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) =>
  res.render("home", { events: JSON.stringify(events) })
);
const handleListening = () =>
  console.log(`✅ Server running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = socketIO(server);

io.on("connection", (socket) => socketController(socket, io));

//   socket.on("newMessage", ({ message }) => {
//     socket.broadcast.emit("messageNotification", {
//       message,
//       nickname: socket.nickname || "Hacker",
//     });
//   });

//   socket.on("Setnickname", ({ nickname }) => {
//     socket.nickname = nickname;
//   });
// });

//setInterval(() => console.log(sockets), 1000);
