/* eslint-disable jsx-a11y/anchor-is-valid */
import { getBrokers } from "../../../services/brokerService";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthUrl } from "../../../redux/features/authslice";
const BrokerHouse = ({setRegisterUrl}) => {
  const dispatch = useDispatch();

  const [limit] = useState(5);
  const [offset] = useState(0);

  const handleChange = (value,onboardingUrl) => {
    
    setRegisterUrl(onboardingUrl);
    dispatch(
      setAuthUrl({
        authUrl: value,
      })
    );
  };

  const { data } = getBrokers(limit, offset);
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <h6>
            <span className="text-secondary">Step 1</span> Select the broker
            house that you want to trade with
          </h6>
          <div className="row broker-list animate__animated animate__fadeIn mb-4">
            {data?.map((item, index) => (
              <div
                className="col-lg-2 col-md-2 col-sm-6 col-6 mb-3"
                key={index}
              >
                <a 
                style={{
                  cursor: "pointer"
                }}
                className="card active text-primary">
                  <div className="card-body text-center">
                    <input
                      className="form-check-input checkbox-active"
                      type="radio"
                      id="flexCheckDefault"
                      name="bb"
                      onChange={() => {
                        handleChange(item.authUrl,item.onboardingUrl);
                      }}
                    />
                    <img
                      className="pb-2 me-2"
                      src={item.logo}
                      alt={"logo"}
                      style={{
                        width: "100%",
                        height: "80px",
                        position: "relative",
                        left: "50%",
                        transform: "translateX(-36%)",
                      }}
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default BrokerHouse;
