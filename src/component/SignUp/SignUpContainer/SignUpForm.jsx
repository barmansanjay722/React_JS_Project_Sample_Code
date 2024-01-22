import { useState } from "react";
import {Link} from "react-router-dom";
import { useFormik } from "formik";
import SignUpHeader from "./SignUpHeader";
import { basicSchema } from "../../../validations/signUpValidation";
import SignIn from "./SignIn";
import SignUpFormOtp from "../SignUpContainer/SignUpFormOtp";
import { userRegistration } from "../../../services/userService";

const SignUpForm = () => {
  const [pageType, setPageType] = useState("register");
  
  const isRegister = pageType === "register";
  const isVerifyOtp = pageType === "verifyOtp";
  let [refCode, setRefCode] = useState("");
  const [contactInfo, setContactInfo] = useState("");
   const [checkedValue,setCheckedValue] = useState();
  const onSubmit = async (values, onSubmitProps) => {
   
    await register(values, onSubmitProps);
  };
  
  
   
  // POST request...
  const register = async (values, onSubmitProps) => {
    try {
      // backend api call for POST request
      
      const savedUserResponse = await userRegistration(values);
      
      if (savedUserResponse !== false) {
        if (savedUserResponse.status === 201) {
          refCode = savedUserResponse.data.otp.refCode;
          setRefCode(refCode);
          setContactInfo(values.userName);
          setPageType("verifyOtp");
        }
      }
    } catch (error) {
    }
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
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      // termsAccepted: false,
    },
    validationSchema: basicSchema,
    onSubmit,

  });
  
  const handleChangeCheckbox = (e) => {
    const values = e.target.value;
    setCheckedValue(values);
};
  return (
    <>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12 mb-1 text-center">
          <SignUpHeader />
        </div>
        <div
          className="signup-form"
          style={{ display: isRegister ? "block" : "none" }}
        >
          <div className="row">
            <div className="col-6 mb-3">
              <label className="form-label">Full name <sup className="text-danger">*</sup></label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="John"
                value={values.firstName}
                onChange={handleChange}
                onInput={handleChangeCheckbox}
                id="firstName"
                onBlur={handleBlur}
              />
              {errors.firstName && touched.firstName && (
                <p className="text-danger">{errors.firstName}</p>
              )}
            </div>
            <div className="col-6">
              <label className="form-label">Last name <sup className="text-danger">*</sup></label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="John"
                value={values.lastName}
                onChange={handleChange}
                id="lastName"
                onBlur={handleBlur}
                onInput={handleChangeCheckbox}
              />
              {errors.lastName && touched.lastName && (
                <p className="text-danger">{errors.lastName}</p>
              )}
            </div>
            <div className="col-12 mb-2">
              <label className="form-label">Email address <sup className="text-danger">*</sup></label>
              <input
                type="email"
                placeholder="name@example.com"
                className="form-control form-control-lg"
                value={values.email} 
                onChange={handleChange}
                id="email"
                onBlur={handleBlur}
                onInput={handleChangeCheckbox}
              />
            </div>
            {errors.email && touched.email && (
              <p className="text-danger">{errors.email}</p>
            )}

            <div className="col-12 mb-2">
              <label className="form-label">Phone <sup className="text-danger">*</sup></label>
              <input
                maxLength={10}
                type="text"
                placeholder="9999 999 999"
                className="form-control form-control-lg"
                value={values.phoneNumber}
                onChange={handleChange}
                id="phoneNumber"
                onBlur={handleBlur}
                onInput={handleChangeCheckbox}
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <p className="text-danger">{errors.phoneNumber}</p>
              )}
            </div>
            {/* <div className="col-12">
              <div className="form-check">
                <input
                  value={values.termsAccepted}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="checkbox"
                  id="termsAccepted"
                  className="form-check-input"
                  disabled = {(/\s/g).test(checkedValue)}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  I accept the{" "}
                  <Link to="/terms_condition" className="text-danger">
                    Terms and Conditions
                  </Link>
                </label>
                {errors.termsAccepted && touched.termsAccepted && (
                  <p className="text-danger">{errors.termsAccepted}</p>
                )}
              </div>
            </div> */}

            <div className="col-12 mt-4 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-lg btn-block btn-primary lift text-uppercase"
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </form>
      <div
        className="otp-form text-center"
        style={{ display: isVerifyOtp ? "block" : "none" }}
      >
        {isVerifyOtp && <SignUpFormOtp refCode={refCode} contactInfo={contactInfo}/>}
        {/* <SignInFormOtp/> */}
      </div>
      <div className="col-12 mt-4 text-center">
        <SignIn />
      </div>
    </>
  );
};
export default SignUpForm;
