const socket = io("/");

function sendMessage(message) {
  socket.emit("newMessage", { message });
  console.log(`you : ${message}`);
}

function Setnickname(nickname) {
  socket.emit("Setnickname", { nickname });
}

function handleMessageNoti(data) {
  const { message, nickname } = data;
  console.log(`${nickname} : ${message}`);
}

socket.on("messageNotification", handleMessageNoti);
