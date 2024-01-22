import { Container, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { placeOrderInitValues } from "../../utils/initialValues";
import { placeOrderForm } from "../../validations/orderValidation";
import { placeOrder } from "../../services/stockService";
import { useState } from "react";
import { errorToast, successToast } from "../Toasts/Toasts";
import { useDispatch } from "react-redux";
import { getHoldingsList } from "../../redux/features/stockSlice";
import { getPositionList } from "../../redux/features/stockSlice";
import { useEffect } from "react";
import { fetchSocketSession } from "../../services/socketService";

const PlaceOrderModal = ({ showModal, value, tradeType, handleModalClose, transactionType, isHolding }) => {
    const [isShowModal] = useState(showModal);
    const [isShowPrice, setIsShowPrice] = useState(false);
    const [isTriggerPrice, setIsTriggerPrice] = useState(false);
    const [disabledStocks, setDisabledStocks] = useState(true);
    const [disabledNormal, setDisabledNormal] = useState(true);
    const [isCheckBox, setIsCheckBox] = useState("Place Order");
    const [ltpAccount, setLtpAccount] = useState(null);

    const [canShow, setCanShow] = useState(null);
    const dispatch = useDispatch();
    const onSubmit = async (values, onSubmitProps) => {
        await stockOrder(values, onSubmitProps);
    };

    let token = value?.token;
    let orderType = value?.orderType;

    useEffect(() => {
        repeat();
        value?.isStock === true ? setDisabledNormal(false) && setDisabledStocks(true) : setDisabledStocks(false);
    });

    const repeat = () => {
        let ltp_account = null;
        if (document.getElementById("lp_" + token) != null) {
            ltp_account = document.getElementById("lp_" + token).innerText;
        } else if (document.getElementById("lp_" + tradeType?.toLowerCase() + "_" + token + "_" + orderType) != null) {
            ltp_account = document.getElementById("lp_" + tradeType?.toLowerCase() + "_" + token + "_" + orderType).innerText;
        } else if (document.getElementById("lp_" + tradeType?.toLowerCase() + "_" + token)) {
            ltp_account = document.getElementById("lp_" + tradeType?.toLowerCase() + "_" + token).innerText;
        }
        if (document.getElementById("ltp_" + token + "_" + orderType) !== null) {
            document.getElementById("ltp_" + token + "_" + orderType).innerText = ltp_account;
        }
        setLtpAccount(ltp_account);
    };
    setInterval(function () {
        repeat();
    }, 1000); //logs hi every second

    const stockOrder = async (data, onSubmitProps) => {
        try {
            // backend api call for POST request
            const savedUserResponse = await placeOrder(data);

            if (savedUserResponse.status === 200 || savedUserResponse.status === 201) {
                successToast("Order Placed");
                dispatch(getHoldingsList());
                dispatch(getPositionList());
                handleModalClose();
            } else if (savedUserResponse.response.status === 404) {
                errorToast(savedUserResponse.response.data.errorMessage);
                handleModalClose();
            } else {
                errorToast(savedUserResponse.response.data.errorMessage);
            }
        } catch (error) {}
    };

    const handleChangeCheckbox = (e) => {
        const value = e.target.value;

        setIsCheckBox(value);
    };
  

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: placeOrderInitValues,
        validationSchema: placeOrderForm,
        onSubmit,
    });

    const setPriceTypeForPaperTrade = async (e) => {
        if (e.target.value === "Paper") {
            placeOrderInitValues.priceType = "MARKET" 
            handleChange('priceType')('MARKET');
        }       
    }

    if (value?.orderType != null && value?.orderType !== undefined) {
        if (value?.orderType === "NRML") {
            placeOrderInitValues.productCode = "NORMAL";
        } else {
            placeOrderInitValues.productCode = value?.orderType;
        }
    }
    if (value?.tradingSymbol != null && value?.tradingSymbol !== undefined) {
        placeOrderInitValues.tradingSymbol = value.tradingSymbol;
        // placeOrderInitValues.priceType = "MARKET";
    }
    if (value?.instrument != null && value?.instrument !== undefined) {
        placeOrderInitValues.tradingSymbol = value.instrument;
        // placeOrderInitValues.priceType = "MARKET";
    }
    if (value?.exchange != null && value?.exchange !== undefined) {
        placeOrderInitValues.exchange = value.exchange;
        placeOrderInitValues.token = value.token;
    }
    placeOrderInitValues.instrumentName = value.instrumentName;
    placeOrderInitValues.isHolding = isHolding != null ? isHolding : false;
    placeOrderInitValues.price = ltpAccount;
    placeOrderInitValues.expiry = value.expiry;
    const handleShow = async (e) => {
        if (e.target.value === "LIMIT") {
            setIsTriggerPrice(true);
            setIsShowPrice(true);
        } else {
            setIsShowPrice(false);
            setIsTriggerPrice(false);
        }
    };

    const fetchResponse = async () => {
        const response = await fetchSocketSession();

        if (response?.data?.paperTrade === true) {
            setCanShow(false);
        } else {
            setCanShow(true);
        }
    };
    if(canShow==null){
    fetchResponse();
    }

    return (
        <>
            <Container>
                <Modal show={isShowModal} size="lg" onHide={handleModalClose}>
                    <Modal.Header className="modal-header" closeButton>
                        <Modal.Title style={{ fontSize: "18px" }}>Place Order</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="modal-body">
                        <div className="p-2 setting-theme">
                            <div className="card bg-body flex-row p-3 justify-content-between mb-3">
                                <div className="d-flex flex-row align-items-center">
                                    <div className="d-flex flex-column ms-3">
                                        <span className="fw-bold fs-6 text-info">
                                            {value?.instrument} {value?.instrumentName}
                                        </span>
                                        <span>{value?.exchange}</span>
                                    </div>
                                </div>
                                <div className="d-flex flex-column ms-3">
                                    <span className="fw-bold fs-6 text-info">LTP</span>
                                    <span id={`ltp_${value?.token}_${value?.orderType}`}></span>
                                </div>
                            </div>
                            <form className="row g-3 mt-3" onSubmit={handleSubmit}>
                                <div className="col-lg-4 col-md-4 col-sm-12 pt-3">
                                    <p className="me-3">Action </p>
                                    <div className="col-md-6 d-flex justify-content-between">
                                        <div className="form-check px-4">
                                            <input className="form-check-input" type="radio" value="BUY" id="buy" name="transactionType" onChange={handleChange} onInput={handleChangeCheckbox} />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Buy
                                            </label>
                                        </div>
                                        <div className="form-check px-4">
                                            <input className="form-check-input" type="radio" value="SELL" id="sell" name="transactionType" onChange={handleChange} onInput={handleChangeCheckbox} />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Sell
                                            </label>
                                            {errors.transactionType && touched.transactionType && (
                                                <p style={{ marginLeft: -80 }} className="text-danger">
                                                    {errors.transactionType}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <label className="form-label">Trade Type </label>
                                    <input type="hidden" className="form-control" />
                                    <fieldset>
                                        <select className="array-select form-control form-select" aria-label="example" id="tradeType" name="tradeType" 
                                        value={values.tradeType} onChange={(e) =>{
                                                        handleChange(e);
                                                        setPriceTypeForPaperTrade(e);
                                                        }}>
                                            <option>... </option>
                                            {canShow===true && <option value="Live">Live</option>}
                                            <option value="Paper">Paper</option>
                                        </select>
                                        {errors.tradeType && touched.tradeType && <p className="text-danger">{errors.tradeType}</p>}
                                    </fieldset>
                                </div>

                                <div className="col-lg-4 col-md-4 col-sm-12 typeahead">
                                    <label className="form-label">Order Type </label>
                                    <input type="hidden" className="form-control" />
                                    <fieldset>
                                        <select className="array-select form-control form-select" aria-label="example" id="productCode" name="productCode" value={values.productCode} onChange={handleChange}>
                                            <option>...</option>
                                            {disabledStocks && <option value="CNC">CNC</option>}
                                            <option value="MIS">MIS</option>
                                            {disabledNormal && <option value="NORMAL">Normal</option>}
                                        </select>
                                        {errors.productCode && touched.productCode && <p className="text-danger">{errors.productCode}</p>}
                                    </fieldset>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12 pt-3">
                                    <p className="me-3">Product Type </p>
                                    {values?.tradeType === "Live" || values?.tradeType === "..." || values?.tradeType === "" ? (
                                        <div className="col-md-6 d-flex justify-content-between">
                                            <div className="form-check px-4">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="priceType"
                                                    value="LIMIT"
                                                    onChange={(e) => {
                                                        handleShow(e);
                                                        handleChange(e);
                                                    }}
                                                />

                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    Limit
                                                </label>
                                            </div>
                                            <div className="form-check px-4">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    value="MARKET"
                                                    name="priceType"
                                                    onChange={(e) => {
                                                        handleShow(e);
                                                        handleChange(e);
                                                    }}
                                                />
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    Market
                                                </label>
                                                {errors.priceType && touched.priceType && (
                                                    <p style={{ marginLeft: -100 }} className="text-danger">
                                                        {errors.priceType}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="form-check px-4">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                value="MARKET"
                                                name="priceType"
                                                onChange={(e) => {
                                                    handleShow(e);
                                                    handleChange(e);
                                                }}
                                                checked={values?.tradeType === "Paper" ? true : false}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Market
                                            </label>
                                            {errors.priceType && touched.priceType && (
                                                <p style={{ marginLeft: -100 }} className="text-danger">
                                                    {errors.priceType}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="col-lg-2 col-md-2 col-sm-12">
                                    <label className="form-label">Quantity </label>
                                    <input type="number" className="form-control" value={values.quantity} onChange={handleChange} onBlur={handleBlur} id="quantity" />
                                    {errors.quantity && touched.quantity && <p className="text-danger">{errors.quantity}</p>}
                                </div>

                                {isTriggerPrice && (values?.tradeType === "Live" || values?.tradeType === "..." || values?.tradeType === "") && (
                                    <div className="col-lg-2 col-md-2 col-sm-12">
                                        <label className="form-label">Trigger Price</label>
                                        <input type="number" className="form-control" value={values.triggerPrice} onChange={handleChange} onBlur={handleBlur} id="triggerPrice" />
                                        {errors.triggerPrice && touched.triggerPrice && <p className="text-danger">{errors.triggerPrice}</p>}
                                    </div>
                                )}

                                {isShowPrice && (values?.tradeType === "Live" || values?.tradeType === "..." || values?.tradeType === "") && (
                                    <div className="col-lg-2 col-md-2 col-sm-12 float-left">
                                        <label className="form-label">Price</label>
                                        <input type="number" className="form-control" value={values.price} onChange={handleChange} onBlur={handleBlur} id="price" />
                                        {errors.price && touched.price && <p className="text-danger">{errors.price}</p>}
                                    </div>
                                )}
                                <div className="pe-xl-4  modal-footer d-flex justify-content-start">
                                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                        {isCheckBox}
                                    </button>

                                    <button type="button" className="btn btn-white border" data-bs-dismiss="modal" onClick={() => handleModalClose()}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
};
export default PlaceOrderModal;
