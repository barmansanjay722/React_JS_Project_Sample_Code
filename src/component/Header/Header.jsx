
import HeaderProfileLink from "./HeaderProfileLink.jsx";
import HeaderInformation from "./HeaderInformation";
 import UpgradeBtn from "./UpgradeBtn";
import { useEffect, useState } from "react";
import { getCustomerProfile } from "../../services/profileService";
import HeaderToggleBtn from "./HeaderToggleBtn";
const Header = () => {
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
          {/* start: search area */}
          <HeaderInformation />
          {/* start: link */}
          {data!= null && <HeaderProfileLink data={data}/>}
          {(data!= null && data.isActiveSubscription==="false") &&<UpgradeBtn />}
        </nav>
      </div>
    </>
  );
};
export default Header;
