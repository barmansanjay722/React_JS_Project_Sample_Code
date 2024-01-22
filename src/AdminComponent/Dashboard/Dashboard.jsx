import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import DashboardBody from "./DashboardBody/DashboardBody";
const Dashboard = () => {
  return (
    <>
      {/* start: page toolbar */}
      <BreadCrumbs />

      {/* start: page body */}
      <DashboardBody />
    </>
  );
};
export default Dashboard;
