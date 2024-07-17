const SocketServer = function (socket, io) {
  //user joins
  socket.on("join", (user) => {
    socket.join(user);
    console.log("join user = ", user);
  });

  //join a conversation room
  socket.on("join conversation", (conversation) => {
    socket.join(conversation);
    console.log("join conversation : ", conversation);
  });

  // send and receive message
  // socket.on("send message", (message) => {
  //   let conversation = message.conversation;
  //   if (!conversation.users) return;
  //   conversation.users.forEach((user) => {
  //     if (user.user_id === message.senderId) return;
  //     console.log("send message = ", message);
  //     socket.in(user.user_id).emit("receive message", message);
  //   });
  // });
};

module.exports = SocketServer;
