import React, { useState, useEffect } from "react";
import PlaceOrderModal from "../../../../Modal/PlaceOrderModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getWatchList } from "../../../../../redux/features/stockSlice.js";
import SaveWatchListModal from "../../../../Modal/SaveWatchListModal.jsx";
import EditWatchListModal from "../../../../Modal/EditWatchListModal.jsx";
import { ThreeDots } from "react-loader-spinner";
import { fetchSocketSession } from "../../../../../services/socketService.js";
import { map } from "jquery";

const WatchListTable = () => {
  const [value, setValue] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [orderType, setOrderType] = useState("");
  const [isModalWatchlist, setIsModalWatchlist] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [canShow, setCanShow] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [socketData, setSocketData] = useState(null);
  const [mappedData, setMappedData] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  const data = useSelector((state) => state.stock.watchlist);
  const loader = useSelector((state) => state.stock.watchlistloader);

  useEffect(() => {
    fetchResponse();
  }, [data]);

  const fetchResponse = async () => {
    const response = await fetchSocketSession();
    setSocketData(response.data);
  };

  const handleShowSaveWatchList = () => {
    setIsModalWatchlist(true);
  };

  const HideSaveWatchList = () => {
    setIsModalWatchlist(false);
  };

  const handleShowEditWatchList = () => {
    setIsModalOpen(true);
  };

  const HideEditWatchList = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWatchList());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  useEffect(() => {
    let index = 0;
    setMappedData(
      data?.map((element) => {
        const item = {
          instrumentName: element.instrumentName,
          id: element.id,
          ltp: null,
          change: null,
          open: null,
          high: null,
          expiry: element.expiry,
          token: element.token,
          isStock: element.isStock,
          tradingSymbol: element.tradingSymbol,
          exchange: element.exchange,
          low: null,
          close: null,
          volume: null,
        };
        index++;
        return item;
      })
    );
  }, [data]);

  useEffect(() => {
    let sortedList = [...mappedData];
    if (sortColumn) {
      sortedList.sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        // Check if either value is blank
        if (valueA === "" || valueB === "") {
          if (valueA === "") {
            return 1; // Put blank value at the bottom
          }
          if (valueB === "") {
            return -1; // Put blank value at the bottom
          }
        }
        // Convert values to numbers if they are valid numbers
        const numA = Number(valueA);
        const numB = Number(valueB);

        // Check if both values are valid numbers
        if (!isNaN(numA) && !isNaN(numB)) {
          if (sortOrder === "asc") {
            return numA - numB; // Ascending order
          } else if (sortOrder === "desc") {
            return numB - numA; // Descending order
          }
        }

        // Convert both values to lowercase strings for case-insensitive comparison
        const stringA = String(valueA).toLowerCase();
        const stringB = String(valueB).toLowerCase();

        if (stringA < stringB) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (stringA > stringB) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    setSortedData(
      sortedList.filter((item) =>
        item.instrumentName.toLowerCase().includes(filterValue.toLowerCase())
      )
    );
  }, [mappedData, sortColumn, sortOrder, filterValue]);

  const handleOnhide = () => {
    setIsModal(false);
  };

  useEffect(() => {
    if (socketData === null) {
      return;
    }
    const socket = new WebSocket("wss://ws1.aliceblueonline.com/NorenWS/");

    socket.onopen = function () {
      let initCon = {
        susertoken: socketData.websocketSession,
        t: "c",
        actid: socketData.actId,
        uid: socketData.userId,
        source: "API",
      };
      socket.send(JSON.stringify(initCon));
    };

    socket.onmessage = function (msg) {
      let response = JSON.parse(msg.data);

      if (response.s === "OK") {
        pushChannelEvent();
      }
      if (response.hasOwnProperty("lp")) {
        populateList(response);
      }
    };

    socket.onclose = function () {
      console.log("WebSocket connection closed");
    };

    function pushChannelEvent() {
      let channelMap = mappedData
        ?.map((item) => `${item.exchange}|${item.token}`)
        .join("#");
      let json = {
        k: channelMap,
        t: "t",
      };
      socket.send(JSON.stringify(json));
    }

    // Cleanup function
    return () => {
      socket.close();
    };
  }, [socketData, data]);

  const populateList = (response) => {
    setMappedData((prevData) =>
      prevData.map((element) => {
        if (element.token === response.tk) {
          if (response.hasOwnProperty("lp")) {
            element.ltp = response.lp;
          }
          if (response.hasOwnProperty("pc")) {
            element.change = response.pc;
          }
          if (response.hasOwnProperty("o")) {
            element.open = response.o;
          }
          if (response.hasOwnProperty("h")) {
            element.high = response.h;
          }
          if (response.hasOwnProperty("l")) {
            element.low = response.l;
          }
          if (response.hasOwnProperty("c")) {
            element.close = response.c;
          }
          if (response.hasOwnProperty("v")) {
            element.volume = response.v;
          }
        }
        return element;
      })
    );
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }
  };

  const handleShow = (item, type) => {
    setOrderType(type);
    setValue(item);
    setIsModal(true);
  };

  return (
    <>
      <div className="row g-2 mb-5 mt-2">
        <div className="col-12">
          <div className="card">
            <div className="card-body py-3">
              <div className="row">
                <div className="col-md-8 d-flex">
                  <h6 className="card-title mb-2 pt-2">My Watchlist</h6>
                </div>
                <div className="col-md-4">
                  <div className="d-flex">
                    <div className="input-group ">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        aria-label="property-search"
                        aria-describedby="propertySearch"
                        value={filterValue}
                        onChange={handleFilterChange}
                      />
                      <span className="input-group-text" id="propertySearch">
                        <i className="fa fa-search" />
                      </span>
                    </div>

                    <div className="input-group justify-content-end">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => {
                          handleShowEditWatchList();
                        }}
                        disabled={sortedData?.length === 0 || canShow ? true : false}
                      >
                        <i className="fa fa-edit" />
                        <span className="d-none d-md-inline-block ms-2">Edit</span>
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => {
                          handleShowSaveWatchList();
                        }}
                        disabled={canShow ? true : false}
                      >
                        <i className="fa fa-plus" />
                        <span className="d-none d-md-inline-block ms-2">Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body border-top">
              <div className="table-responsive custom_scroll">
                <table
                  id="myDataTable"
                  className="myDataTable table align-middle table-bordered mb-0 mt-3 card-table"
                >
                  <thead>
                    <tr>
                      <th
                        className={
                          sortColumn === "instrumentName"
                            ? "border-top-0 sorted"
                            : "border-top-0 "
                        }
                        onClick={() => handleSort("instrumentName")}
                      >
                        Instrument <i className="fa-solid fa-sort"></i>
                      </th>
                      <th
                        className={sortColumn === "ltp" ? "border-top-0 sorted" : "border-top-0 "}
                        onClick={() => handleSort("ltp")}
                      >
                        LTP <i className="fa-solid fa-sort"></i>
                      </th>
                      <th
                        className={
                          sortColumn === "change" ? "border-top-0 sorted" : "border-top-0 "
                        }
                        onClick={() => handleSort("change")}
                      >
                        Change % <i className="fa-solid fa-sort"></i>
                      </th>
                      <th
                        className={sortColumn === "open" ? "border-top-0 sorted" : "border-top-0 "}
                        onClick={() => handleSort("open")}
                      >
                        Open <i className="fa-solid fa-sort"></i>
                      </th>
                      <th
                        className={sortColumn === "high" ? "border-top-0 sorted" : "border-top-0 "}
                        onClick={() => handleSort("high")}
                      >
                        High <i className="fa-solid fa-sort"></i>
                      </th>
                      <th
                        className={sortColumn === "low" ? "border-top-0 sorted" : "border-top-0 "}
                        onClick={() => handleSort("low")}
                      >
                        Low <i className="fa-solid fa-sort"></i>
                      </th>
                      <th
                        className={
                          sortColumn === "close" ? "border-top-0 sorted" : "border-top-0 "
                        }
                        onClick={() => handleSort("close")}
                      >
                        Close <i className="fa-solid fa-sort"></i>
                      </th>
                      <th
                        className={
                          sortColumn === "volume" ? "border-top-0 sorted" : "border-top-0 "
                        }
                        onClick={() => handleSort("volume")}
                      >
                        Volume <i className="fa-solid fa-sort"></i>
                      </th>
                      <th className="border-top-0 sorted">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item?.instrumentName + " "}
                          <small>{item?.exchange}</small>
                        </td>
                        <td id={`lp_${item?.token}`}>
                          {item.ltp === null ? "" : item.ltp}
                        </td>
                        <td
                          id={`pc_${item?.token}`}
                          className={
                            item.change >= 0 ? "text-success" : "text-danger"
                          }
                        >
                          {item.change === null ? "" : item.change}
                        </td>
                        <td id={`o_${item?.token}`}>
                          {item.open === null ? "" : item.open}
                        </td>
                        <td id={`h_${item?.token}`}>
                          {item.high === null ? "" : item.high}
                        </td>
                        <td id={`l_${item?.token}`}>{item.low === null ? "" : item.low}</td>
                        <td id={`c_${item?.token}`}>
                          {item.close === null ? "" : item.close}
                        </td>
                        <td id={`v_${item?.token}`}>
                          {item.volume === null ? "" : item.volume}
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
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => {
                              handleShow(item, "SELL");
                            }}
                          >
                            Sell
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {loader ? (
                  <div className="row">
                    <div className="col-2" style={{ float: "none", margin: "auto" }}>
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
                {(loader === false && sortedData.length === 0) ||
                sortedData.length === 0 ? (
                  <div className="row">
                    <div className="col-4  mt-4 text-center" style={{ float: "none", margin: "auto" }}>
                      <p className="pt-3 text-muted">Data not found</p>
                    </div>
                  </div>
                ) : null}

                {isModal && (
                  <PlaceOrderModal
                    showModal={isModal}
                    value={value}
                    handleModalClose={handleOnhide}
                    OrderType={orderType}
                    
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SaveWatchListModal
        showSaveWatchListModal={isModalWatchlist}
        handleSaveWatchListModalClose={HideSaveWatchList}
      />
      <EditWatchListModal
        showEditWatchListModal={isModalOpen}
        handleEditWatchListModalClose={HideEditWatchList}
      />
    </>
  );
};

export default WatchListTable;
