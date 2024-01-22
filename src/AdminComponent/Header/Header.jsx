import HeaderToggleBtn from "../../component/Header/HeaderToggleBtn";
import HeaderProfileLink from "./HeaderProfileLink";
import HeaderSerachBtn from "./HeaderSearchBtn";
const Header = () => {
  return (
    <>
      <div className="container-fluid">
        <nav className="navbar py-0">
            {/* start: toggle btn */}
               <HeaderToggleBtn/>   
            {/* start: search area */}
             <HeaderSerachBtn />
            {/* start: link */}
            <HeaderProfileLink />

          
        </nav>
    </div>
    </>
  );
};
export default Header;
