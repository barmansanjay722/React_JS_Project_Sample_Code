import { useState, useEffect,useMemo } from "react";
// import "./Customer.css";
import { ThreeDots } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { getCustomerList } from "../../../redux/features/customerSlice";
import { deleteCustomer, getInvoiceCustomer, modifyCustomerStatus } from "../../../services/dashboardService";
import { successToast } from "../../../component/Toasts/Toasts";
import DateRangePicker from "react-bootstrap-daterangepicker";

const CustomerTable = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [customerName, setCustomerName] = useState("");
    const [customerType, setCustomerType] = useState("");
    const [customerStatus, setcustomerStatus] = useState("");
    const [customerPayment, setCustomerPayment] = useState("");

    const [customerRenewalStartDate, setCustomerRenewalStartDate] = useState("");
    const [customerRenewalEndDate, setCustomerRenewalEndDate] = useState("");
    const [customerLastActiveStartDate, setCustomerLastActiveStartDate] = useState("");
    const [customerLastActiveEndDate, setCustomerLastActiveEndDate] = useState("");
    let obj = {
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        customerName: customerName,
        customerType: customerType,
        customerStatus: customerStatus,
        customerPayment: customerPayment,
        customerRenewalStartDate: customerRenewalStartDate,
        customerRenewalEndDate: customerRenewalEndDate,
        customerLastActiveStartDate: customerLastActiveStartDate,
        customerLastActiveEndDate: customerLastActiveEndDate,
    };
    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize]);

    const fetchData = () => {
        dispatch(getCustomerList(obj));
    };

    const loader = useSelector((state) => state.customer.customerListLoader);
    const data = useSelector((state) => state.customer.customerList);
    const total = useSelector((state) => state.customer.customerData);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        setPageCount(Math.ceil(total / pageSize));
    }, [total, pageSize]);

    const handleChange = async () => {
        setCurrentPage(1);
        try {
            // backend api call for POST request
            obj = {
                limit: pageSize,
                offset: 0,
                customerName: customerName,
                customerType: customerType,
                customerStatus: customerStatus,
                customerPayment: customerPayment,
                customerRenewalStartDate: customerRenewalStartDate,
                customerRenewalEndDate: customerRenewalEndDate,
                customerLastActiveStartDate: customerLastActiveStartDate,
                customerLastActiveEndDate: customerLastActiveEndDate,
            };
            dispatch(getCustomerList(obj));
        } catch {
            // console.log("error");
        }
    };
    const changeDeleteStatus = async (item) => {
        try {
            //backend api call for POST request

            const response = await deleteCustomer(item?.id);
            if (response.status === 200) {
                successToast("Delete Successfully");
                dispatch(getCustomerList(obj));
            }

            return response;
        } catch (error) {
            // console.log("error");
        }
    };

    const handleEvent = (event, picker) => {
        // console.log(picker.startDate.format("YYYY-MM-DD"));
        // console.log(picker.endDate.format("YYYY-MM-DD"));
        picker.element.val(
            picker.startDate.format('MM/DD/YYYY') +
              ' - ' +
              picker.endDate.format('MM/DD/YYYY')
          );
        setCustomerLastActiveStartDate(picker.startDate.format("YYYY-MM-DD"));
        setCustomerLastActiveEndDate(picker.endDate.format("YYYY-MM-DD"));
    };
    const handleEventRenewalDate = (event, picker) => {
        // console.log(picker.startDate.format("YYYY-MM-DD"));
        // console.log(picker.endDate.format("YYYY-MM-DD"));
        picker.element.val(
            picker.startDate.format('MM/DD/YYYY') +
              ' - ' +
              picker.endDate.format('MM/DD/YYYY')
          );
        setCustomerRenewalStartDate(picker.startDate.format("YYYY-MM-DD"));
       setCustomerRenewalEndDate(picker.endDate.format("YYYY-MM-DD"));
    };
    const clearForm = () => {
        setCurrentPage(1);
        setCustomerName("");
        setCustomerType("");
        setcustomerStatus("");
        setCustomerPayment("");
        setCustomerLastActiveStartDate("");
        setCustomerLastActiveEndDate("");
        setCustomerRenewalStartDate("");
        setCustomerRenewalEndDate("");
        document.getElementById("dateRangePicker").value="";
        document.getElementById("dateRangePickerRenewal").value="";
        obj = {
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
            customerName: "",
            customerType: "",
            customerStatus: "",
            customerPayment: "",
            customerRenewalStartDate: "",
            customerRenewalEndDate: "",
            customerLastActiveStartDate: "",
            customerLastActiveEndDate: "",
        };
        dispatch(getCustomerList(obj));
    };

    const changeCustomerStatus = async (item, type, index) => {
        try {
            // backend api call for post request
            const response = await modifyCustomerStatus(item?.id, type);
            if (response.status === 200) {
                successToast("Customer is " + type);
                dispatch(getCustomerList(obj));
            }
        } catch (error) {
            // console.log("error");
        }
    };

    const Invoice = async (item) => {
        try {
            // backend api call for get request
            const response = await getInvoiceCustomer(item?.id);
            const name =  item?.name +" Invoice";
            if (response.status === 200) {
                successToast("Invoice downloaded");
                const blob = new Blob([response.data], { type: 'application/pdf; charset=utf-8' });
                // console.log("RESPONSE BLOB: ", blob);
                const url= URL.createObjectURL(blob);
                // window.open(url);
                // console.log("----->",url);
                let alink = document.createElement('a');
                    alink.href = url;
                    alink.download = name;
                    alink.click(); 
                  
               
                
            }
        } catch (error) {
            return error;
        }
    };
   
    const handleCancel = (event, picker) => {
        picker.element.val('');
        setCustomerLastActiveStartDate('');
        setCustomerLastActiveEndDate('');
      };
      const handleCancelRenewalDate = (event, picker) =>{
        picker.element.val('');
        setCustomerRenewalStartDate('');
        setCustomerRenewalEndDate('');
      }

      
    return (
        <>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12" >
                        <div className="row">
                            <div className="col-lg-3 col-md-4">
                                <div className="form-group my-2">
                                    <label htmlFor="" className="mb-1">
                                        Name
                                    </label>
                                    <input type="text" className="form-control" placeholder="Firoj" autoComplete="on" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                                </div>
                            </div>
                            {/* <div className="col-lg-3 col-md-4">
                                <div className="form-group my-2">
                                    <label htmlFor="" className="mb-1">
                                        ID
                                    </label>
                                    <input type="text" className="form-control" placeholder="00A" />
                                </div>
                            </div> */}
                            <div className="col-lg-3 col-md-4">
                                <div className="form-group my-2">
                                    <label htmlFor="" className="mb-1">
                                        Type
                                    </label>
                                    <select className="array-select form-control form-select" aria-label="example" value={customerType} onChange={(e) => setCustomerType(e.target.value)}>
                                        <option value="">----</option>
                                        <option value="Free Trial">Free Trial</option>
                                        {/* <option value="Broker">Broker</option> */}
                                        <option value="AlgoTic">AlgoTic</option>
                                    </select>
                                </div>
                            </div>
                            {/* <div className="col-lg-3 col-md-4">
                                <div className="form-group my-2">
                                    <label htmlFor="" className="mb-1">
                                        Broker Name
                                    </label>
                                    <select name="" id="" className="form-select">
                                        <option value="">----</option>
                                        <option value="">Alice Blue</option>
                                        <option value="">AlgoTic</option>
                                        <option value="">Other</option>
                                    </select>
                                </div>
                            </div> */}
                            <div className="col-lg-3 col-md-4">
                                <div className="form-group my-2">
                                    <label htmlFor="" className="mb-1">
                                        Last Active
                                    </label>
                                    {/* <input
                                        type="date"
                                        name="dates"
                                        className="form-control form-control-lg"
                                        /> */}
                                    <DateRangePicker initialSettings={{ autoUpdateInput: false, locale: { cancelLabel: "Clear" } }}
                                     onCancel={handleCancel}
                                     onApply={handleEvent}>
                                        <input type="text" id="dateRangePicker" className="form-control" />
                                    </DateRangePicker>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className="form-group my-2">
                                    <label htmlFor="" className="mb-1">
                                        Renewal Date
                                    </label>
                                    {/* <input type="text" name="dates" className="form-control form-control-lg" /> */}
                                    <DateRangePicker  initialSettings={{ autoUpdateInput: false, locale: { cancelLabel: "Clear" } }} 
                                    onCancel={handleCancelRenewalDate} 
                                    onApply={handleEventRenewalDate}
                                    maxDate={customerRenewalEndDate}>
                                        <input type="text" id="dateRangePickerRenewal" className="form-control" />
                                    </DateRangePicker>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className="form-group my-2">
                                    <label htmlFor="" className="mb-1">
                                        Status
                                    </label>
                                    <select className="array-select form-control form-select" aria-label="example" value={customerStatus} onChange={(e) => setcustomerStatus(e.target.value)}>
                                        <option value="">----</option>
                                        {/* <option value="Pending">Pending</option> */}
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Blocked">Blocked</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className="form-group my-2">
                                    <label htmlFor="" className="mb-1">
                                        Payment
                                    </label>
                                    <select className="array-select form-control form-select" aria-label="example" value={customerPayment} onChange={(e) => setCustomerPayment(e.target.value)}>
                                        <option value="">----</option>
                                        <option value="Due">Due</option>
                                        <option value="Paid">Paid</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-6 mt-2 pt-1">
                                <button className="btn btn-sm bg-secondary text-white my-3 mt-4" type="button" onClick={handleChange}>
                                    Filter
                                </button>
                                &nbsp;
                                <button className="btn btn-sm btn-outline-secondary my-3 mt-4" type="button" 
                                onClick={() => clearForm()}>
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body border-top">
                <div className="table-responsive custom_scroll">
                    <table id="myDataTable" className="myDataTable table align-middle table-bordered mb-0  card-table dataTable">
                        <thead>
                            <tr>
                                <th className="border-top-0">Name</th>
                                {/* <th className="border-top-0">ID</th> */}
                                <th className="border-top-0">Type</th>
                                {/* <th className="border-top-0">Broker </th> */}
                                <th className="border-top-0">Phone Number </th>
                                <th className="border-top-0">Last Active</th>
                                <th className="border-top-0">Renewal </th>
                                <th className="border-top-0">Status</th>
                                <th className="border-top-0">Payment</th>
                                <th className="border-top-0">Action</th>
                                {/* <th className="border-top-0">Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.name}</td>
                                    {/* <td>{item?.id}</td> */}
                                    <td>
                                        <span className={`${item?.type?.toLowerCase() === "algotic" ? "badge bg-success rounded-pill" : "badge bg-grey rounded-pill text-dark"}`}>{item?.type}</span>
                                    </td>
                                    <td>{item?.phoneNumber}</td>
                                    <td>{item?.lastActive}</td>
                                    <td>{item?.renewal}</td>
                                    <td>
                                        <span className={`${item?.status.toLowerCase() === "active" ? "badge bg-light-success text-success" : item?.status.toLowerCase() === "inactive" ? "badge bg-light text-dark" : item?.status.toLowerCase() === "pending" ? "badge bg-light-warning text-warning" : "badge bg-light-danger text-danger"}`}>{item?.status}</span>
                                    </td>
                                    <td>
                                        <span className=" text-danger">{item?.payment} </span>
                                    </td>
                                    <td>
                                        <div className="d-flex" >
                                         
                                               

                                             {/* (<button type="button" className="btn" style={{color:"white",border:"none",cursor: "default"}}>
                                              <i className="fa fa-download" /> invoice
                                              </button>)  */}
                                             
                                           
                                            <div className="btn-group px-2">
                                                {item.status === "BLOCKED" || item?.status === "INACTIVE" ? (
                                                    <button type="button" className="btn text-success" onClick={(e) => changeCustomerStatus(item, "Active", index)}>
                                                        <i className="fa-solid fa-user-check" title="User active" />
                                                    </button>
                                                ) : (
                                                    // <button type="button" className="btn btn-sm btn-outline-danger" onClick={(e) => changeCustomerStatus(item, "Blocked", index)}>
                                                    //     <i className="fa fa-user" /> Block
                                                    // </button>
                                                    <button className="btn text-danger" onClick={(e) => changeCustomerStatus(item, "Blocked", index)}><i className="fa-solid fa-user-xmark" title="User blocked" /></button>
                                            
                                                )}
                                            </div>
                                            <div className="px-2">
                                            <button className="btn text-danger" onClick={(e) => changeDeleteStatus(item)}><i className="fa fa-trash" title="Delete"></i></button>
                                                {/* <button className="btn btn-outline-danger" onClick={(e) => changeDeleteStatus(item)}>
                                                <i className="fa fa-trash" /> Delete
                                                </button> */}
                                            </div>
                                            {item?.payment === "Paid" ? (   <div className="btn-group px-2">
                                                    <button type="button" className="btn text-primary" onClick={(e) => Invoice(item)}>
                                                        <i className="fa fa-download" title="Invoice download" /> 
                                                    </button> </div>
                                              ) : null }
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="d-flex justify-content-lg-end mt-2 mt-md-0">
                        <div className="col text-lg-end">
                            {data?.length !== 0 && (
                                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}  className="btn btn-sm text-muted me-2">
                                  <i className="fas fa-angle-left"></i>
                                </button>
                            )}
                            {data?.length !== 0 && (
                                <><span className="color-900">
                                    {currentPage}</span><span> of {pageCount}
                                    </span></>
                            )}
                            {data?.length !== 0 && (
                                <button disabled={currentPage === pageCount} onClick={() => handlePageChange(currentPage + 1)}  className="btn btn-sm text-muted ms-1">
                                    <i className="fas fa-angle-right"></i>
                                </button>
                            )}
                        </div>
                    </div>

                    {loader ? (
                        <div className="row">
                            {" "}
                            <div className="col-2" style={{ float: "none", margin: "auto" }}>
                                <ThreeDots height="40" width="40" radius="9" color="#a2238f" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} />
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
            </div>
        </>
    );
};
export default CustomerTable;
