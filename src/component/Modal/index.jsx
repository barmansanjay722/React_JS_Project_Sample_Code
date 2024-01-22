import { useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { placeOrderInitValues } from "../../utils/initialValues";
import { placeOrderForm } from "../../validations/orderValidation";
const ModalForm = () => {
  const [show, setShow] = useState(false);
  const ModalClose = () => setShow(false);
  const ModalShow = () => setShow(true);

  const onSubmit = async (values, onSubmitProps) => {};

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: placeOrderInitValues,
    validationSchema: placeOrderForm,
    onSubmit,
  });

  return (
    <>
      <Container>
        <Button variant="primary" onClick={ModalShow}>
          Launch demo modal
        </Button>

        <Modal show={show} onHide={ModalClose} size="lg">
          <Modal.Header className="modal-header" closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>

          <Modal.Body className="modal-body">
            <div className="p-2 setting-theme mb-4">
              <div className="card bg-body flex-row p-3 justify-content-between mb-3">
                <div className="d-flex flex-row align-items-center">
                  <div className="d-flex flex-column ms-3">
                    <span className="fw-bold fs-6 text-info">PNB-EQ</span>
                    <span></span>
                  </div>
                </div>
                <div className="d-flex flex-column ms-3">
                  <span className="fw-bold fs-6 text-info">Futures</span>
                  <span>Stock Type</span>
                </div>
              </div>
              <form className="row g-3 mt-3" onSubmit={handleSubmit}>
                <div className="col-lg-4 col-md-4 col-sm-12 d-flex pt-3">
                  <p className="fw-bold me-3">Action: </p>
                  <div className="col-md-6 d-flex justify-content-between">
                    <div className="form-check px-4">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="Buy"
                        name="transactionType"
                        id="Buy"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Buy
                      </label>
                    </div>
                    <div className="form-check px-4">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="Sell"
                        disabled
                        name="transactionType"
                        id="Sell"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Sell
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <label className="form-label">Trade Type </label>
                  <input type="hidden" className="form-control" />
                  <fieldset>
                    <select
                      className="array-select form-control form-select"
                      aria-label="example"
                    >
                      {/* <option selected>... </option> */}
                      <option selected value="live">
                        Live
                      </option>
                      {/* <option value="paperTrade">Paper Trade</option> */}
                    </select>
                  </fieldset>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 typeahead">
                  <label className="form-label">Order Type </label>
                  <input type="hidden" className="form-control" />
                  <fieldset>
                    <select
                      className="array-select form-control form-select"
                      aria-label="example"
                      id="productCode"
                      name="productCode"
                      value={values.productCode}
                      onChange={handleChange}
                    >
                      <option selected>... </option>
                      <option value="MIS">MIS</option>
                      <option value="Delivery">Delivery (Normal)</option>
                    </select>
                    {errors.productCode && touched.productCode && (
                      <p className="text-primary">{errors.productCode}</p>
                    )}
                  </fieldset>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 d-flex pt-3">
                  <p className="fw-bold me-3">Exchange: </p>
                  <div className="col-md-6 d-flex justify-content-between">
                    <div className="form-check px-4">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exchange"
                        id="flexRadioDefault1"
                        value="NSE"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        NSE
                      </label>
                    </div>
                    <div className="form-check px-4">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="BSE"
                        name="exchange"
                        id="flexRadioDefault2"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        BSE
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <label className="form-label">Quantity </label>
                  <input
                    type="number"
                    className="form-control"
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="quantity"
                  />
                  {errors.quantity && touched.quantity && (
                    <p className="text-primary">{errors.quantity}</p>
                  )}
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="price"
                  />
                  {errors.quantity && touched.quantity && (
                    <p className="text-primary">{errors.quantity}</p>
                  )}
                </div>
                {/* <div className="pe-xl-4  modal-footer d-flex justify-content-start text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      Sell
                    </button>
                    <button
                      type="button"
                      className="btn btn-white border"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div> */}
              </form>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={ModalClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={ModalClose}
              disabled={isSubmitting}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};
export default ModalForm;
