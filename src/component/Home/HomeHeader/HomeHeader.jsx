import PortfollioStats from "./PortfollioStats/PortfollioStats";
import WatchListTable from "./WatchList/WatchListTable/WatchListTable";

const HomeHeader = () => {
  
  return (
    <>
      <div className="page-body px-xl-4 px-sm-2 px-0 py-lg-2 pb-1 mt-0 wraper">
        <div className="container-fluid">
          <PortfollioStats />
          <WatchListTable/>
        </div>
      </div>
    </>
  );
};
export default HomeHeader;
