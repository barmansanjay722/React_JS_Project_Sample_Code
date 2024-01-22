import { useState, useEffect, useCallback, React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { userVerification } from "../../../services/userService";
import { resendOtpReference } from "../../../services/userService";
import { otpInitValues } from "../../../utils/initialValues";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../redux/features/authslice";
import { errorToast, successToast } from "../../Toasts/Toasts";
import { setInitStocks } from "../../../redux/features/stockSlice";
import { setInitTrade } from "../../../redux/features/tradeSlice";
import { data } from "jquery";

const SignInFormOtp = ({ refCode, contactInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [referCode, setRefCode] = useState(refCode);
  const [timer, setTimer] = useState(90);

  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );

  // eslint-disable-next-line no-unused-vars
  const resetTimer = function () {
    if (!timer) {
      setTimer(5);
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
      referenceCode: referCode,
      otp:
        values.otpOne +
        values.otpTwo +
        values.otpThree +
        values.otpFour +
        values.otpFive +
        values.otpSix,
    };

    await login(data, onSubmitProps);
  };

  const resendOtp = async (values, onSubmitProps) => {
    resetTimer();
    const data = {
      referenceCode: referCode
    };

    await resend(data, onSubmitProps);
  }

  const resend = async (data, onSubmitProps) => {

    const resendApiResponse = await resendOtpReference(data);

    if (resendApiResponse !== false) {
      if (resendApiResponse.status === 200) {
        setRefCode(resendApiResponse.data.refCode);
        successToast("Otp Sent Successfully");
      } else {
        errorToast("Something went Wrong")
      }
    }
  }

  // POST request...
  const login = async (data, onSubmitProps) => {
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
          dispatch(setInitTrade());
          if (savedUserResponse.data.isTermsAccepted === false) {
            navigate("/termsAndConditions");
          } else {
            navigate("/onboarding");
          }
        } else {
          errorToast("OTP is wrong");
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
            <span>A code has been sent to</span> <small>{contactInfo}</small>{" "}
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
              autoFocus={true}
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
              <small>Change email  </small>
            </Link>
            <div className="float-right">

              <small>
                <Link onClick={resendOtp}>
                  <span>
                    Resend Otp{" "}
                  </span>
                </Link>{" "}

                {/* <span id="countdowntimer"> {timer}</span>S */}
              </small>
            </div>
          </div>
          <div className="mt-4">
            <button
              disabled={formik.isSubmitting}
              className="btn btn-lg btn-block btn-primary lift validate"
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
export default SignInFormOtp;
