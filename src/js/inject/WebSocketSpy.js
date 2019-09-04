const WebSocketSpy = () => ({
  listen: (func) => {
    const ws = window.WebSocket;
    
    window.WebSocket = function (a, b) {
        var that = b ? new ws(a, b) : new ws(a);
        that.addEventListener("message", func);
        return that;
    };

    window.WebSocket.prototype=ws.prototype;
  } 
});

export default WebSocketSpy;