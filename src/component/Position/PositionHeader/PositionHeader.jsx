import { squareOffInfo } from "../../../services/stockService";
import { successToast } from "../../Toasts/Toasts";
import { useDispatch } from "react-redux";
import { getPositionList } from "../../../redux/features/stockSlice";
const PositionHeader = () => {
  const dispatch = useDispatch();

  const GetSquareOff = async () => {
    try {
      // backend api call for POST request

      const savedUserResponse = await squareOffInfo();
      if (
        savedUserResponse.status === 200 ||
        savedUserResponse.status === 201
      ) {
        dispatch(getPositionList());
        successToast("Square Off Updated");
      }
    } catch {
      console.log("error");
    }
  };
  return (
    <>
      <div className="page-toolbar px-xl-4 px-sm-2 px-0 py-3">
        <div className="container-fluid">
          {/* .row end */}
          <div className="row align-items-center">
            <div className="col-auto mt-3" >
              <h1 className="fs-5 color-900 mt-1 mb-0">Positions</h1>
              <small className="text-muted">Your open positions</small>
            </div>
            <div className="col d-flex justify-content-lg-end mt-2 mt-md-0">
              <div className="col text-lg-end">
                <label
                  className="btn btn-sm lift btn-outline-primary px-4 ms-4"
                  htmlFor="btnradio1"
                  title="Add"
                  onClick={GetSquareOff}
                >
               <span className="fw-bold">SQUARE OFF</span>
               <p className="small mb-0">All open positions</p> 
                  
                </label>
                {/* <Link className="btn btn-sm lift bg-primary text-light px-4 ms-4 fw-bold" href="profile.html">Square Off
            <p className="small mb-0">All open positions</p>
        </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PositionHeader;
