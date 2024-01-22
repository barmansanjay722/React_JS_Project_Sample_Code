import ManualTradingHeader from "./ManualTradingHeader/ManualTradingHeader";
import ManualTradingBody from "./ManuaTradingSecton/ManualTradingBody";
import { useLocation } from "react-router-dom";
import { infoToast } from "../Toasts/Toasts";
const ManualTrading = () => {
  const location = useLocation();

  if(location?.state?.brokerSession === "Expired") {
    infoToast("Broker Session Expired, Please Create New One");
  }
  return (
    <>
      {/* start: page toolbar */}
      <ManualTradingHeader />
      {/* start: page body */}

      <ManualTradingBody/>
    </>
  );
};
export default ManualTrading;
