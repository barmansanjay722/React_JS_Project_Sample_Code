import { Container, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { placeOrderInitValues } from "../../utils/initialValues";
import { placeOrderForm } from "../../validations/orderValidation";
import { placeOrder } from "../../services/stockService";
import { useState } from "react";
import { successToast } from "../Toasts/Toasts";
import { useDispatch } from "react-redux";

import { getOrderList } from "../../redux/features/stockSlice";
const OrderModal = ({ showModal, value, handleModalClose }) => {
    const [isShowModal] = useState(showModal);
    const [isShowPrice, setIsShowPrice] = useState(false);
    const [isTriggerPrice, setIsTriggerPrice] = useState(false);
    const dispatch = useDispatch();
    
   
    const onSubmit = async (values, onSubmitProps) => {
        await stockOrder(values, onSubmitProps);
    };
    const stockOrder = async (data, onSubmitProps) => {
        try {
            // backend api call for POST request
            const savedUserResponse = await placeOrder(data);

            if (savedUserResponse !== false) {
                if (savedUserResponse.status === 200 || savedUserResponse.status === 201) {
                    successToast("Order Placed");
                    dispatch(getOrderList());
                    handleModalClose();
                }
            }
        } catch (error) {}
    };
    
     
    const handleShow = async (e) => {
        if (e.target.value === "LIMIT") {
            setIsShowPrice(true);
            setIsTriggerPrice(true);
        } else {
            setIsShowPrice(false);
            setIsTriggerPrice(false);
        }
    };

    if (value?.orderType != null && value?.orderType !== undefined) {
        placeOrderInitValues.productCode = value.orderType;
        
    }
    if (value?.instrument != null && value?.instrument !== undefined) {
        placeOrderInitValues.tradingSymbol = value.instrument;
        placeOrderInitValues.transactionType = value.type;

        let text = value.product;
        const parray = text.split(" /");
        placeOrderInitValues.productCode = parray[0];
    }
    if (value?.exchange !== null) {
        placeOrderInitValues.exchange = value.exchange;
       
        
    }
        
    
    
    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: placeOrderInitValues,
        validationSchema: placeOrderForm,
        onSubmit,
    });

    return (
        <>
            <Container>
                <Modal show={isShowModal} size="xl" onHide={handleModalClose} >
                    <Modal.Header className="modal-header" closeButton>
                        <Modal.Title style={{ fontSize: "18px" }}>Place Order</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="modal-body">
                        <div className="p-2 setting-theme mb-4">
                            <div className="card bg-body flex-row p-3 justify-content-between mb-3">
                                <div className="d-flex flex-row align-items-center">
                                    <div className="d-flex flex-column ms-3">
                                        <span className="fw-bold fs-6 text-info">{value.instrument}</span>
                                        <span>{value.exchange}</span>
                                    </div>
                                </div>
                            </div>
                            <form className="row g-3 mt-3" onSubmit={handleSubmit}>
                                {/* <div className="col-lg-4 col-md-4 col-sm-12 d-flex pt-3">
                                    <p className="fw-bold me-3">Action: </p>
                                    <div className="col-md-6 d-flex justify-content-between">
                                        <div className="form-check px-4">
                                            <input className="form-check-input" type="radio" value="BUY" name="transactionType" onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Buy
                                            </label>
                                        </div>
                                        <div className="form-check px-4">
                                            <input className="form-check-input" type="radio" value="SELL" name="transactionType" onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Sell
                                            </label>
                                            {errors.transactionType && touched.transactionType && (
                                                <p style={{ marginLeft: -80 }} className="text-primary">
                                                    {errors.transactionType}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div> */}
                                <div className="col-lg-4 col-md-4 col-sm-12 d-flex pt-3">
                                    <p className="me-3">Action: </p>
                                    <div className="col-md-6 d-flex justify-content-between">
                                        <div className="form-check px-4">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                value="BUY"
                                                name="transactionType"
                                                onChange={handleChange}
                                                

                                                // checked={orderType === "BUY"}
                                                // disabled={orderType === "SELL"}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Buy
                                            </label>
                                        </div>
                                        <div className="form-check px-4">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                value="SELL"
                                                name="transactionType"
                                                onChange={handleChange}
                                                 
                                                // checked={orderType === "SELL"}
                                                // disabled={orderType === "BUY"}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Sell
                                            </label>
                                            {errors.transactionType && touched.transactionType && (
                                                <p style={{ marginLeft: -80 }} className="text-primary">
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
                                        <select className="array-select form-control form-select" aria-label="example" id="tradeType" name="tradeType" value={values.tradeType} onChange={handleChange}>
                                            <option selected>...</option>
                                            <option value="Live">Live</option>
                                            {/* <option value="Paper Trade">Paper Trade</option> */}
                                        </select>
                                        {errors.tradeType && touched.tradeType && <p className="text-primary">{errors.tradeType}</p>}
                                    </fieldset>
                                </div>

                                <div className="col-lg-2 col-md-2 col-sm-12 typeahead">
                                    <label className="form-label">Order Type </label>
                                    <input type="hidden" className="form-control" />
                                    <fieldset>
                                        <select  className="array-select form-control form-select" aria-label="example" id="productCode" name="productCode" value={values.productCode} onChange={handleChange}>
                                            <option>{value.product ? value.product : "---"} </option>
                                            <option value="MIS">
                                                MIS
                                            </option>
                                            <option value="NORMAL">Normal</option>
                                            <option value="CNC">CNC</option>
                                        </select>
                                        {errors.productCode && touched.productCode && <p className="text-primary">{errors.productCode}</p>}
                                    </fieldset>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12 d-flex pt-3">
                                    <p className="fw-bold me-3">Product Type: </p>
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
                                                <p style={{ marginLeft: -100 }} className="text-primary">
                                                    {errors.priceType}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-2 col-md-2 col-sm-12">
                                    <label className="form-label">Quantity </label>
                                    <input type="number" className="form-control" value={values.quantity} onChange={handleChange} onBlur={handleBlur} id="quantity" />
                                    {errors.quantity && touched.quantity && <p className="text-primary">{errors.quantity}</p>}
                                </div>

                                {isTriggerPrice && (
                                    <div className="col-lg-2 col-md-2 col-sm-12">
                                        <label className="form-label">Trigger Price</label>
                                        <input type="number" className="form-control" value={values.triggerPrice} onChange={handleChange} onBlur={handleBlur} id="triggerPrice" />
                                        {errors.triggerPrice && touched.triggerPrice && <p className="text-primary">{errors.triggerPrice}</p>}
                                    </div>
                                )}
                                {isShowPrice && (
                                    <div className="col-lg-2 col-md-2 col-sm-12 float-left">
                                        <label className="form-label">Price</label>
                                        <input type="number" className="form-control" value={values.price} onChange={handleChange} onBlur={handleBlur} id="price" />
                                        {errors.price && touched.price && <p className="text-primary">{errors.price}</p>}
                                    </div>
                                )}

                                <div className="pe-xl-4  modal-footer d-flex justify-content-start text-center">
                                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                        PlaceOrder
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
export default OrderModal;
