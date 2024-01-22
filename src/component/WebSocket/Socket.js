const url = "wss://ws1.aliceblueonline.com/NorenWS/";

let socket;
export const connectionRequest = async (sessionId, userId, type) => {
  socket = new WebSocket(url);
  socket.onopen = function () {
    var encrcptToken = sessionId;
    var initCon = {
      susertoken: encrcptToken,
      t: "c",
      actid: userId + "_" + type,
      uid: userId + "_" + type,
      source: type,
    };

    socket.send(JSON.stringify(initCon));
  };

  socket.onmessage = function (msg) {
    var response = JSON.parse(msg.data)
    document.getElementById('websocket').value = JSON.stringify(response)

    if (response.s === 'OK') {
        var channel = 'BSE|1#NSE|26017#NSE|26040#NSE|26009#NSE|26000#MCX|232615#MCX|235517#MCX|233042#MCX|234633#MCX|240085#NSE|5435#NSE|20182#NSE|212#NSE|11439#NSE|2328#NSE|772#NSE|14838#NSE|14428#NSE|1327#NSE|7229#NSE|1363#NSE|14366#NSE|1660#NSE|11763#NSE|10576#NSE|14977#NSE|15032#NSE|2885#NSE|3045#NSE|5948#NSE|2107#NSE|3426#NSE|11536#NSE|11915#NSE|5097';
        let json = {
            k: channel,
            t: 't'
        };
        socket.send(JSON.stringify(json))
    }
}
};
