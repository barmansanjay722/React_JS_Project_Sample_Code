import BreadCrumbs from "../../BreadCrumbs/BreadCrumbs";
import OnboardingInformation from "./OnboardingInformation";
const OnboardingHeader = () => {
  return (
    <>
      <div className="page-toolbar px-xl-4 px-sm-2 px-0 py-3">
        <div className="container-fluid">
          {/* <BreadCrumbs /> */}
          {/* .row end */}
          <OnboardingInformation />
        </div>
      </div>
    </>
  );
};
export default OnboardingHeader;
