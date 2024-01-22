import { Container, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { successToast } from "../Toasts/Toasts";
import { saveGstRecord } from "../../services/profileService";
import { GstInformationCheck } from "../../validations/signUpValidation";
import { errorToast } from "../Toasts/Toasts";
const GstInformationModal = ({
  showGstModal,
  handleGstModalClose,
  userGstInformation,
  changeGstValue
}) => {

  const onSubmit = async (values, onSubmitProps) => {
    await saveGstInformation(values, onSubmitProps);
  };
 
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      companyName: userGstInformation?.companyName,
      type: userGstInformation?.type,
      gstIn: userGstInformation?.gstIn,
      address: userGstInformation?.address,
    },
    enableReinitialize: true,
    validationSchema: GstInformationCheck,
    onSubmit,
  });
    const saveGstInformation= async(values, onSubmitProps)=>{
      try {
        // backend api call for POST request
        const savedUserResponse = await saveGstRecord(values);
  
        if (savedUserResponse !== false) {
          if (
            savedUserResponse.status === 200 ||
            savedUserResponse.status === 201
          ) {
            onSubmitProps.resetForm();
            handleGstModalClose();
            successToast("saved Gst Information");
            changeGstValue();
           
          }
          else if(savedUserResponse?.response?.status === 400){
            errorToast(savedUserResponse?.response?.data?.errorMessage);
          }
        }
       } catch (error) {}
    }
  return (
    <>
      <Container>
        <Modal size="lg" show={showGstModal} >
          <Modal.Header className="modal-header" closeButton onHide={handleGstModalClose}>
            <Modal.Title style={{'fontSize':'18px'}}>Edit GST Information</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div className="p-2 setting-theme mb-4">
              <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <label className="col-form-label">
                      Company Name <sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="companyName"
                      value={values.companyName}
                      onChange={handleChange}
                      id="companyName"
                      onBlur={handleBlur}
                    />
                    {errors.companyName && touched.companyName && (
                      <p className="text-danger">{errors.companyName}</p>
                    )}
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <label className="col-form-label">Type  <sup className="text-danger">*</sup></label>
                    <select
                      className="array-select form-control form-select"
                      aria-label="example"
                      id="type"
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                    >
                      <option>...</option>
                      <option value="Proprietorship">Proprietorship </option>
                      <option value="Private Limited" >Private Limited</option>
                      <option value="Limited">Limited</option>
                    </select>
                    
                    
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <label className="col-form-label">
                      GSTIN: <sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={values.gstIn}
                      onChange={handleChange}
                      id="gstIn"
                      onBlur={handleBlur}
                     
                    />
                     {errors.gstIn && touched.gstIn && (
                      <p className="text-danger">{errors.gstIn}</p>
                    )}
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <label className="col-form-label">
                      Address: <sup className="text-danger">*</sup>
                    </label>
                    <textarea
                     rows={1}
                      className="form-control"
                      placeholder="153/2, 3rd Floor, M.R.B.Arcade, Bagalur Main Road, Dwaraka Mod, Delhi"
                      value={values.address}
                      onChange={handleChange}
                      id=" address"
                      name="address"
                      onBlur={handleBlur}
                    />
                     {errors.address && touched.address && (
                      <p className="text-danger">{errors.address}</p>
                    )}
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-start text-center">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-white border "
                    onClick={handleGstModalClose}
                  >
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
export default GstInformationModal;
