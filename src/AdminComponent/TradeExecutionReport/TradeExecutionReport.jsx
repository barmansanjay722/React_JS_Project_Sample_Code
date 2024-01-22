import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";

import ReportBody from "./ReportBody/ReportBody";
import ReportHeader from "./ReportHeader/ReportHeader";
const TradeExecutionReport = () => {
  return (
    <>
      {/* start: page toolbar */}
      <BreadCrumbs />
      {/* start : Page Header */}
      <ReportHeader />
      {/* start: page body */}
      <ReportBody />
       
    </>
  );
};
export default TradeExecutionReport;