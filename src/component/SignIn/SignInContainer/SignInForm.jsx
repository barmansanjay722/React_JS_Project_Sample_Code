import { useState } from "react";
import SignUp from "./SignUp";
import SignInHeader from "./SignInHeader";
import SignInAliceBlueBtn from "./SignInAliceBlueBtn";
import { userCheck } from "../../../validations/signUpValidation";
import { useFormik } from "formik";
import SignInFormOtp from "./SignInFormOtp";
import { userLogin } from "../../../services/userService";
import { errorToast } from "../../Toasts/Toasts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../../redux/features/authslice";
import { ThreeDots } from "react-loader-spinner";
import { setInitStocks } from "../../../redux/features/stockSlice";
import { setInitTrade } from "../../../redux/features/tradeSlice";
import { setInitStrategy} from "../../../redux/features/strategySlice";
import { setInitStrategyAll } from "../../../redux/features/strategyAdminSlice";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isVerifyOtp = pageType === "verifyOtp";
  const isBrokerLogin = pageType === "brokerLogin";
  const [refCode, setRefCode] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
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
      username: "",
    },
    validationSchema: userCheck,
    onSubmit,
  });

  const login = async (values, onSubmitProps) => {
    try {
      // backend api call for POST request
      setIsLoading(true);
      const response = await userLogin(values, "ALGOTIC");
      setIsLoading(false);

      onSubmitProps.resetForm();

      if (response !== false) {
        if (response.status === 200) {
          const refCode = response.data.refCode;
          const token = response.data.token;
          if (token != null) {
            dispatch(
              setLogin({
                token: response.data.token,
              })
            );
            dispatch(setInitStocks());
            dispatch(setInitTrade());
            dispatch(setInitStrategy());
            dispatch(setInitStrategyAll());
            navigate("/onboarding");
          }
          else{
            setRefCode(refCode);
            setContactInfo(values.username);
            setPageType("verifyOtp");
          }
        } else {
          // console.log(response);
          errorToast("Email not registered");
        }
      }
    } catch (error) {}
  };

  const handleBroker = async (value, onSubmitProps) => {
    dispatch(setInitStocks());
    dispatch(setInitTrade());
    dispatch(setInitStrategy());
    dispatch(setInitStrategyAll());
    await brokerLogin(value, onSubmitProps);
  };

  const brokerLogin = async (value, onSubmitProps) => {
    try {
      // backend api call for POST request
      const response = await userLogin(values, "BROKER");

      if (response.status === 200) {
        dispatch(
          setLogin({
            token: response.data.token,
          })
        );
        setPageType("brokerLogin");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-12 mb-2">
          <SignInHeader />
        </div>

        <div
          className="sign-in-form"
          style={{ display: isLogin ? "block" : "none" }}
        >
          <div className="col-12">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="John"
                value={values.username}
                onChange={handleChange}
                id="username"
                onBlur={handleBlur}
              />
              {errors.username && touched.username && (
                <p className="text-danger">{errors.username}</p>
              )}
            </div>
          </div>

          <div className="col-12 mt-4 text-center ">
            <button
              type="button"
              className="btn btn-lg btn-block btn-primary lift"
              onClick={() => handleBroker(values)}
            >
              Broker
            </button>{" "}
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-lg btn-block btn-primary lift"
            >
              Algotic
            </button>
          </div>
          <div></div>

          <div
            className="row"
            style={{ paddingTop: "10px", marginLeft: "190px" }}
          ></div>
        </div>
      </form>
      {isLoading ? (
        <div className="row">
          {" "}
          <div className="col-2" style={{ float: "none", margin: "auto" }}>
            <ThreeDots
              height="40"
              width="40"
              radius="9"
              color="#a2238f"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        </div>
      ) : null}
      <div
        className="otp-form text-center"
        style={{ display: isVerifyOtp ? "block" : "none" }}
      >
        {isVerifyOtp && (
          <SignInFormOtp refCode={refCode} contactInfo={contactInfo} />
        )}
        {/* <SignInFormOtp/> */}
      </div>

      <div
        className="otp-form text-center"
        style={{ display: isBrokerLogin ? "block" : "none" }}
      >
        {isBrokerLogin && <SignInAliceBlueBtn />}
      </div>

      <div className="col-12 mt-4 text-center">
        <SignUp />
      </div>
    </>
  );
};
export default SignInForm;
