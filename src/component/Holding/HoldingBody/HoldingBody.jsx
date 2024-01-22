import HoldingTable from "./HoldingTable/HoldingTable";
const   HoldingBody = () => {
  return (
    <>
      <div className="page-body px-xl-4 px-sm-2 px-0 py-lg-2 py-1 mt-1">
        <div className="container-fluid">
          {/* start PositionTable code */}
          <HoldingTable />
        </div>
      </div>
    </>
  );
};
export default HoldingBody;
