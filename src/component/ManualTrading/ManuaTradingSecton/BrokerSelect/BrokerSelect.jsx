import Login from "./Login.jsx";
import Register from "./Register.jsx";
const BrokerSelect = ({registerUrl}) => {
  return (
    <>
      <div className="row mb-4">
        <h6>
          <span className="text-secondary">Step 2</span> Select if you would
          like to
        </h6>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-3">
          <Register registerUrl={registerUrl}/>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-3">
        <Login />
        </div>
      </div>
    </>
  );
};
export default BrokerSelect;
