import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { getInactiveUserData } from "../../../../services/dashboardService";
const DashboardTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [loader,setLoader] = useState(true);
    // const [loader, setLoader] = useState(false);

    // const [limit,setLimit] = useState(5);
    // const [offset,setOffset] = useState(0);

    let obj = {
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
    };
  
    const { data } = getInactiveUserData(obj);
//    console.log("--->",data?.result);
    const record = data?.result;
    
    const total = data?.total;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        setPageCount(Math.ceil(total / pageSize));
       
    }, [total, pageSize]);

    return (
        <>
             
            <div className="card" >
                <div className="card-header">
                    <h6 className="card-title m-0">Inactive Users</h6>
                </div>
                <div className="card-body border-top">
                    <div className="table-responsive custom_scroll">
                        <table id="myDataTable" className="myDataTable table align-middle table-bordered mb-0 mt-3 card-table dataTable">
                            <thead>
                                <tr>
                                    <th className="border-top-0">Name </th>
                                    <th className="border-top-0">Subscription ID</th>
                                    <th className="border-top-0">Contact</th>
                                    <th className="border-top-0">Type </th>
                                    {/* <th className="border-top-0">Broker Name</th> */}
                                    <th className="border-top-0">Inactivity age</th>
                                </tr>
                            </thead>
                            <tbody>
                                {record?.map((item, index) => (
                                    <tr key={item?.id}>
                                        <td>
                                            <Link to="">{item?.name}</Link>
                                        </td>
                                        <td>{item?.subscriptionId}</td>

                                        <td>{item?.phoneNumber}</td>
                                        <td>
                                            <span className={`${item?.type.toLowerCase() === "algotic" ? "badge bg-success rounded-pill" : "badge bg-grey rounded-pill text-dark"}`}>{item?.type}</span>
                                        </td>

                                        <td>{item?.inactiveDays === null ? item?.inactiveDays : item?.inactiveDays + " days"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="d-flex justify-content-lg-end mt-2 mt-md-0">
                           
                                <div className="col text-lg-end">
                                {data?.result !== null  && (
                                    <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="btn btn-sm text-muted me-2">
                                       <i className="fas fa-angle-left"></i>
                                    </button>)}

                                    {data?.result !== null  && ( <><span className="color-900">
                                    {currentPage}</span><span> of {pageCount}
                                    </span></>)}

                                    {data?.result !== null  && (<button disabled={currentPage === pageCount} onClick={() => handlePageChange(currentPage + 1)} className="btn btn-sm text-muted ms-1">
                                    <i className="fas fa-angle-right"></i>
                                    </button>)}
                                </div>
                            
                        </div>
                        {data?.result === null &&  (
                                    <div className="row">
                                        {" "}
                                      <div className="col-4" style={{ float: "none", margin: "auto" }}>
                                            <p className="pt-3 text-muted">Data Not Available </p>
                                        </div>
                                    </div>
                                )}
                        {/* {record?.length === 0 ? loader && (
                                    <div className="row">
                                        {" "}
                                        <div className="col-2" style={{ float: "none", margin: "auto" }}>
                                            <ThreeDots height="40" width="40" radius="9" color="#a2238f" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} />
                                        </div>
                                    </div>
                                ): null} */}

                    </div>
                </div>
            </div>
        </>
    );
};
export default DashboardTable;
