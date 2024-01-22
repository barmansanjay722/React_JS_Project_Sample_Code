import LeftMenuFooter from "../../component/LeftMenu/LeftMenuFooter";
import LeftMenuTitle from "./LeftMenuTitle";
import LeftMenuList from "./LeftMenuList";

const LeftMenu = () => {
  return (
    <>
      <div className="container-fluid">
        {/* sidebar: title*/}
         <LeftMenuTitle />
        {/* sidebar: menu list */}
        <LeftMenuList />
        {/* sidebar: footer link */}
       <LeftMenuFooter />
      </div>
    </>
  );
};
export default LeftMenu;
