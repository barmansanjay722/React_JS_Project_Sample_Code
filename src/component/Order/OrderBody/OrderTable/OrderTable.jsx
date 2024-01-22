import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { successToast } from "../../../Toasts/Toasts";
import { getOrderList, setOrders } from "../../../../redux/features/stockSlice";

import { cancleOrder } from "../../../../services/stockService";
import { ThreeDots } from "react-loader-spinner";

const OrderTable = () => {

    const [orderType, setOrderType] = useState("");
    
 
    const [filterValue, setFilterValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const dispatch = useDispatch();
    const data = useSelector((state) => state.stock.orders);
    // console.log(data);
    const loader = useSelector((state) => state.stock.orderListLoader);

    useEffect(() => {
        dispatch(getOrderList(""));
    }, [dispatch]);

    const exitOrder = async (item) => {
        try {
            let data = {
                exchange: item?.exchange,
                nestOrderNumber: item?.nestOrderNumber,
                tradingSymbol: item?.tradingSymbol,
            };
            // backend api call for POST request
            const CancleUserResponse = await cancleOrder(data);

            if (CancleUserResponse.status === 200 || CancleUserResponse.status === 201) {
                successToast("Order Cancel");
                dispatch(getOrderList(""));
              }
        } catch {
            // console.log("error");
        }
    };

  


    const handleOrder = async (type) => {
        dispatch(setOrders());
            dispatch(getOrderList(type));
            setOrderType(type);
            setCurrentPage(1);
    }
   

    const handleFilterChange = (e) => {
        setFilterValue(e.target.value);
        setCurrentPage(1);
    };

    const filteredData = useMemo(() => {
        return data?.filter((item) => item.instrument?.toLowerCase().includes(filterValue?.toLowerCase()) || item.tradingSymbol?.toLowerCase().includes(filterValue?.toLowerCase()));
    }, [data, filterValue]);
    const pagedData = useMemo(() => {
        return filteredData;
    }, [filteredData]);

    return (
        <>
            <div className="card-body py-3">
                <div className="row d-flex">
                    <div className="col-md-6 d-flex">
                        {/* <p className="pt-2 mb-0 me-2">Filter:</p> */}
                        <div className="btn-sm pt-0">
                        <button
                                className={orderType === "" ? "btn btn-purple me-2" : "btn btn-purple-light me-2"}
                                type="button"
                                aria-expanded="false"
                            
                                onClick={(e) => handleOrder("")}

                            >
                            All
                            </button>
                            <button
                                className={orderType === "pending" ? "btn btn-purple me-2" : "btn btn-purple-light me-2"}
                                type="button"
                                aria-expanded="false"
                                onClick={(e) => handleOrder("pending")}
                                
                            >
                                Pending
                            </button>

                            <button
                                className={orderType === "executed" ? "btn btn-purple me-2" : "btn btn-purple-light me-2"}
                                type="button"
                                onClick={(e) => handleOrder("executed")}
                                
                            >
                                Executed
                            </button>
                            <button
                                className={orderType === "tradebook" ? "btn btn-purple" : "btn btn-purple-light"}
                                type="button"
                                aria-expanded="false"
                                onClick={(e) => handleOrder("tradebook")}
                                
                            >
                                Trade Book
                            </button>
                        </div>
                    </div>
                    <div className="col-md-3 ms-auto">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search..." aria-label="property-search" aria-describedby="propertySearch" value={filterValue} onChange={handleFilterChange} />
                            <span className="input-group-text" id="propertySearch">
                                <i className="fa fa-search" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body border-top">
                <div className="table-responsive custom_scroll">
                    <table id="myDataTable" style={{ width: "100%", borderSpacing: "0 !important", fontFamily: "Nunito Sans,sans-serif" }} className="myDataTable table align-middle table-bordered mb-0 mt-3 card-table dataTable">
                        <thead>
                            <tr>
                                <th className="border-top-0">Time</th>
                                <th className="border-top-0">Trade Type</th>
                                <th className="border-top-0">Type</th>
                                <th className="border-top-0">Instrument</th>
                                <th className="border-top-0">Product</th>
                                <th className="border-top-0">Quantity</th>
                                <th className="border-top-0">Price</th>
                                {orderType!=='tradebook' && <th className="border-top-0">Status</th>}
                                {orderType!=='tradebook' && orderType !=='executed' && <th className="border-top-0">Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {pagedData?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.time}</td>
                                    <td>
                                        <span className={`${item?.tradeType.toLowerCase() === "paper" ? "badge bg-grey rounded-pill text-dark" : "badge badge-light-primary rounded-pill"}`}>{item?.tradeType}</span>
                                    </td>
                                    <td>
                                        <span className={`${item?.type.toLowerCase() === "buy" ? "text-success" : "text-danger"}`}>{item.type}</span>
                                    </td>
                                    <td>{item?.tradeType=="Paper"?item?.instrument:item?.tradingSymbol}</td>
                                    <td>{item?.product}</td>
                                    <td>{item.quantity}</td>
                                   <td>{item?.price}</td>
                                    {orderType!=='tradebook' && (
                                        <td>
                                            <span className={`${item?.status?.toLowerCase() === "open" ? "badge bg-light-info text-info" : item?.status?.toLowerCase() === "rejected" ? "badge bg-light-danger text-danger" : item?.status?.toLocaleLowerCase() === "complete" ? "badge bg-light-info text-success" : "badge bg-light text-muted"}`}>{item?.status}</span>
                                        </td>
                                    )}
                                    {orderType!=='tradebook' && orderType !=='executed'  && (
                                        <td>
                                            <div className="btn-group">
                                                {/* {item?.status === "Complete" && (
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        onClick={() => {
                                                            handleShow(item);
                                                        }}
                                                    >
                                                        Add
                                                    </button>
                                                )} */}

                                                {item?.status === "Open" && (
                                                    <button
                                                        className="btn btn-outline-gray"
                                                        onClick={() => {
                                                            exitOrder(item);
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {loader ? (
                        <div className="row">
                            {" "}
                            <div className="col-2" style={{ float: "none", margin: "auto" }}>
                                <ThreeDots height="40" width="40" radius="9" color="#a2238f" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} />
                            </div>
                        </div>
                    ) : null}
                    {loader === false && data.length === 0 && filteredData.length === 0 ? (
                        <div className="row">
                            {" "}
                            <div className="col-4 mt-4 text-center" style={{ float: "none", margin: "auto" }}>
                                <p className="pt-3 text-muted">Data not found</p>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};
export default OrderTable;