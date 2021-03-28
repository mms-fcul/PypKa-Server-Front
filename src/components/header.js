import { Link } from "gatsby";
import React, { useState, useEffect } from "react";
import logo from "../images/pypka_logo.png";
import logo_inv from "../images/pypka_logo_inv.png";
import { node } from "prop-types";

const Header = ({ siteTitle }) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    if (state) {
      document.body.classList.add("navbar-open");
    } else {
      document.body.classList.remove("navbar-open");
    }

    const element = document.getElementById("navbar-mobile");
    const outsideClickListener = (event) => {
      if (!element.contains(event.target) && state) {
        setState(false);
        removeClickListener();
      }
    };

    const removeClickListener = () => {
      document.removeEventListener("click", outsideClickListener);
    };

    document.addEventListener("click", outsideClickListener);

    return () => {};
  });

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark flex-column"
      style={{
        position: "absolute",
        borderBottom: "1px solid rgba(255, 255, 255, 0.6)",
        height: "80px",
        top: "0",
        marginTop: "15px",
      }}
    >
      <div className="container">
        <div className="navbar-left">
          <button
            className="navbar-toggler"
            id="toggler"
            type="button"
            style={{ margin: "auto", fontSize: "25px" }}
            onClick={() => {
              setState(true);
            }}
          >
            &#9776;
          </button>
          <Link className="topbar-brand" to="/">
            <img src={logo_inv} alt="logo" />
          </Link>
        </div>

        <section className="navbar-mobile" id="navbar-mobile">
          <nav className="nav nav-navbar ml-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/run-pypka">
              Run Pypka
            </Link>
            <Link className="nav-link" to="/latest">
              Latest Simulations
            </Link>
            <Link className="nav-link" to="/pKPDB">
              pKPDB
            </Link>

            <a className="nav-link" href="https://github.com/mms-fcul/PypKa">
              GitHub
            </a>
            <a
              className="nav-link"
              href="https://pypka.readthedocs.io/en/latest/"
            >
              Documentation
            </a>
            <a className="nav-link" href="http://mms.rd.ciencias.ulisboa.pt">
              MMS@FCUL
            </a>
          </nav>
        </section>
      </div>
    </nav>
  );
};

export default Header;

/*
  
  <nav className="topbar topbar-inverse topbar-expand-md topbar-sticky">
    <div className="container">
      <div className="topbar-left">
        <button className="topbar-toggler">&#9776;</button>
        <Link className="topbar-brand" to="/">
          <img className="logo-default" src={logo} alt="logo" />
          <img className="logo-inverse" src={logo_inv} alt="logo" />
        </Link>
      </div>

      <div className="topbar-right">
        <ul className="topbar-nav nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/run-pypka">
              Run Pypka
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/latest">
              Latest Simulations
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pKPDB">
              pKPDB
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://github.com/mms-fcul/PypKa">
              GitHub
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="https://pypka.readthedocs.io/en/latest/"
            >
              Documentation
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://mms.rd.ciencias.ulisboa.pt">
              MMS@FCUL
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
*/
