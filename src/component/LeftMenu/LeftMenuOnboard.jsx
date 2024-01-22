// import "./LeftMenu.css";
import LeftMenuTitle from "./LeftMenuTitle";

import LeftMenuFooter from "./LeftMenuFooter";
import LeftMenuList from "./LeftMenuList";
import LeftMenuBrokerBtn from "./LeftMenuBrokerBtn";

const LeftMenuOnboard=()=>{
   return (
    <>
       <div className="container-fluid">
        {/* sidebar: title*/}
         <LeftMenuTitle />
         {/* sidebar: menu list */}
         
         <div className="main-menu flex-grow-1">
          <LeftMenuList />
          <LeftMenuBrokerBtn />
         </div>
         
         {/* sidebar: footer link */}
         <LeftMenuFooter/>
         
       </div>

    </>
   )
}  
export default LeftMenuOnboard;