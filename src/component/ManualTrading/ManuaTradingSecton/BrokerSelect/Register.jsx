import {Link} from "react-router-dom";
const Register = ({registerUrl}) => {

  return (
    <>
      <div className="card">
        <div className="card-body d-flex">
          <div className="col-md-4">
            <img
              className="img-fluid"
              src="./assets/images/sign-up.svg"
              alt="Create Event"
            />
          </div>
          <div className="col-md-8 ps-4">
            <h5 className="text-primary pt-2">Register a new account</h5>
            <p className="text-muted">
              (AlgoTic subscription Fee:{" "}
              <span className="text-secondary">₹ 0</span> for lifetime)
            </p>
            {/* Modal */}
            <Link
             to={registerUrl}
              className="btn btn-primary btn-sm px-4 text-uppercase "
              
              type="button"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default Register;
