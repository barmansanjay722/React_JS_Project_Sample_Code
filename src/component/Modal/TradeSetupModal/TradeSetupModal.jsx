import { Modal } from "react-bootstrap";
// import "./Trade.css";
import TradeInfoModal from "./TradeInfoModal";
import AlertInfoModal from "./AlertInfoModal";
import { useState } from "react";
import {Link} from "react-router-dom";

const TradeSetUpModal = ({
  showTradeSetupModal,
  handleTradeSetupModalClose,
}) => {
  const [query, setQuery] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(true);
  const closeModel =(close) => {
    // console.log("---->",close);
    handleTradeSetupModalClose(close);
  }
 
  return (
    <>
      <Modal
        show={showTradeSetupModal }
        onHide={handleTradeSetupModalClose}
        size="lg"
        id="AddModal"
        backdrop="static"
        
      >
        <Modal.Header className="modal-header" closeButton={showTradeModal} >
          <Modal.Title style={{'fontSize':'18px'}}>Stock Trade Setup</Modal.Title>
          {/* <div className="dropdown morphing scale-right">
                        <Link to=""className="card-fullscreen" data-bs-toggle="tooltip" title="" data-bs-original-title="Card Full-Screen" aria-label="Card Full-Screen"><i className="fa fa-maximize" style={{cursor:"pointer"}} ></i></Link>

                    </div> */}
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="mb-0">
            <ul className="nav nav-tabs tab-card" role="tablist">
              {showTradeModal && (
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-bs-toggle="tab"
                    href="#nav2-home"
                    role="tab"
                  >
                    <i className="fa fa-home me-2"></i>Trade Info
                  </a>
                </li>
              )}

              {showAlertModal && (
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-bs-toggle="tab"
                    href="#nav2-profile"
                    role="tab"
                  >
                    <i className="fa fa-user me-2"></i>Alert Info
                  </a>
                </li>
              )}
            </ul>
            <div className="card-body mb-0 custom_scroll">
              <div className="tab-content setting-theme">
                {showTradeModal && (
                  <div
                    className="tab-pane fade show active"
                    id="nav2-home"
                    role="tabpanel"
                  >
                    <TradeInfoModal
                      onQuery={setQuery}
                      showAlertModal={setShowAlertModal}
                      showTradeModal = {setShowTradeModal}
                    />
                  </div>
                )}

                {showAlertModal && (
                  <div
                    className="tab-pane show active"
                    id="nav2-profile"
                    role="tabpanel"
                  >
                    <AlertInfoModal
                      query={query}
                      showAlertModal={setShowAlertModal}
                      showTradeModal={setShowTradeModal}
                      closeModel={closeModel}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default TradeSetUpModal;
