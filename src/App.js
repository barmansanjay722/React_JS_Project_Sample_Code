import "./App.css";
import SignIn from "./component/SignIn/SignIn.jsx";
import SignUp from "./component/SignUp/SignUp.jsx";
import Profile from "./component/Profile/Profile.jsx";
import Onboarding from "./component/Onboarding/Onboarding";
import PreOnboarding from "./component/PreOnboarding/PreOnboarding";
import ManualTrading from "./component/ManualTrading/ManualTrading.jsx";
import Home from "./component/Home/Home.jsx";
import TradeSetup from "./component/TradeSetup/TradeSetup.jsx";
import Order from "./component/Order/Order.jsx";
import Position from "./component/Position/Position.jsx";
import Holding from "./component/Holding/Holding.jsx";
import Contact from "./component/Contact/Contact.jsx";
import AdminRoute from "./routes/AdminRoute";
import OnboardRoute from "./routes/OnboardRoute";
import Strategy from "./AdminComponent/Strategy/Strategy.jsx";
import Dashboard from "./AdminComponent/Dashboard/Dashboard.jsx";
import Report from "./AdminComponent/Report/Report.jsx";
import Customer from "./AdminComponent/Customer/Customer.jsx";
import { ToastContainer } from "react-toastify";
import "animate.css/animate.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import { useSelector } from "react-redux";
import Loader from "./component/Loader/Loader";
import LogIn from "./AdminComponent/LogIn/LogIn";
import Redirect from "./component/pages/Redirect";
import Logout from "./component/pages/Logout";
import store from "./redux";
import RegistrationReport from "./AdminComponent/RegistrationReport/RegistrationReport";
import TradeExecutionReport from "./AdminComponent/TradeExecutionReport/TradeExecutionReport";
import Condition from "./component/Condition/Condition";
import Policy from "./component/Policy/Policy";
import StrategyReport from "./AdminComponent/StrategyReport/StrategyReport";
import Cookies from 'universal-cookie';
import { useEffect } from "react";
import TermsAndCondition from "./component/Modal/TermsAndConditon";

const App = () => {
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  const isAdminAuth = Boolean(useSelector((state) => state.auth.adminToken));
  useEffect(() => {
    const cookies = new Cookies();
    cookies.set('cookieName', 'cookieValue', { secure: true });
  }, []);

  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route
            path="/orders"
            element={isAuth ? <Order /> : <Navigate to="/" />}
          />
          <Route path="/trade_setup" element={<TradeSetup />} />
          <Route
            path="/home"
            element={isAuth ? <Home /> : <Navigate to="/" />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact_us" element={<Contact />} />
          <Route
            path="/positions"
            element={isAuth ? <Position /> : <Navigate to="/" />}
          />
          <Route
            path="/holding"
            element={isAuth ? <Holding /> : <Navigate to="/" />}
          />
          <Route
            path="/logout"
            element={isAuth ? <Logout /> : <Navigate to="/" />}
          />
          <Route
            path="/onboarding"
            element={isAuth ? <Onboarding /> : <Navigate to="/" />}
          />
        </Route>
        
        {/* 
        <Route element={<OnboardRoute />}>
          <Route
            path="/onboarding"
            element={isAuth ? <Onboarding /> : <Navigate to="/" />}
          />
          <Route
            path="/manual_trading"
            element={isAuth ? <ManualTrading /> : <Navigate to="/" />}
          />
        </Route> */}

        <Route element={<OnboardRoute />}>
          <Route
            path="/preonboarding"
            element={isAuth ? <PreOnboarding /> : <Navigate to="/" />}
          />
          <Route
            path="/manual_trading"
            element={isAuth ? <ManualTrading /> : <Navigate to="/" />}
          />
        </Route>

        <Route
          path="/redirect"
          element={isAuth ? <Redirect /> : <Navigate to="/" />}
        />

        <Route element={<AdminRoute />}>
          <Route
            path="/dashboard"
            element={isAdminAuth ? <Dashboard /> : <Navigate to="/" />}
          />
          
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/renewal_report" element={<Report />} />
          <Route path="/registration_report" element={<RegistrationReport />} />
         <Route path="/trade_execution_report" element={<TradeExecutionReport/>} />
         <Route path="/strategy_report" element={<StrategyReport />} />
        </Route> 
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/adminlogin" element={!isAdminAuth ? <LogIn/> : <Navigate to="/dashboard" />} />
        <Route path= "/terms_condition" element={<Condition />} />
        <Route path="/privacy_policy" element={<Policy />} />
        <Route path="/termsAndConditions" element={<TermsAndCondition />} />
      </Routes>
      <ToastContainer />
    </>
  );
};
export default App;
