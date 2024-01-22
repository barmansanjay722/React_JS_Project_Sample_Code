import React from "react";
import Loader from "../Loader/Loader";
import { useSearchParams } from "react-router-dom";
import { SaveCustomerBroker } from "../../services/sessionService";
import { BrokerName } from "../../utils/BrokerNameConstant";

const Redirect = () => {
    const [searchParams] = useSearchParams();
 
    if (searchParams.get("authCode") != null) {
      const authCode = searchParams.get("authCode");
      const appCode = searchParams.get("appcode");
      const userID = searchParams.get("userId");
      const data = {
        appCode: appCode,
        authCode: authCode,
        userID: userID,
        brokerID: 1,
      };

      // eslint-disable-next-line no-unused-vars
      const response = SaveCustomerBroker(data, "/broker/customer");
    } else if (
      searchParams.get("authtoken") != null &&
      searchParams.get("state") === "mosl"
    ) {
      const data = {
        authToken : searchParams.get("authtoken"),
        brokerId : 2
      };
      SaveCustomerBroker(data, "/broker/motilal/customer"); 
    }else if (searchParams.get("requestToken") != null &&
    searchParams.get("success") === "true"){
      const data = {
        authToken : searchParams.get("requestToken"),
        state : searchParams.get("success"),
        brokerId : 3
      }
      SaveCustomerBroker(data, "/broker/paytm/customer"); 
    }
  return (
    <>
    <div style={{marginTop:'400px', marginLeft:'850px'}}>
    <Loader />
    </div>
    

    </>
  );
};

export default Redirect;
