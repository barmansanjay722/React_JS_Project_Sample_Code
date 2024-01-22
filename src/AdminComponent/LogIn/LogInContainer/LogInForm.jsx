import LogInHeader from "./LogInHeader";
import { useFormik } from "formik";
import { loginCheck } from "../../../validations/loginValidation";
import { adminLogin } from "../../../services/userService";
import { setAdminLogin } from "../../../redux/features/authslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const LogInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values, onSubmitProps) => {
    await saveLoginDetails(values, onSubmitProps);
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
      username : "",  
      password : "",
    },
    validationSchema: loginCheck,
    onSubmit,
  });

   const saveLoginDetails=async (values,onSubmitProps)=>{
    let adminCred = {
      username: values.username,
      password: values.password
    }
    const response = await adminLogin(adminCred,"algotic")
    if(response.status === 200) {
      dispatch(setAdminLogin({adminToken:response.data.token}))
      navigate("/dashboard");
    }
   }
  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-12 mb-1 text-center">
        <LogInHeader />
      </div>
      <div className="signup-form">
        <div className="row" >
          <div className="col-12 mb-2">
            <label className="form-label">Email address </label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="name@example.com"
              value={values.username}
              onChange={handleChange}
              id="username"
              onBlur={handleBlur}
            />
             {errors.username && touched.username && (
                <p className="text-primary">{errors.username}</p>
              )}
          </div>
          <div className="col-12 mb-2 mt-3">
            <label className="form-label">Password </label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="**********"
              value={values.password}
              onChange={handleChange}
              id="password"
              onBlur={handleBlur}
            />
            {
              errors.password && touched.password && (
                <p className="text-primary">{errors.password}</p>
              )
            }
          </div>
          <div className="col-12 mt-4 text-center">
            <button
              type="submit"
              className="btn btn-lg btn-block btn-primary lift"
              disabled={isSubmitting}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default LogInForm;
