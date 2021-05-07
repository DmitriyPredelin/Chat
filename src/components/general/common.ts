//процедура отправки
export const wsSend = function (socket: WebSocket | undefined, data: {}) {
  if (socket) {
    if (socket !== null) {
      if (!socket.readyState) {
        setTimeout(function () {
          wsSend(socket, data);
        }, 100);
      } else {
        socket.send(JSON.stringify(data));
      }
    }
  }
};
