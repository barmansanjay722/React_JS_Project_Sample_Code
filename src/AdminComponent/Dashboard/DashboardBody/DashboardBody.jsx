import Summary from "./Summary/Summary";
import AdminBody from "./AdminBody/AdminBody";
const DashboardBody = () => {
  return (
    <>
      <div className="page-body px-xl-4 px-sm-2 px-0 py-lg-2 py-1 mt-1">
        <div className="container-fluid">
          <Summary />
          <AdminBody />
        </div>
      </div>
    </>
  );
};
export default DashboardBody;
