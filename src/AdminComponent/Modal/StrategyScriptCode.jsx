import {Modal} from 'react-bootstrap';
// import "./Strategy.css";
const StrategyScriptCode=({showStarategyScriptModal,handleStrategyScriptModalClose,scriptValue})=>{
   
   return (
      <>
       <Modal size="lg" id="showstrategy" show={showStarategyScriptModal} onHide={handleStrategyScriptModalClose}>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>Strategy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="  mb-0">
          <div className="card-body mb-0 custom_scroll">
            <form className="row g-3">
              <div className="col-lg-6 col-md-4 col-sm-12">
                <label className="form-label">Name </label>
                <input
                  type="text"
                  className="form-control"
                  disabled
                  defaultValue={scriptValue?.name}
                />
              </div>
              <div className="row mt-4">
                <label className="form-label">Strategy script code </label>
                <div className="input-group mt-2 mb-4">
                  <div className="box custom_scroll">
                    <p className="mb-1"></p>
                    <p className="mb-3">
                      {scriptValue?.script}
                    </p>
                    
                  </div>
                </div>
              </div>
              <div className="pe-xl-4 d-flex justify-content-start text-center">
               
                <button
                  type="button"
                  className="btn btn-white border"
                  data-bs-dismiss="modal"
                  onClick={handleStrategyScriptModalClose}
                >
                  Close
                </button>
              </div>
            </form>
            
          </div>
        </div>
        </Modal.Body>
       
      </Modal>
    </>
    
   );
};
export default StrategyScriptCode