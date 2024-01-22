import AdminChart from "./AdminChart";
import DashboardTable from "./DashboardTable";
const AdminBody=()=>{
   return(
    <>
      <div className="row g-3 row-deck">
        <div className="col-xxl-12 col-xl-12 col-lg-12">
          <AdminChart />
        </div>
        <div className="col-xxl-12 col-xl-12 col-lg-12">
        <DashboardTable />
        </div>
        </div>
    </>
   );
}
export default AdminBody