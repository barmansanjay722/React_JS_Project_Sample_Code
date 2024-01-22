/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { otpInitValues } from "../../../utils/initialValues";
import { userVerification } from "../../../services/userService";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../redux/features/authslice";
import { errorToast } from "../../Toasts/Toasts";
import { setInitStocks } from "../../../redux/features/stockSlice";

const SignUpFormOtp = ({ refCode, contactInfo }) => {
  const [timer, setTimer] = useState(90);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );

  const resetTimer = function () {
    if (!timer) {
      setTimer(90);
    }
  };

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  const validate = (values) => {
    let otpValues = "";
    otpValues =
      values.otpOne +
      values.otpTwo +
      values.otpThree +
      values.otpFour +
      values.otpFive +
      values.otpSix;

    const errors = {};

    if (otpValues.length !== 6) {
      errors.name = "Enter 6 digit otp";
    }

    return errors;
  };
  const onSubmit = async (values, onSubmitProps) => {
    const data = {
      referenceCode: refCode,
      otp:
        values.otpOne +
        values.otpTwo +
        values.otpThree +
        values.otpFour +
        values.otpFive +
        values.otpSix,
    };

    await register(data, onSubmitProps);
  };



  // POST request...
  const register = async (data, onSubmitProps) => {
    try {
      // backend api call for POST request
      const savedUserResponse = await userVerification(data);
      onSubmitProps.resetForm();

      if (savedUserResponse !== false) {
        if (savedUserResponse.status === 200) {
          dispatch(
            setLogin({
              token: savedUserResponse.data.token,
            })
          );
          dispatch(setInitStocks());
          if (savedUserResponse.data.isTermsAccepted === false) {
            navigate("/termsAndConditions");
          } else {
           
            navigate("/preonboarding");
          }
        }
      }
    } catch (error) {
      errorToast("OTP is wrong");
    }
  };

  const formik = useFormik({
    initialValues: otpInitValues,
    onSubmit,
    validate,
  });

  const focusChange = (e) => {
    if (e.target.value.length >= e.target.getAttribute("maxlength")) {
      e.target.nextElementSibling.focus();
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="position-relative">
        <div
          className="card p-2"
          style={{ border: "0", backgroundColor: "transparent" }}
        >
          <h6>Please enter the one time password to verify your account</h6>
          <div>
            {" "}
            {/* <span>A code has been sent to</span> <small>{contactInfo}</small>{" "} */}
          </div>
          <div
            id="otp"
            className="inputs d-flex flex-row justify-content-center mt-2"
          >
            <input
              type="text"
              className="m-2 text-center form-control rounded"
              maxLength={1}
              value={formik.values.otpOne}
              onChange={formik.handleChange}
              id="otpOne"
              onBlur={formik.handleBlur}
              onInput={(e) => focusChange(e)}
            />
            <input
              type="text"
              className="m-2 text-center form-control rounded"
              maxLength={1}
              value={formik.values.otpTwo}
              onChange={formik.handleChange}
              id="otpTwo"
              onBlur={formik.handleBlur}
              onInput={(e) => focusChange(e)}
            />
            <input
              type="text"
              className="m-2 text-center form-control rounded"
              maxLength={1}
              value={formik.values.otpThree}
              onChange={formik.handleChange}
              id="otpThree"
              onBlur={formik.handleBlur}
              onInput={(e) => focusChange(e)}
            />
            <input
              type="text"
              className="m-2 text-center form-control rounded"
              maxLength={1}
              value={formik.values.otpFour}
              onChange={formik.handleChange}
              id="otpFour"
              onBlur={formik.handleBlur}
              onInput={(e) => focusChange(e)}
            />
            <input
              type="text"
              className="m-2 text-center form-control rounded"
              maxLength={1}
              value={formik.values.otpFive}
              onChange={formik.handleChange}
              id="otpFive"
              onBlur={formik.handleBlur}
              onInput={(e) => focusChange(e)}
            />
            <input
              type="text"
              className="m-2 text-center form-control rounded"
              maxLength={1}
              value={formik.values.otpSix}
              onChange={formik.handleChange}
              id="otpSix"
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.name ? (
            <div className="text-danger">{formik.errors.name}</div>
          ) : null}

          <div className="d-flex justify-content-between">
            <Link
              className="change-number"
              onClick={(e) => window.location.reload()}
            >
              <small>Change email </small>
            </Link>
            {/* <div className="float-right">
              <small>
                <span id="resettimer" onClick={resetTimer}>
                  Resend{" "}
                </span>{" "}
                <span id="countdowntimer"> {timer}</span>S
              </small>
            </div> */}
          </div>
          <div className="mt-4">
            <button
              disabled={formik.isSubmitting}
              className="btn btn-lg btn-block btn-primary  lift text-uppercase"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpFormOtp;
