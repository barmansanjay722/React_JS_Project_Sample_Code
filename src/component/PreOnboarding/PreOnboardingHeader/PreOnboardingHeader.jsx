// import BreadCrumbs from "../../BreadCrumbs/BreadCrumbs";
import PreOnboardingInformation from "./PreOnboardingInformation";
const PreOnboardingHeader = () => {
  return (
    <>
      <div className="page-toolbar px-xl-4 px-sm-2 px-0 py-3">
        <div className="container-fluid">
          {/* <BreadCrumbs /> */}
          {/* .row end */}
          <PreOnboardingInformation />
        </div>
      </div>
    </>
  );
};
export default PreOnboardingHeader;
