import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../component/Footer/Footer";
import Header from "../AdminComponent/Header/Header";
import LeftMenu from "../AdminComponent/LeftMenu/LeftMenu";
const AdminRoute = () => {
  useEffect(() => {
    document.body.classList.add('layout-1');
  
    return function cleanup() {
      document.body.classList.remove('layout-1');
    };
  }, []);
  return (
    <>
      <>
        <div className="sidebar p-2 py-md-3">
        <LeftMenu/>
        </div>
        <div className="wrapper">
          <header className="page-header sticky-top px-xl-4 px-sm-2 px-0 py-lg-2 py-1">
          <Header/>
          </header>
          <Outlet />
          <footer className="page-footer px-xl-4 px-sm-2 px-0 py-3">
            <Footer />
          </footer>
        </div>
      </>
    </>
  );
};
export default AdminRoute;
