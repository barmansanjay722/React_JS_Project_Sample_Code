import "./Layout.css";
import LeftMenu from "../LeftMenu/LeftMenu.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      
        <body className="layout-1" data-luno="theme-red">
          {pathname === "/" ||
          pathname === "/signup" ||
          pathname === "/intraction" ? null : (
            <div className="sidebar p-2 py-md-3">
              <LeftMenu />
            </div>
          )}

          <div className="wrapper">
            {pathname === "/" ||
            pathname === "/signup" ||
            pathname === "/intraction" ? null : (
              <header className="page-header sticky-top px-xl-4 px-sm-2 px-0 py-lg-2 py-1">
                <Header />
              </header>
            )}

            {children}

            {pathname === "/" ||
            pathname === "/signup" ||
            pathname === "/intraction" ? null : (
              <footer className="page-footer px-xl-4 px-sm-2 px-0 py-3">
                <Footer />
              </footer>
            )}
          </div>
        </body>
      
    </>
  )
}
export default Layout;
