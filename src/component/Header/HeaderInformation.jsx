import { getWebSocket } from "../../services/stockService";
import { useDispatch } from "react-redux";
import { setWebSocketSession } from "../../redux/features/authslice";
import { useState } from "react";
const HeaderInformation = () => {
  const [niftyType, setNiftyType] = useState("NSE|26000");
  const dispatch = useDispatch();
  let niftyList = [
    { token: 26000, lp: 0, l: 0, h: 0, o: 0, pc: 0 },
    { token: 26009, lp: 0, l: 0, h: 0, o: 0, pc: 0 },
  ];
  const websocketToken = getWebSocket();
  if (websocketToken?.data?.websocketSession != null) {
    dispatch(
      setWebSocketSession({
        webSocketSession: websocketToken?.data?.websocketSession,
        actId: websocketToken?.data?.actId,
        webuserId: websocketToken?.data?.userId,
      })
    );
    const headerSocket = new WebSocket(
      "wss://ws1.aliceblueonline.com/NorenWS/"
    );

    headerSocket.onopen = function () {
      let initCon = {
        susertoken: websocketToken?.data?.websocketSession,
        t: "c",
        actid: websocketToken?.data?.actId,
        uid: websocketToken?.data?.userId,
        source: "API",
      };
      headerSocket.send(JSON.stringify(initCon));
    };

    headerSocket.onmessage = async function (msg) {
      let response = JSON.parse(msg.data);
      if (response.s === "OK") {
        pushChannelEvent();
      }
      if (response.hasOwnProperty("tk")) {
        if (response.tk === "26000") {
          niftyList[0].lp = response.lp;
          niftyList[0].pc = response.pc;
          if (response.hasOwnProperty("l")) {
            niftyList[0].l = response.l;
            niftyList[0].h = response.h;
            niftyList[0].o = response.o;
          }
        } else if (response.tk === "26009") {
          niftyList[1].lp = response.lp;
          niftyList[1].pc = response.pc;
          if (response.hasOwnProperty("l")) {
            niftyList[1].l = response.l;
            niftyList[1].h = response.h;
            niftyList[1].o = response.o;
          }
        }
        bindStockValue(niftyList);
      }
    };
    function pushChannelEvent() {
      let channelMap = "NSE|26000#NSE|26009";
      let json = {
        k: channelMap,
        t: "t",
      };
      headerSocket.send(JSON.stringify(json));
    }

    function bindStockValue(list) {
      var niftyFiftyInfo=list[0];
      var niftyBankInfo=list[1];

     
      let nfc = document.getElementById("nifty-fifty-current");
      if (nfc != null && niftyFiftyInfo.lp !== undefined) {
        if (niftyFiftyInfo.pc >= 0) {
          nfc.className = "text-success";
        } else {
          nfc.className = "text-danger";
        }

        nfc.innerText = niftyFiftyInfo.lp;
      }
    
      let nbc = document.getElementById("nifty-bank-current");
      if (nbc != null && niftyBankInfo.lp !== undefined) {
        if (niftyBankInfo.pc >= 0) {
          nbc.className = "text-success";
        } else {
          nbc.className = "text-danger";
        }

        nbc.innerText = niftyBankInfo.lp;
      }


      let nfpc = document.getElementById("nifty-fifty-percent");
      if (nfpc != null && niftyFiftyInfo.pc !== undefined) {
        if (niftyFiftyInfo.pc >= 0) {
          nfpc.innerText = "(" + niftyFiftyInfo.pc + "%)";
          nfpc.className = "text-success";
        } else {
          nfpc.innerText = "(" + niftyFiftyInfo.pc + "%)";
          nfpc.className = "text-danger";
        }
      }
      
      let nbpc = document.getElementById("nifty-bank-percent");
      if (nbpc != null && niftyBankInfo.pc !== undefined) {
        if (niftyBankInfo.pc >= 0) {
          nbpc.innerText = "(" + niftyBankInfo.pc + "%)";
          nbpc.className = "text-success";
        } else {
          nbpc.innerText = "(" + niftyBankInfo.pc + "%)";
          nbpc.className = "text-danger";
        }
      }
    }
  }

  return (
    <>
   
      <div className="header-left flex-grow-1 d-none d-md-block">
        <div className="row align-items-center px-4">
          <div
            className="col d-flex justify-content-lg-center mt-2 mt-md-0"
          >
  
              <div className="p-2 me-md-4 text-center">
              <small className="color-900 text-uppercase">Nifty 50</small>

              <div>
                <span id="nifty-fifty-current" className="h6 mb-0">
                --
                  </span>{" "}
                <span>
                  <small id="nifty-fifty-percent"></small>
                </span>
              </div>
            </div>

              <div className="p-2 me-md-4 text-center">
              <small className="color-900 text-uppercase">Bank Nifty</small>

              <div>
                <span id="nifty-bank-current" className="h6 mb-0">
                  --
                  </span>{" "}
                <span>
                  <small id="nifty-bank-percent"></small>
                </span>
              </div>
            </div>
      
          </div>
        </div>
      </div>
    </>
  );
};
export default HeaderInformation;
