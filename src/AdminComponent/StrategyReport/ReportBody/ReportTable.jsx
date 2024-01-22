import { getStrategyReport } from "../../../services/dashboardService";
import { useState,useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
const ReportTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [loader, setLoader] = useState(true);
   
    let obj = {
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
    };
   
    const response = getStrategyReport(obj);
//    console.log(response);
    const record = response?.data?.result;
    
    const total = response?.data?.total;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        setPageCount(Math.ceil(total / itemsPerPage));
       
    }, [total, itemsPerPage]);

    return (
        <>
            <div className="col-xxl-12 col-xl-12 col-lg-12" >
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive custom_scroll">
                            <table id="myDataTable" className="myDataTable table align-middle table-bordered mb-0 mt-3 card-table dataTable">
                                <thead>
                                    <tr>
                                        <th className="border-top-0">Strategy Id</th>
                                        <th className="border-top-0">Strategy Name</th>
                                        <th className="border-top-0">Usage Of Strategy</th>
                                        <th className="border-top-0">No Of User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {record?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.strategyId}</td>
                                            <td>{item?.strategyName}</td>
                                            <td>{item?.usageOfStrategy}</td>
                                            <td>{item?.noOfUser}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-lg-end mt-2 mt-md-0">
                           
                           <div className="col text-lg-end">
                           { response?.data !== null && (
                               <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="btn btn-sm text-muted me-2">
                                  <i className="fas fa-angle-left"></i>
                               </button>)}

                               { response?.data !== null  && ( <><span className="color-900">
                                        {currentPage}</span><span> of {pageCount}
                                        </span></>)}

                               { response?.data !== null && (<button disabled={currentPage === pageCount} onClick={() => handlePageChange(currentPage + 1)} className="btn btn-sm text-muted ms-1">
                               <i className="fas fa-angle-right"></i>
                               </button>)}
                           </div>
                       
                   </div>
                   {response?.data === null &&  (
                                    <div className="row">
                                        {" "}
                                      <div className="col-4" style={{ float: "none", margin: "auto" }}>
                                            <p className="text-muted py-3">Data Not Available </p>
                                        </div>
                                    </div>
                                )}
                            {/* {record?.length === 0 ? (
                                <div className="row">
                                    {" "}
                                    <div className="col-2" style={{ float: "none", margin: "auto" }}>
                                        <ThreeDots height="40" width="40" radius="9" color="#a2238f" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} />
                                    </div>
                                </div>
                            ) : null} */}
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ReportTable;
