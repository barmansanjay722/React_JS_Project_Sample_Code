const OrderHeader = () => {
  return (
    <>
      <div className="page-toolbar px-xl-4 px-sm-2 px-0 py-3">
        <div className="container-fluid">
          {/* .row end */}
          <div className="row align-items-center">
            <div className="col-auto mt-3" >
              <h1 className="fs-5 color-900 mt-1 mb-0">Orders</h1>
              <small className="text-muted">Your orders of the day</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderHeader;
