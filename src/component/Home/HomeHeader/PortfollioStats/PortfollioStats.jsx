import { getPortfollioList } from "../../../../services/stockService";
import PlTotal from "./PlTotal";
import { useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { successToast } from "../../../Toasts/Toasts";

const PortfollioStats = () => {
  const [portfolioType, setPortfollioType] = useState("live");
  const [totalInvestment, setTotalInvestment] = useState(0);
  const { data } = getPortfollioList();

  const list = useMemo(() => {
    if (data?.holdings) {
      return data.holdings.map((element) => ({
        token: element.token,
        price: element.price,
        tradeType: element.tradeType,
        exchange: element.exchange,
        qty: element.quantity,
        ltp: null,
        pdc: element.pdc,
        currentValue: 0,
        profitLoss: 0,
        todaysProfitLoss: 0,
      }));
    }
    return [];
  }, [data]);

  let filteredList = useMemo(() => {
    return list.filter((item) => item.tradeType?.toLowerCase() === portfolioType);
  }, [list, portfolioType]);

  const socketToken = useSelector((state) => state.auth.webSocketSession);
  const actid = useSelector((state) => state.auth.actid);
  const uid = useSelector((state) => state.auth.webuserId);

  useEffect(() => {
    const portfolioSocket = new WebSocket("wss://ws1.aliceblueonline.com/NorenWS/");

    const pushChannelEvent = () => {
      const channelMap = filteredList?.map((item) => `${item.exchange}|${item.token}`).join("#");
      // console.log(channelMap);
      const json = {
        k: channelMap,
        t: "t",
      };
      portfolioSocket.send(JSON.stringify(json));
    };

    const populateListWithPLAndCurrentValue = (token, lp) => {
      const updatedList = filteredList.map((item) => {
        if (item.token === token) {

          const r = parseFloat(item.qty);
          const currentValue = lp !== undefined ? parseFloat(lp).toFixed(2) * r : 0;
          const profitLoss = lp !== undefined ? (parseFloat(lp).toFixed(2) - parseFloat(item.price)).toFixed(2) * r : 0;
          const todaysProfitLoss = lp !== undefined ? (parseFloat(lp).toFixed(2) - parseFloat(item.pdc)).toFixed(2) * r : 0;
          return {
            ...item,
            ltp: lp,
            currentValue,
            profitLoss,
            todaysProfitLoss,
          };
        }
        return item;
      });
      filteredList=updatedList;
      calculate(updatedList);
    };

    const calculate = (list) => {
      let totalCurrentValue = 0;
      let totalPnL = 0;
      let todayPnL = 0;

      list.forEach((item) => {
        totalCurrentValue += parseFloat(item.currentValue);
        totalPnL += parseFloat(item.profitLoss);
        todayPnL += parseFloat(item.todaysProfitLoss);
      });
      const totalCVElement = document.getElementById("total_cv");
      if (totalCVElement) {
        totalCVElement.innerText = totalCurrentValue.toFixed(2);
      }

      const totalPnLElement = document.getElementById("total_PnL");
      if (totalPnLElement) {
        totalPnLElement.innerText = totalPnL.toFixed(2);
        totalPnLElement.className = totalPnL >= 0 ? "text-success" : "text-danger";
      }

      const todaysPnLElement = document.getElementById("todays_PnL");
      if (todaysPnLElement) {
        todaysPnLElement.innerText = todayPnL.toFixed(2);
        todaysPnLElement.className = todayPnL >= 0 ? "text-success" : "text-danger";
      }
    };

    const initializeWebSocket = () => {
      portfolioSocket.onopen = function () {
        let initCon = {
          susertoken: socketToken,
          t: "c",
          actid: actid,
          uid: uid,
          source: "API",
        };
        portfolioSocket.send(JSON.stringify(initCon));
      };

      portfolioSocket.onmessage = function (msg) {
        let response = JSON.parse(msg.data);
        if (response.s === "OK") {
          pushChannelEvent();
        }
        if (response.lp !== undefined && response.lp != null) {
          populateListWithPLAndCurrentValue(response.tk, response.lp);
        }
      };
    };

    const cleanupWebSocket = () => {
      portfolioSocket.close();
    };

    if (portfolioType.toLowerCase() === "live") {
      setTotalInvestment(data?.totalLiveInvestment);
    } else {
      setTotalInvestment(data?.totalPaperInvestment);
    }

    const totalCVElement = document.getElementById("total_cv");
    if (totalCVElement) {
      totalCVElement.innerText = "0";
    }

    const totalPnLElement = document.getElementById("total_PnL");
    if (totalPnLElement) {
      totalPnLElement.innerText = "0";
    }

    const todaysPnLElement = document.getElementById("todays_PnL");
    if (todaysPnLElement) {
      todaysPnLElement.innerText = "0";
    }

    initializeWebSocket();

    return () => {
      cleanupWebSocket();
    };
  }, [data, portfolioType, list, socketToken, actid, uid]);

  return (
    <>
      <div className="row g-3 row-deck">
        <div className="row d-flex gx-2">
          <div className="col-md-12 d-flex mt-5">
            <h6 className="modal-title">My Portfolio</h6>
            <div className="btn-sm pt-0 ms-auto">
              <button
                type="button"
                className={portfolioType.toLowerCase() === "live" ? "btn btn-purple me-2" : "btn btn-purple-light me-2"}
                onClick={() => setPortfollioType("live")}
              >
                Live
              </button>
              <button
                type="button"
                className={portfolioType.toLowerCase() === "paper" ? "btn btn-purple" : "btn btn-purple-light"}
                onClick={() => setPortfollioType("paper")}
              >
                Paper
              </button>
            </div>
          </div>
        </div>
        <div className="row g-2">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card mb-3">
              <div className="card-body d-flex align-items-start p-lg-3 p-2">
                <div className="flex-fill">
                  <div className="fw-bold pb-2">
                    <span className="h4 mb-0">
                      <strong id="todays_PnL">0</strong>
                    </span>
                  </div>
                  <div className="text-muted mb-2 text-uppercase">TODAY'S P&amp;L</div>
                </div>
                <div className="avatar lg rounded-circle no-thumbnail text-light bg-light">
                  <i className="fa fa-chart-line fa-lg text-primary"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card mb-3">
              <div className="card-body d-flex align-items-start p-lg-3 p-2">
                <div className="flex-fill">
                  <div className="fw-bold pb-2">
                    <span className="h4 mb-0">
                      <strong id="total_PnL">0</strong>
                    </span>
                  </div>
                  <div className="text-muted mb-2 text-uppercase">OVERALL P&amp;L</div>
                </div>
                <div className="avatar lg rounded-circle no-thumbnail text-light bg-light">
                  <i className="fa fa-chart-column fa-lg text-primary"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <PlTotal title="TOTAL INVESTMENT" icon="fa fa-inr fa-lg text-primary" portfollioData={totalInvestment} ruppeeicon="₹ " colorChange="h4 mb-0" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card mb-3">
              <div className="card-body d-flex align-items-start p-lg-3 p-2">
                <div className="flex-fill">
                  <div className="fw-bold pb-2">
                    <span className="h4 mb-0">
                      ₹ <strong id="total_cv">0</strong>
                    </span>
                  </div>
                  <div className="text-muted mb-2 text-uppercase">CURRENT VALUE</div>
                </div>
                <div className="avatar lg rounded-circle no-thumbnail text-light bg-light">
                  <i className="fa-regular fa-circle-check fa-lg text-primary"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfollioStats;
