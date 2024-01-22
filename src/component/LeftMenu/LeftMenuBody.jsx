// import "./LeftMenu.css";
import LeftMenuBrokerBtn from "./LeftMenuBrokerBtn";
import LeftMenuList from "./LeftMenuList";
import { useEffect, useState } from "react";
import { fetchSocketSession } from "../../services/socketService";
const LeftMenuBody = () => {

  const [canShow, setCanShow] = useState(false);

  useEffect(() => {
    fetchResponse();
  }, []);

  const fetchResponse = async() => {
    const response = await fetchSocketSession();
    if(response?.data?.paperTrade === true)
    {
      setCanShow(true);
    }
    else{
      setCanShow(false);
    }

  };

  return (
    <>
      <div className="main-menu flex-grow-1">
        <LeftMenuList />
      {canShow && <LeftMenuBrokerBtn /> }
      </div>
    </>
  );
};
export default LeftMenuBody;
