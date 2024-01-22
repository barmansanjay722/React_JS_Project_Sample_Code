import { Outlet } from "react-router-dom";
import Header from "../component/Header/Header";
import LeftMenu from "../component/LeftMenu/LeftMenu";
import Footer from "../component/Footer/Footer";
import { useEffect } from "react";
import React from "react";
import BreadCrumbs from "../component/BreadCrumbs/BreadCrumbs";

const PrivateRoute = () => {

  useEffect(() => {
    document.body.classList.add('layout-1');
  
    return function cleanup() {
      document.body.classList.remove('layout-1');
    };
  }, []);
  return (
    <>
      
  
          <div className="sidebar p-2 py-md-3">
            <LeftMenu />
          </div>

          <div className="wrapper">
            <header className="page-header sticky-top px-xl-4 px-sm-2 px-0 py-1">
              <Header />
              
            </header>
           
             {/* <BreadCrumbs/> */}
            <Outlet />

            <footer className="page-footer px-xl-4 px-sm-2 px-0 py-3">
              <Footer />
            </footer>
          </div>
   
      
    </>
  );
};

export default PrivateRoute;
