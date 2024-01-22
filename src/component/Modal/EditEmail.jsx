import { Container, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { emailCheck } from "../../validations/signUpValidation";
import { updateEmail } from "../../services/profileService";
import { successToast } from "../Toasts/Toasts";
const EditEmail = ({
  showEditEmailModal,
  handleEditEmailModalClose,
  emailValue,
  changeEmailValue,
}) => {
  const onSubmit = async (values, onSubmitProps) => {
    await ProfileUpdateEmail(values, onSubmitProps);
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
      email: emailValue?.email,
    },
    enableReinitialize: true,
    validationSchema: emailCheck,
    onSubmit,
  });

  const ProfileUpdateEmail = async (values, onSubmitProps) => {
    try {
      // backend api call for POST request

      const savedUserResponse = await updateEmail(values);
      if (savedUserResponse !== false) {
        if (
          savedUserResponse.status === 200 ||
          savedUserResponse.status === 201
        ) {
          onSubmitProps.resetForm();
          successToast("email verification link send to your email");
          handleEditEmailModalClose();

          changeEmailValue();
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <>
      <Container>
        <Modal
          size="xs"
          show={showEditEmailModal}
          onHide={handleEditEmailModalClose}
          
        >
          <Modal.Header className="modal-header" closeButton>
            <Modal.Title style={{'fontSize':'18px'}}>Edit Email</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div className="p-2 setting-theme mb-2">
              <form onSubmit={handleSubmit}>
                <h6>
                  <span className="text-secondary">Step 1: Edit</span>{" "}
                </h6>
                <div className="row mb-4">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <label className="col-form-label">
                      Email <sup className="text-danger">*</sup>
                    </label>
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control"
                        aria-describedby="button-addon2"
                        value={values.email}
                        onChange={handleChange}
                        id="email"
                        onBlur={handleBlur}
                      />
                      <button
                        className="btn btn-primary"
                        type="submit"
                        id="button-addon2"
                        disabled={isSubmitting}
                      >
                        Send Link
                      </button>
                    </div>
                    {errors.email && touched.email && (
                      <p className="text-primary">{errors.email}</p>
                    )}
                  </div>
                </div>
                <h6>
                  <span className="text-secondary">Step 2: Verify</span>{" "}
                </h6>
                <div className="row mt-3">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <p>
                      An activation link has been sent to your email
                      al*******@gmail.com. Please use link to verify your email.
                    </p>
                  </div>
                </div>
                <div className=" modal-footer d-flex justify-content-start text-center">
                  <button
                    type="button"
                    className="btn btn-outline-primary border"
                    data-bs-dismiss="modal"
                    onClick={handleEditEmailModalClose}
                  >
                    Done
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
export default EditEmail;
