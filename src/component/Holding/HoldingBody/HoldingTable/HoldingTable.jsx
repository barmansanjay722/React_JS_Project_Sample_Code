import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import { getHoldingsList } from "../../../../redux/features/stockSlice";
import PlaceOrderModal from "../../../Modal/PlaceOrderModal";
import { ThreeDots } from "react-loader-spinner";

const HoldingTable = () => {
  const [tradeType, setTradeType] = useState("live");
  const [value, setValue] = useState();
  const [isModal, setIsModal] = useState(false);
  const [orderType, setOrderType] = useState("");

  const dispatch = useDispatch();
  const holdings = useSelector((state) => state.stock.holdings);
  const socketToken = useSelector((state) => state.auth.webSocketSession);
  const actid = useSelector((state) => state.auth.actid);
  const uid = useSelector((state) => state.auth.webuserId);
  const positionSocketRef = useRef(null);

  const holdingListLoader = useSelector(
    (state) => state.stock.holdingListLoader
  );

  useEffect(() => {
    dispatch(getHoldingsList());
  }, [dispatch]);

  function calculateProfitLoss(element) {
    const ltp = parseFloat(element.ltp);
    const price = parseFloat(element.price);
    const quantity = parseFloat(element.quantity);
    const profitLoss = ((ltp - price) * quantity).toFixed(2);
    return isNaN(profitLoss) ? "-" : (profitLoss === "NaN" ? "-" : profitLoss);
}

  const mapData = () => {
    let index = 0;
    return holdings?.map((element) => {
      const item = {
        tradeType: element.tradeType,
        instrumentName: element.instrumentName,
        tradingSymbol: element.tradingSymbol,
        orderType: element.orderType,
        token: element.token,
        exchange: element.exchange,
        quantity: element.quantity,
        price: element.price,
        isStock: element.isStock,
        pdc: element.pdc,
        ltp: element.ltp,
        profitLoss: calculateProfitLoss(element)
      };
      index++;
      return item;
    });
  };
  const filteredList = useMemo(() => {
    return mapData().filter((item) => item.tradeType.toLowerCase() === tradeType);
  }, [holdings, tradeType]);

  const getCurrentPageItems = () => {
    return filteredList;
  };
  useEffect(() => {
    positionSocketRef.current = new WebSocket("wss://ws1.aliceblueonline.com/NorenWS/");

    positionSocketRef.current.onopen = function () {
      let initCon = {
        susertoken: socketToken,
        t: "c",
        actid: actid,
        uid: uid,
        source: "API",
      };
      positionSocketRef.current.send(JSON.stringify(initCon));
    };

    positionSocketRef.current.onmessage = function (msg) {
      let response = JSON.parse(msg.data);
      if (response.s === "OK") {
        pushChannelEvent();
      }
      if (response.hasOwnProperty("lp")) {
        if (response.lp !== undefined && response.lp != null) {
          populateListWithPLAndCurrentValue(response.tk, response.lp);
        }
      }
    };

    return () => {
      positionSocketRef.current.close();
    };
  }, [tradeType]);

  const pushChannelEvent = () => {
    let channelMap = filteredList.map((item) => `${item.exchange}|${item.token}`).join("#");
    let json = {
      k: channelMap,
      t: "t",
    };
   positionSocketRef.current.send(JSON.stringify(json));
  };
  const populateListWithPLAndCurrentValue = (token, lp) => {
    try {
      filteredList.forEach((element) => {
        if (element.token === token) {
          element.ltp = lp;
          let r = parseFloat(element.quantity);
          if (lp !== undefined) {
            const lpElement = document.getElementById(`lp_${element.tradeType.toLowerCase()}_${token}`);
            if (lpElement != null && !isNaN(lp)) {
              lpElement.innerText = lp;
            }
           
            if (r < 0 || r>0) {
              const profitLoss = (parseFloat(lp) - parseFloat(element.price).toFixed(2)) *  parseFloat(element.quantity);
              element.profitLoss = profitLoss;
              if (isNaN(profitLoss)) {
                element.profitLoss = "-"
              }          

              const plElement = document.getElementById(`pl_${element.tradeType.toLowerCase()}_${token}`);
              if (plElement != null) {
                plElement.innerText = profitLoss.toFixed(2);
                if (isNaN(profitLoss.toFixed(2))) {
                  plElement.innerText = "-"
                }
                plElement.className = profitLoss >= 0 ? "text-success" : "text-danger";

              }
            }
          }
        }
     
      });
      calculateTotalPL();
    } catch (e) {
      // console.log(e);
    }
  };
  
  const calculateTotalPL=()=> {
    let totalPlLive = 0;
    let totalPlPaper = 0;
    for (let i = 0; i < filteredList.length; i++) {
      const element = filteredList[i];
        if (element.tradeType.toLowerCase() === "paper") {
          totalPlPaper +=parseFloat(element.profitLoss);
          
        } else if (element.tradeType.toLowerCase() === "live") {
          totalPlLive +=parseFloat(element.profitLoss);
        }
    }
    const totalPaperPLElement = document.getElementById("paperTotalHoldingsPL");
    if (totalPaperPLElement ) {
      totalPaperPLElement.innerText = totalPlPaper.toFixed(2);
      totalPaperPLElement.className = totalPlPaper >= 0 ? "text-success" : "text-danger";
    }
    const totalLivePLElement = document.getElementById("liveTotalHoldingsPL");
    if (totalLivePLElement ) {
      totalLivePLElement.innerText = totalPlLive.toFixed(2);
      if (isNaN(totalPlLive.toFixed(2))) {
        totalLivePLElement.innerText = "-"
      };
      totalLivePLElement.className = totalPlLive >= 0 ? "text-success" : "text-danger";
    }
  };
  calculateTotalPL();

  const handleTradeType =(type)=>{
    setTradeType(type);
    // setCurrentPage(1);
  }

  

  const handleShow = (item, type) => {
    setOrderType(type);
    setValue(item);
    setIsModal(true);
  };

  const handleOnHide = () => {
    setIsModal(false);
  };

  return (
    <>
      <div className="row g-2 mb-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body py-3">
              <div className="row">
                <div className="col-md-12 d-flex">
                  <div className="btn-sm pt-0">
                    <button
                      className={
                        tradeType === "live"
                          ? "btn btn-purple me-2"
                          : "btn btn-purple-light me-2"
                      }
                      onClick={() => handleTradeType("live")}
                    >
                      Live
                    </button>
                    <button
                      className={
                        tradeType === "paper"
                          ? "btn btn-purple me-2"
                          : "btn btn-purple-light me-2"
                      }
                      onClick={() => handleTradeType("paper")}
                    >
                      Paper
                    </button>
                  </div>
                  {filteredList.length > 0 && (
                    <div className="ms-auto align-item-center pt-2">
                      <div className="text-lg-end">
                        <h5>
                          Total P&L:{" "}
                          {tradeType === "paper" ? (
                            <span id="paperTotalHoldingsPL"></span>
                          ) : (
                            <span id="liveTotalHoldingsPL"></span>
                          )}
                        </h5>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-body border-top">
              <div className="table-responsive custom_scroll">
                <table
                  id="myDataTable"
                  className="custom-table-2 myDataTable table align-middle table-bordered mb-0 dataTable"
                >
                  <thead>
                    <tr>
                      <th className="border-top-0">Instrument</th>
                      <th className="border-top-0">Trade Type</th>
                      <th className="border-top-0">Order Type</th>
                      <th className="border-top-0">Quantity</th>
                      <th className="border-top-0">Average Price</th>
                      <th className="border-top-0">LTP </th>
                      <th className="border-top-0">P&L</th>
                      <th className="border-top-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCurrentPageItems()?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.tradingSymbol}</td>
                        <td>
                          <span
                            className={`badge rounded-pill ${
                              item.tradeType.toLowerCase() === "paper"
                                ? "bg-grey text-dark"
                                : "badge badge-light-primary rounded-pill"
                            }`}
                          >
                            {item.tradeType}
                          </span>
                        </td>
                        <td>{item.orderType}</td>
                        <td id={`quantity_${item.token}_${item.tradeType.toLowerCase()}`}>{item.quantity}</td>
                        <td id={`price_${item.token}_${item.tradeType.toLowerCase()}`}>
                          {parseFloat(item.price).toFixed(2)}
                        </td>
                        <td
                          id={`lp_${item.tradeType.toLowerCase()}_${
                            item.token
                          }`}
                        >
                          {item.ltp}
                        </td>
                        <td
                          id={`pl_${item.tradeType.toLowerCase()}_${
                            item.token
                          }`}
                          className={
                            parseFloat(item.profitLoss) >= 0
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {parseFloat(item.profitLoss).toFixed(2)}
                        </td>
                        <td className="dt-body-center d-flex dt-body-right">
                          <button
                            className="btn btn-outline-success btn-sm me-2"
                            onClick={() => handleShow(item, "BUY")}
                          >
                            Buy
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleShow(item, "SELL")}
                          >
                            Sell
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {holdingListLoader ? (
                  <div className="row">
                    <div
                      className="col-2"
                      style={{ float: "none", margin: "auto" }}
                    >
                      <ThreeDots
                        height="40"
                        width="40"
                        radius="9"
                        color="#a2238f"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                      />
                    </div>
                  </div>
                ) : null}
                {!holdingListLoader && filteredList.length === 0 ? (
                  <div className="row">
                    <div
                      className="col-4 mt-4 text-center"
                      style={{ float: "none", margin: "auto"}}
                    >
                      <p className="pt-3 text-muted">Data not found</p>
                    </div>
                  </div>
                ) : null}
                {isModal && (
                  <PlaceOrderModal
                    showModal={isModal}
                    value={value}
                    tradeType={tradeType}
                    handleModalClose={handleOnHide}
                    orderType={orderType}
                    isHolding={true}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HoldingTable;
