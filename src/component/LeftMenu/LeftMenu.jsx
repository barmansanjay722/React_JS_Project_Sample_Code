// import "./LeftMenu.css";
import LeftMenuTitle from "./LeftMenuTitle";
import LeftMenuBody from "./LeftMenuBody";
import LeftMenuFooter from "./LeftMenuFooter";
import LeftMenuBrokerBtn from "./LeftMenuBrokerBtn";
const LeftMenu=()=>{
   return (
    <>
       <div className="container-fluid">
        {/* sidebar: title*/}
         <LeftMenuTitle />
         {/* sidebar: menu list */}
         
         <LeftMenuBody/>
         
         {/* sidebar: footer link */}
         <LeftMenuFooter/>

       </div>

    </>
   )
}  
export default LeftMenu;