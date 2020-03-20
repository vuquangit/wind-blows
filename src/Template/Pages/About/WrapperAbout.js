import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const WrapperAbout = ({ children }) => {
  return (
    <div className="w-100">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default WrapperAbout;
