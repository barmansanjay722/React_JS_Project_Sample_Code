import BrokerHouse from "./BrokerHouse";
import BrokerSelect from "./BrokerSelect/BrokerSelect";
import { useState } from "react";
const ManualTradingBody = () => {
  const [registerUrl, setRegisterUrl] = useState("");
  return (
    <>
      {/* start: page body */}
      <div className="page-body px-xl-4 px-sm-2 px-0 py-lg-2 py-1">
        <div className="container-fluid">
          <div className="row g-3 row-deck" >
            {/* start: Connection Request */}
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
              <div className="card  p-2">
                <div className="card-body">
                  <BrokerHouse setRegisterUrl={setRegisterUrl}/>
                  <BrokerSelect registerUrl={registerUrl}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManualTradingBody;
