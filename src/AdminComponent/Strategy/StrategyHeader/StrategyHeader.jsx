import { useState } from "react";
import StrategyModal from "../../Modal/StrategyModal";

const StrategyHeader = () => {
  let [isModal, setIsModal] = useState(false);

  const handleShowStrategyModal = () => {
    setIsModal(true);
  };
  const hideStrategyModal = () => {
    setIsModal(false);
  };
  return (
    <>
      <div className="page-toolbar px-xl-4 px-sm-2 px-0 py-3">
        <div className="container-fluid">
          {/* .row end */}
          <div className="row align-items-center" >
            <div className="col-auto">
              <h1 className="fs-5 color-900 mt-1 mb-0">Manage Strategy</h1>
              {/* <small className="text-muted">Lorem ipsum dolor sit amet consectetur molestiae.</small> */}
            </div>
            <div className="col d-flex justify-content-lg-end mt-2 mt-md-0">
              <div className="col text-lg-end">
                <label
                  className="btn btn-sm btn-primary addmodalbutton"
                  htmlFor="btnradio1"
                  title="Add"
                  onClick={() => {
                    handleShowStrategyModal();
                  }}
                >
                  <i className="fa fa-plus" /> Add
                </label>
              </div>
            </div>
          </div>
          <StrategyModal
            showStrategyModal={isModal}
            handleStrategyModalClose={hideStrategyModal}
          />
        </div>
      </div>
    </>
  );
};
export default StrategyHeader;
