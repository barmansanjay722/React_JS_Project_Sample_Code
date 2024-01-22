import TradeSetupTable from "./TradeSetupTable/TradeSetupTable";
const TradeSetupBody = () => {
  return (
    <>
      <div className="page-body px-xl-4 px-sm-2 px-0 py-lg-2 py-1 mt-1">
        <div className="container-fluid">
          <div className="row g-2 mb-5">
            <div className="col-12">
              {/* <h5 className="fw-bold mb-2">Recent Transaction</h5> */}
              <div className="card">
                <div className="card-body">
                     <TradeSetupTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TradeSetupBody;
