import React, { useState } from "react";
import LeftMenu from "../LeftMenu/LeftMenu.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

const Positions = () => {
  return (
    <>
      <div>
        <div className="layout-1" data-luno="theme-red">
          {/* start: sidebar */}
          <div className="sidebar p-2 py-md-3">
            <LeftMenu />
          </div>

          {/* start: body area */}
          <div className="wrapper">
            {/* start: page header */}
            <header className="page-header sticky-top px-xl-4 px-sm-2 px-0 py-lg-2 py-1">
              <Header />
            </header>

            {/* start: page footer */}
            <footer className="page-footer px-xl-4 px-sm-2 px-0 py-3">
              <Footer />
            </footer>
          </div>
        
        </div>
      </div>
    </>
  );
};

export default Positions;
