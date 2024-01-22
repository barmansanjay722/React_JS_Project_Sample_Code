import RenewalHistory from "./RenewalHistory.jsx";
import SubscriptionPlanDays from "./SubscriptionPlanDays.jsx";
// import SubscriptionPlanLifetime from "./SubscriptionPlanLifetime.jsx";
import GstInformation from "./GstInformation.jsx";
// import TradingButton from "./TradingButton.jsx";
const ProfileBody = () => {
  return (
    <>
      <div className="page-body px-xl-4 px-sm-2 px-0 py-lg-2 py-1">
        <div className="container-fluid">
          <div className="row g-2 mb-5">
            <GstInformation />
            {/* <TradingButton /> */}

            <div className="row g-1">
              <SubscriptionPlanDays />
              <RenewalHistory />
            </div>

            {/* <SubscriptionPlanLifetime /> */}
          </div>
          {/* .row end */}
        </div>
      </div>
    </>
  );
};
export default ProfileBody;
