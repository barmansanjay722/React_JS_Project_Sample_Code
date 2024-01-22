import { infoToast } from "../../Toasts/Toasts";

const AlertInfoModal = ({ query, showAlertModal, showTradeModal,closeModel }) => {
  const handleHookCopy = () => {
    let copyText = document.getElementById("copyWebHook").innerText;

    handleSecureCopy(copyText);
  };
  const handleBuyAlertCopy = () => {
    let copyText = document.getElementById("copyBuyAlert").innerText;

    handleSecureCopy(copyText);
  };
  const handleSellAlertCopy = () => {
    let copyText = document.getElementById("copySellAlert").innerText;

    handleSecureCopy(copyText);
  };
  const handleScriptCopy = () => {
    let copyText = document.getElementById("copyScript").innerText;

    handleSecureCopy(copyText);
  };

  const handleSecureCopy = (copyText) => {
      const textArea = document.createElement("textarea");
      textArea.value = copyText;
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";
      document.body.prepend(textArea);
      textArea.select();
      infoToast("Text copied to clipboard")
      try {
        document.execCommand("copy");
      } catch (error) {
      } finally {
        textArea.remove();
      }
  };

  const closeAlertModal = () => {
    showAlertModal(false);
    showTradeModal(true);
    closeModel(true);
  };
  return (
    <>
      <div className="setting-theme">
        <div className="row">
          <div className="col-lg-12">
            <h6 className="card-title mb-0 fw-bold">
              <span className="text-secondary">Step 1</span> Web hook
            </h6>
            <small className="text-muted"></small>
          </div>
          <div className="input-group mt-2 mb-4">
            <div className="box1">
              <p>
                <i className="fa fa-copy" onClick={handleHookCopy} />
              </p>
              <p id="copyWebHook">{query?.data?.webhookURL}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <h6 className="card-title mb-0 fw-bold">
              <span className="text-secondary">Step 2</span> Alert message for buy
            </h6>
            <small className="text-muted"></small>
          </div>
          <div className="input-group mt-2 mb-4">
            <div className="box custom_scroll ">
              <p>
                <i className="fa fa-copy" onClick={handleBuyAlertCopy} />
              </p>
              <p id="copyBuyAlert">{query?.data?.buyAlertMessage}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <h6 className="card-title mb-0 fw-bold">
              <span className="text-secondary">Step 2</span> Alert message for sell
            </h6>
            <small className="text-muted"></small>
          </div>
          <div className="input-group mt-2 mb-4">
            <div className="box custom_scroll ">
              <p>
                <i className="fa fa-copy" onClick={handleSellAlertCopy} />
              </p>
              <p id="copySellAlert">{query?.data?.sellAlertMessage}</p>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-lg-12">
            <h6 className="card-title mb-0 fw-bold">
              <span className="text-secondary">Step 3</span> Script
            </h6>
            <small className="text-muted"></small>
          </div>
          <div className="input-group mt-2 mb-4">
            <div className="box custom_scroll">
              <p>
                <i className="fa fa-copy" onClick={handleScriptCopy} />
              </p>
              <p className="mb-1"></p>
              <p className="mb-3" id="copyScript">
                {query?.data?.strategyScript}
              </p>
            </div>
          </div>
        </div> */}
        <div className="mt-2 pb-4">
          <button className="btn btn-primary btn-sm" onClick={closeAlertModal}>
            Done
          </button>
        </div>
      </div>
    </>
  );
};
export default AlertInfoModal;
