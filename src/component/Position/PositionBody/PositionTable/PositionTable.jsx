import React, { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import PlaceOrderModal from "../../../Modal/PlaceOrderModal";
import { positionSellOff } from "../../../../services/stockService";
import { getPositionList } from "../../../../redux/features/stockSlice";
import { successToast } from "../../../Toasts/Toasts";

function PositionList() {
  const [tradeType, setTradeType] = useState("live");
  // const [currentPage, setCurrentPage] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const [value, setValue] = useState(null);
  const [orderType, setOrderType] = useState("");
  const [transactionType, setTransactionType] = useState("BUY");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.stock.positions);

  const loader = useSelector((state) => state.stock.positionListLoader);
  const socketToken = useSelector((state) => state.auth.webSocketSession);
  const actid = useSelector((state) => state.auth.actid);
  const uid = useSelector((state) => state.auth.webuserId);
  const positionSocketRef = useRef(null);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getPositionList());
  }, [dispatch]);

  useEffect(() => {
    positionSocketRef.current = new WebSocket(
      "wss://ws1.aliceblueonline.com/NorenWS/"
    );

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
  }, [data,tradeType]);

  const mapData = () => {
    let index = 0;
    return data?.map((element) => {
      const item = {
        tradeType: element.tradeType,
        instrumentName: element.instrumentName,
        tradingSymbol: element.tradingSymbol,
        exchange: element.exchange,
        isStock: element.isStock,
        orderType: element.orderType,
        token: element.token,
        price: element.buyAverage,
        sellAvgPrice: element.sellAverage,
        buyAvgPrice: element.buyAverage,
        netSellAvgPrice: element.netSellAvgPrice,
        netBuyAvgPrice: element.netBuyAvgPrice,
        quantity: element.quantity,
        ltp:
          element.lastTradePrice === null
            ? 0
            : parseFloat(element.lastTradePrice),
        profitLoss: calculatePl(
          element.netSellAvgPrice,
          element.netBuyAvgPrice,
          element.netSellQty,
          element.netBuyQty,
          element.quantity,
          element.lastTradePrice
        ),
        calcProfitLoss: calculatePl(
          element.netSellAvgPrice,
          element.netBuyAvgPrice,
          element.netSellQty,
          element.netBuyQty,
          element.quantity,
          element.lastTradePrice
        ),
        netSellQty: element.netSellQty,
        netBuyQty: element.netBuyQty,
        blQty: element.blQty,
        netQuantity: element.netQuantity,
      };
      index++;
      return item;
    });
  };

  const getCurrentPageItems = () => {
    return filteredList;
  };

  const handleShow = (item, type) => {
    setOrderType(type);
    setValue(item);
    setTransactionType(type);
    setIsModal(true);
  };

  const handleOnhide = () => {
    setIsModal(false);
  };

  const exitPosition = async (item) => {
    let requestData = {
      token: item.token,
      productCode: item.orderType,
      price: item.ltp,
      tradeType: item.tradeType
    };
    const response = await positionSellOff(requestData);
    if (response.status === 200) {
      successToast("Squared Off Successfully");
      dispatch(getPositionList());
    }
  };

  const populateListWithPLAndCurrentValue = (token, lp) => {
    try {
      filteredList.forEach((element) => {
        if (element.token === token) {
          element.ltp = lp;
          let r = parseFloat(element.quantity);
          let orderType = element.orderType;
          const lpElement = document.getElementById(
            `lp_${element.tradeType.toLowerCase()}_${token}_${orderType}`
          );
          if (lpElement != null && !isNaN(lp)) {
            lpElement.innerText = lp;
          }
          if (lp !== undefined && r !== 0) {
         
            const qtyElement = document.getElementById(`lp_${token}_quantity`);

            let quantity =
              qtyElement === undefined || qtyElement === null
                ? 1
                : parseFloat(qtyElement.innerText);
            if ((r < 0 || r > 0) && (quantity < 0 || quantity > 0)) {
              let pl = calculatePl(
                element.netSellAvgPrice,
                element.netBuyAvgPrice,
                element.netSellQty,
                element.netBuyQty,
                element.quantity,
                lp
              );
              element.calcProfitLoss = pl;

              const plElement = document.getElementById(
                `pl_${element.tradeType.toLowerCase()}_${token}_${orderType}`
              );
              if (plElement != null) {
                plElement.innerText = pl.toFixed(2);
                plElement.className = pl >= 0 ? "text-success" : "text-danger";
              }
            }
          } else {
            let pl = element.profitLoss;

            const plElement = document.getElementById(
              `pl_${element.tradeType.toLowerCase()}_${token}_${orderType}`
            );

            if (plElement != null) {
              plElement.innerText = pl.toFixed(2);

              plElement.className = pl >= 0 ? "text-success" : "text-danger";
            }
          }
        }
      });
      populateTotalPL();
    } catch (e) {
      // console.log(e);
    }
  };
  const calculatePl = (
    netSellAvgPrice,
    netBuyAvgPrice,
    netSellQty,
    netBuyQty,
    quantity,
    lp
  ) => {
    let calcProfitLoss = 0.0;

    if (quantity < 0) {
      calcProfitLoss =
        quantity * (netSellAvgPrice - lp) * -1 +
        netBuyQty * (netSellAvgPrice - netBuyAvgPrice);
    } else if (quantity > 0) {
      calcProfitLoss =
        quantity * (lp - netBuyAvgPrice) +
        netSellQty * (netSellAvgPrice - netBuyAvgPrice);
    } else {
      calcProfitLoss = netBuyQty * netSellAvgPrice - netBuyQty * netBuyAvgPrice;
    }

    let pl = parseFloat(calcProfitLoss);
    return pl;
  };
  const pushChannelEvent = () => {
    let channelMap = filteredList
      .map((item) => `${item.exchange}|${item.token}`)
      .join("#");
    let json = {
      k: channelMap,
      t: "t",
    };
    positionSocketRef.current.send(JSON.stringify(json));
  };

  const filteredList = useMemo(() => {
    return mapData().filter(
      (item) => item.tradeType.toLowerCase() === tradeType
    );
  }, [data, tradeType]);


  const handleTradeType = (type) => {
    setTradeType(type);
  };

  const populateTotalPL = () => {
    let totalPlLive = 0;
    let totalPlPaper = 0;
    for (let i = 0; i < filteredList.length; i++) {
      const element = filteredList[i];
      if (element.quantity > 0 || element.quantity < 0) {
        if (element.tradeType.toLowerCase() === "paper") {
          // debugger;
          totalPlPaper += element.calcProfitLoss;
        } else if (element.tradeType.toLowerCase() === "live") {
          totalPlLive += element.calcProfitLoss;
        }
      } else {
        if (element.tradeType.toLowerCase() === "paper") {
          // debugger;
          totalPlPaper += element.profitLoss;
        } else if (element.tradeType.toLowerCase() === "live") {
          totalPlLive += element.profitLoss;
        }
      }
    }
    const totalPaperPLElement = document.getElementById("paperTotalPositionPL");
    if (totalPaperPLElement) {
      totalPaperPLElement.innerText = totalPlPaper.toFixed(2);
      totalPaperPLElement.className =
        totalPlPaper >= 0 ? "text-success" : "text-danger";
    }
    const totalLivePLElement = document.getElementById("liveTotalPositionPL");
    if (totalLivePLElement) {
      totalLivePLElement.innerText = totalPlLive.toFixed(2);
      totalLivePLElement.className =
        totalPlLive >= 0 ? "text-success" : "text-danger";
    }
  };
  populateTotalPL();

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
                      aria-expanded="false"
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
                  <div className="ms-auto align-item-center pt-2">
                    {filteredList.length > 0 && (
                      <div className="text-lg-end">
                        <h5>
                          Total P&amp;L :{" "}
                          {tradeType === "paper" ? (
                            <span id="paperTotalPositionPL"></span>
                          ) : (
                            <span id="liveTotalPositionPL"></span>
                          )}
                        </h5>
                      </div>
                    )}
                  </div>
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
                      <th className="border-top-0">Buy Average</th>
                      <th className="border-top-0">Sell Average</th>
                      <th className="border-top-0">LTP</th>
                      <th className="border-top-0">P&amp;L</th>
                      <th className="border-top-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCurrentPageItems()?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item.instrumentName + " "}
                          <small>{item?.exchange}</small>
                        </td>
                        <td>
                          <span
                            className={`${
                              item?.tradeType.toLowerCase() === "paper"
                                ? "badge bg-grey rounded-pill text-dark"
                                : "badge badge-light-primary rounded-pill"
                            }`}
                          >
                            {item.tradeType}
                          </span>
                        </td>
                        <td>{item.orderType}</td>
                        <td
                          id={`lp_${item.tradeType.toLowerCase()}_${
                            item?.token
                          }_quantity`}
                        >
                          {item.quantity}
                        </td>
                        <td>
                          {parseFloat(
                            item.netBuyAvgPrice.split(",").join("")
                          ).toFixed(2)}
                        </td>
                        <td>
                          {parseFloat(
                            item.netSellAvgPrice.split(",").join("")
                          ).toFixed(2)}
                        </td>
                        <td
                          id={`lp_${item.tradeType.toLowerCase()}_${
                            item?.token
                          }_${item?.orderType}`}
                        >
                          {parseFloat(item.ltp).toFixed(2)}
                        </td>
                        <td>
                          <span
                            id={`pl_${item.tradeType.toLowerCase()}_${
                              item?.token
                            }_${item?.orderType}`}
                            className={`${
                              parseFloat(item.profitLoss).toFixed(2) >= 0
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {parseFloat(item.profitLoss).toFixed(2)}
                          </span>
                        </td>
                        <td className="dt-body-center d-flex dt-body-right">
                          <button
                            className="btn btn-outline-success btn-sm me-2"
                            onClick={() => {
                              handleShow(item, "BUY");
                            }}
                          >
                            Buy
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm me-2"
                            onClick={() => handleShow(item, "SELL")}
                          >
                            Sell
                          </button>
                          {item.quantity != 0 && (
                            <button
                              className="btn btn-outline-gray btn-sm"
                              onClick={() => {
                                exitPosition(item);
                              }}
                            >
                              Exit
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {loader ? (
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
                {loader === false && filteredList.length === 0 ? (
                  <div className="row">
                    <div
                      className="col-4 mt-4 text-center"
                      style={{ float: "none", margin: "auto" }}
                    >
                      <p className="pt-3 text-muted">Data not found</p>
                    </div>
                  </div>
                ) : null}
                {isModal && (
                  <PlaceOrderModal
                    showModal={isModal}
                    tradeType={tradeType}
                    value={value}
                    handleModalClose={handleOnhide}
                    orderType={orderType}
                    transactionType={transactionType}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PositionList;
