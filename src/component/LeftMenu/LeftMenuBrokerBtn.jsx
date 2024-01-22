import { Link } from "react-router-dom";

const LeftMenuBrokerBtn = () => {
  return (
    <>
      <div className="card bg-warning text-dark p-3 mt-5 border-0 broker_required">
        <div className="card-body mb-0 p-0">
          <div className="text-center">
            <i className="fa fa-info-circle fs-5" />
            <p className="h5">Broker account missing</p>
            <p className="pt-2 mb-0">
              <Link to="/manual_trading"
                className="btn btn-sm btn-outline-light"
                href="onboarding-through-broker.html"
              >
                Connect Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default LeftMenuBrokerBtn;
