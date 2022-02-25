import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./header.js";
import Footer from "./footer.js";
import { toast } from "react-toastify";
import ReactGA from "react-ga";

toast.configure();

const Layout = ({ children }) => {
  useEffect(() => {
    ReactGA.initialize("G-DDD8N66YR7");
  }, []);

  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
