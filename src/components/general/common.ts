//процедура отправки
export const wsSend = function (socket: WebSocket, data: {}) {
  if (socket !== null) {
    if (!socket.readyState) {
      setTimeout(function () {
        wsSend(socket, data);
      }, 100);
    } else {
      console.log(JSON.stringify(data));
      socket.send(JSON.stringify(data));
    }
  }
};
