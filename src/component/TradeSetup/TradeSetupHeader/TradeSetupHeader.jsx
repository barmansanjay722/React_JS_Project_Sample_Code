import { useState } from "react";
import TradeSetUpModal from "../../Modal/TradeSetupModal/TradeSetupModal";

const TradeSetupHeader = () => {
  let [isModal, setIsModal] = useState(false);
  const handleShowTradeSetupModal = () => {
    setIsModal(true);
  };
  const hideTradeSetupModal = () => {
    setIsModal(false);
  };
  return (
    <>
      <div className="page-toolbar px-xl-4 px-sm-2 px-0 py-3">
        <div className="container-fluid">
          {/* .row end */}
          <div className="row align-items-center">
            <div className="col-auto mt-3" >
              <h1 className="fs-5 color-900 mt-1 mb-0">Trade Setup</h1>
              <small className="text-muted">
                Setup the stocks for automated alerts
              </small>
            </div>
            <div className="col d-flex justify-content-lg-end mt-2 mt-md-0">
              <div className="col text-lg-end">
                <label
                  className="btn btn-sm btn-primary addmodalbutton"
                  htmlFor="btnradio1"
                  title="Add"
                  onClick={() => {
                    handleShowTradeSetupModal();
                  }}
                >
                  <i className="fa fa-plus" /> Add
                </label>
              </div>
            </div>
          </div>

          <TradeSetUpModal
            showTradeSetupModal={isModal}
            handleTradeSetupModalClose={hideTradeSetupModal}
          />
         
        </div>
      </div>
    </>
  );
};
export default TradeSetupHeader;
