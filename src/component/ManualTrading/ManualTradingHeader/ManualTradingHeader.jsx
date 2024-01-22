// import BreadCrumbs from "../../BreadCrumbs/BreadCrumbs";
import ManualTradingInformation from "./ManualTradingInformation";
const OnboardingHeader = () => {
  return (
    <>
      <div className="page-toolbar px-xl-4 px-sm-2 px-0 py-3">
        <div className="container-fluid">
          {/* <BreadCrumbs /> */}
          {/* .row end */}
          <ManualTradingInformation />
        </div>
      </div>
    </>
  );
};
export default OnboardingHeader;
