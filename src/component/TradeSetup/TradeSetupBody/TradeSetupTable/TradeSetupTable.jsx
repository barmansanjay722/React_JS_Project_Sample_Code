import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTradeList } from "../../../../redux/features/tradeSlice";
import {
  modifyTradeStatus,
  deleteTradesetup,
} from "../../../../services/tradeService";
import { successToast } from "../../../Toasts/Toasts";
import { ThreeDots } from "react-loader-spinner";
import AlertInfoModal from "../../../Modal/TradeSetupModal/AlertInfoModal";

const TradeSetupTable = () => {
  const loader = useSelector((state) => state.trade.tradeListLoader);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [disableBtn, setDisableBtn] = useState(-1);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [query, setQuery] = useState("");

  let obj = {
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const fetchData = async () => {
    dispatch(getTradeList(obj));
  };
  const data = useSelector((state) => state.trade.autoTradeList);
  const total = useSelector((state) => state.trade.tradeData);
  const changeTradeStatus = async (item, type, index) => {
    try {
      //backend api call for POST request
      setDisableBtn(index);
      const response = await modifyTradeStatus(item?.id, type);
      if (response.status === 200) {
        successToast("Status Changed");
        setDisableBtn();
        dispatch(getTradeList(obj));
      }
    } catch (error) {
      // console.log("error");
    }
  };
  // const changeDeleteStatus = async (item) => {
  //   try {
  //     //backend api call for POST request

  //     const response = await deleteTradesetup(item?.id);
  //     if (response.status === 200) {
  //       successToast("Delete Successfully");

  //     }

  //     return response;
  //   } catch (error) {
  //     // console.log("error");
  //   }
  // };
  const changeDeleteStatus = async (item) => {
    try {
      //backend api call for POST request
      const response = await deleteTradesetup(item?.id);
      if (response.status === 200) {
        successToast("Delete Successfully");
        const updatedTotal = total - 1;
        const newPageCount = Math.ceil(updatedTotal / pageSize);
        if (currentPage > newPageCount) {
          setCurrentPage(newPageCount);
        }
        dispatch(getTradeList(obj));
        console.log("--->");
      }
      return response;
    } catch (error) {
      // console.log("error");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setPageCount(Math.ceil(total / pageSize));
  }, [total, pageSize]);

  const getClassNameForInactive = (item) => {
    if (item?.isActive === false) {
      return "btn btn-secondary btn-sm active text-white";
    }
    // else if (item?.stragegyIsActive === false) {
    //   return "btn btn-pink btn-sm active text-pink";
    // }
    else {
      return "btn btn-outline-gray btn-sm";
    }
  };
  
  const instrumentClick = () => {
   
  };

  return (
    <>
      <div className="table-responsive custom_scroll">
        <table
          id="myDataTable"
          className="custom-table-2 myDataTable table align-middle table-bordered mb-0 dataTable"
        >
          <thead>
            <tr>
              <th className="border-top-0">Instrument</th>
              <th className="border-top-0">Trade Type</th>
              <th className="border-top-0">Stock Type</th>
              <th className="border-top-0">Exchange</th>
              {/* <th className="border-top-0">Strategy</th> */}
              <th className="border-top-0">Quantity</th>
              <th className="border-top-0">OrderType</th>
              <th className="border-top-0">Stop Loss</th>
              <th className="border-top-0">Target Profit</th>
              <th className="border-top-0">Status</th>
              <th className="border-top-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <td onClick={instrumentClick}>{item?.instrument}</td>
                <td>
                  <span
                    className={
                      item?.tradeType?.toLowerCase() === "live"
                        ? "badge badge-light-primary rounded-pill"
                        : "badge bg-grey rounded-pill text-dark"
                    }
                  >
                    {item?.tradeType}
                  </span>
                </td>
                <td>{item?.stockType}</td>
                <td className="dt-body-left">{item?.exchange}</td>
                {/* <td>{item?.strategyName}</td> */}
                <td>{item?.lotSize}</td>
                <td>{item?.orderType}</td>
                <td>{item?.stopLossPrice}</td>
                <td>{item?.targetProfit}</td>
                <td className="dt-body-left">
                  <div className="input-group d-block">
                    <button
                      className={`${
                        item?.isActive === true
                          ? "btn btn-success btn-sm active text-white"
                          : "btn btn-outline-success btn-sm"
                      }`}
                      type="button"
                      onClick={(e) => changeTradeStatus(item, "active", index)}
                      disabled={index === disableBtn ? true : false}
                      id={`active_${index}`}
                    >
                      <span className="d-none d-md-inline-block">Active</span>
                    </button>
                    <button
                      className={getClassNameForInactive(item)}
                      type="button"
                      onClick={(e) =>
                        changeTradeStatus(item, "inactive", index)
                      }
                      disabled={index === disableBtn ? true : false}
                      id={`inactive_${index}`}
                    >
                      <span className="d-none d-md-inline-block">Inactive</span>
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    className="btn text-danger"
                    onClick={(e) => changeDeleteStatus(item)}
                  >
                    <i className="fa fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-lg-end mt-2 mt-md-0">
          <div className="col text-lg-end">
            {data?.length !== 0 && (
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="btn btn-sm text-muted me-2"
              >
                <i className="fas fa-angle-left"></i>
              </button>
            )}
            {data?.length !== 0 && (
              <>
                <span className="color-900">{currentPage}</span>
                <span> of {pageCount}</span>
              </>
            )}
            {data?.length !== 0 && (
              <button
                disabled={currentPage === pageCount}
                onClick={() => handlePageChange(currentPage + 1)}
                className="btn btn-sm text-muted ms-1"
              >
                <i className="fas fa-angle-right"></i>
              </button>
            )}
          </div>
        </div>

        {loader ? (
          <div className="row">
            {" "}
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
        {loader === false && data.length === 0 ? (
          <div className="row">
            {" "}
            <div className="col-4" style={{ float: "none", margin: "auto" }}>
              <p className="pt-3 text-muted">Data not found</p>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default TradeSetupTable;
