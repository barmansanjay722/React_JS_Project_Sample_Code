const HeaderSerachBtn = () => {
  return (
    <>
      <div className="header-left flex-grow-1 d-none d-md-block">
        <div className="row align-items-center px-4">
          {/* <div className="col-auto">
        <h1 className="fs-3 color-900 mt-1 mb-0">Nifty 100</h1>
       
      </div> */}
          <div className="col d-flex justify-content-lg-center mt-2 mt-md-0">
            <div className="p-2 me-md-4">
              <h1 className="fs-4 color-900 mt-1 mb-0">Nifty 100</h1>
            </div>
            <div className="p-2 me-md-4">
              <div>
                <span className="h6 mb-0">17,611.45</span>{" "}
                <small className="text-danger">
                  {" "}
                  00.43% <i className="fa fa-angle-down" />
                </small>
              </div>
              <small className="text-muted text-uppercase">Current</small>
            </div>
            <div className="p-2 me-md-4">
              <div>
                <span className="h6 mb-0">17,648.70</span>{" "}
              </div>
              <small className="text-muted text-uppercase">Open</small>
            </div>
            <div className="p-2 me-md-4">
              <div>
                <span className="h6 mb-0">17,652.20</span>{" "}
              </div>
              <small className="text-muted text-uppercase">High</small>
            </div>
            <div className="p-2 me-md-4 pe-lg-0">
              <div>
                <span className="h6 mb-0">17,541.80</span>{" "}
              </div>
              <small className="text-muted text-uppercase">Low</small>
            </div>
            {/* <a className="btn btn-sm lift bg-primary text-light px-4" href="profile.html">Paper Trading<br>
                  Upgrade Now
              </a> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default HeaderSerachBtn;
