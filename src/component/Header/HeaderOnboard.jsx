// import "./Header.css";
import {useState,useEffect} from "react";
import HeaderProfileLink from "./HeaderProfileLink.jsx";
import UpgradeBtn from "./UpgradeBtn";
import HeaderToggleBtn from "./HeaderToggleBtn";
import { getCustomerProfile } from "../../services/profileService";
const HeaderOnboard = () => {
  let [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const tmp = await getCustomerProfile();
      setData(tmp.data);
    };
   
    fetchData();
  }, []);
  return (
    <>
      <div className="container-fluid">
        <nav className="navbar py-0">
          {/* start: toggle btn */}
          <HeaderToggleBtn />
         
          <div className="header-left flex-grow-1 d-none d-md-block">
            <div className="row align-items-center px-4">
              {/* <div className="col-auto">
                <h1 className="fs-3 color-900 mt-1 mb-0">Nifty 100</h1>
              
              </div> */}
            </div>
          </div>
  
          <HeaderProfileLink data={data} />
          {(data!= null && data.isActiveSubscription==="false") &&<UpgradeBtn />}
        </nav>
      </div>
    </>
  );
};
export default HeaderOnboard;
