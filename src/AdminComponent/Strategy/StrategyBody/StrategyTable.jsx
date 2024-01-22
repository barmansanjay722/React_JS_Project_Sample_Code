import StrategyScriptCode from "../../Modal/StrategyScriptCode";
// import "./strategy.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { modifyStrategyStatus, deleteStrategy, getStrategyScript } from "../../../services/strategyService";
import { getStrategyListData } from "../../../redux/features/strategyAdminSlice";
import { successToast } from "../../../component/Toasts/Toasts";
import DateRangePicker from "react-bootstrap-daterangepicker";

const StrategyTable = () => {
    const dispatch = useDispatch();
    const [isModal, setIsModal] = useState();
    const [value, setValue] = useState("");
    const [disableBtn, setDisableBtn] = useState(-1);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [pageCount, setPageCount] = useState(0);

    const [strategyName, setStrategyName] = useState("");
    const [strategyStatus, setStrategyStatus] = useState("");
    const [createdOnStartDate, setCreatedOnStartDate] = useState("");
    const [createdOnEndDate, setCreatedOnEndDate] = useState("");
    let obj = {
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        strategyName: strategyName,
        strategyStatus: strategyStatus,
        createdOnStartDate: createdOnStartDate,
        createdOnEndDate: createdOnEndDate,
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize]);

    const fetchData = () => {
        dispatch(getStrategyListData(obj));
    };

    const loader = useSelector((state) => state.strategyAll.strategyListLoader);
    const data = useSelector((state) => state.strategyAll.strategyAllList);

    const total = useSelector((state) => state.strategyAll.strategyData);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        setPageCount(Math.ceil(total / pageSize));
    }, [total, pageSize]);

    const changeStrategyStatus = async (item, type, index) => {
        try {
            //backend api call for POST request
            setDisableBtn(index);
            const response = await modifyStrategyStatus(item?.id, type);
            if (response.status === 200) {
                successToast("Status Changed");
                setDisableBtn();
                dispatch(getStrategyListData(obj));
            }
            return response;
        } catch (error) {
            // console.log("error");
        }
    };

    const changeDeleteStatus = async (item) => {
        try {
            //backend api call for POST request

            const response = await deleteStrategy(item?.id);
            if (response.status === 200) {
                successToast("Delete Successfully");
                dispatch(getStrategyListData(obj));
            }
            return response;
        } catch (error) {
            // console.log("error");
        }
    };

    const handleShowStrategyScriptModal = async (item) => {
        try {
            // backend api call for get request
            const response = await getStrategyScript(item?.id);
            if (response.status === 200) {
                setValue(response.data);

                setIsModal(true);
            }
        } catch (error) {
            return error;
        }
    };

    const hideStrategyScriptModal = () => {
        setIsModal(false);
    };

    const handleChange = async () => {
        setCurrentPage(1);

        try {
            // backend api call for POST request

            obj = {
                strategyName: strategyName,
                strategyStatus: strategyStatus,
                createdOnStartDate: createdOnStartDate,
                createdOnEndDate: createdOnEndDate,
                limit: pageSize,
                offset: (currentPage - 1) * pageSize,
            };

            dispatch(getStrategyListData(obj));
        } catch {
            // console.log("error");
        }
    };
    const clearForm = () => {
        setStrategyName("");
        setStrategyStatus("");
        setCreatedOnStartDate("");
        setCreatedOnEndDate("");
        setCurrentPage(1);
        document.getElementById("dateRangePicker").value="";
        obj = {
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
            strategyName: "",
            strategyStatus: "",
            createdOnStartDate: "",
            createdOnEndDate: "",
        };
        dispatch(getStrategyListData(obj));
    };

    const handleEvent = (event, picker) => {
        // setCreatedOnStartDate(picker.startDate.format("DD-MM-YYYY"));
        // setCreatedOnEndDate(picker.endDate.format("DD-MM-YYYY"));
        // console.log(createdOnStartDate);
        // console.log(picker.startDate.format("YYYY-MM-DD"));
        // console.log(picker.endDate.format("YYYY-MM-DD"));
        picker.element.val(
                    picker.startDate.format('MM/DD/YYYY') +
                      ' - ' +
                      picker.endDate.format('MM/DD/YYYY')
                  );
        setCreatedOnStartDate(picker.startDate.format("YYYY-MM-DD"));
        setCreatedOnEndDate(picker.endDate.format("YYYY-MM-DD"));
    };
    const handleCancel = (event, picker) => {
              picker.element.val('');
              setCreatedOnStartDate('');
              setCreatedOnEndDate('');


            };
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
                                    <input type="text" className="form-control" placeholder="Strategy 2" autoComplete="on" value={strategyName} onChange={(e) => setStrategyName(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className="form-group my-2">
                                    <label htmlFor="" className="mb-1">
                                        Created On
                                    </label>
                                    {/* <input type="text" name="dates" className="form-control form-control-lg" /> */}
                                    <DateRangePicker  initialSettings={{ autoUpdateInput: false, locale: { cancelLabel: "Clear" } }}
                                     onCancel={handleCancel}
                                     onApply={handleEvent}>
                                        <input type="text" id="dateRangePicker" className="form-control" defaultValue="" />
                                    </DateRangePicker>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4">
                                <div className="form-group my-2">
                                    <label htmlFor="" className="mb-1">
                                        Status
                                    </label>
                                    <select className="array-select form-control form-select" aria-label="example" onChange={(e) => setStrategyStatus(e.target.value)} value={strategyStatus}>
                                        <option value="">----</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-6 mt-2 pt-1">
                                <button className="btn btn-sm bg-secondary text-white my-2 mt-4" type="button" onClick={handleChange}>
                                    Filter
                                </button>
                                &nbsp;
                                <button className="btn btn-sm btn-outline-secondary my-2 mt-4" type="button" onClick={() => clearForm()}>
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body border-top">
            <div className="table-responsive custom_scroll">
            <table id="myDataTable" className="myDataTable table align-middle table-bordered mb-0 card-table dataTable">
                <thead>
                    <tr>
                        <th className="border-top-0">Name</th>
                        <th className="border-top-0">Created On</th>
                        <th className="border-top-0">Status</th>
                        <th className="border-top-0">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <Link onClick={(e) => handleShowStrategyScriptModal(item)}>{item?.name}</Link>
                            </td>
                            <td>{item?.createdOn}</td>
                            <td className="dt-body-left">
                                <div className="input-group d-block">
                                    <button className={`${item?.status === true ? "btn btn-success btn-sm active text-white" : "btn btn-outline-success btn-sm"}`} type="button" onClick={(e) => changeStrategyStatus(item, "active", index)} disabled={index === disableBtn ? true : false} id={`active_${index}`}>
                                        <span className="d-none d-md-inline-block">Active</span>
                                    </button>
                                    <button className={`${item?.status === false ? "btn btn-secondary btn-sm active text-white" : "btn btn-outline-gray btn-sm"}`} type="button" onClick={(e) => changeStrategyStatus(item, "inactive", index)} disabled={index === disableBtn ? true : false} id={`inactive_${index}`}>
                                        <span className="d-none d-md-inline-block">InActive</span>
                                    </button>
                                </div>
                            </td>
                            <td>
                                <button className="btn text-danger" onClick={(e) => changeDeleteStatus(item)}>
                                <i className="fa fa-trash" /> 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           

            <div className="d-flex justify-content-lg-end mt-2 mt-md-0 mb-2">
                <div className="col text-lg-end">
                    {data?.length !== 0 && (
                        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="btn btn-sm text-muted me-2">
                          <i className="fas fa-angle-left"></i>
                        </button>
                    )}
                    {data?.length !== 0 && (
                        <><span className="color-900">
                            {currentPage}</span><span> of {pageCount}
                            </span></>
                    )}
                    {data?.length !== 0 && (
                        <button disabled={currentPage === pageCount} onClick={() => handlePageChange(currentPage + 1)} className="btn btn-sm text-muted ms-1">
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

            <StrategyScriptCode showStarategyScriptModal={isModal} handleStrategyScriptModalClose={hideStrategyScriptModal} scriptValue={value} />
         </div>
         </div>
        </>
    );
};
export default StrategyTable;
