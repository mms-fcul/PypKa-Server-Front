import { Link } from "gatsby";
import React from "react";

import fct from "../images/fct_logo.png";
import incd from "../images/incd_logo.png";
import fcul from "../images/fcul_logo.png";

const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="row gap-y">
        <div className="col-2" style={{ margin: "auto" }}>
          <img src={fct} />
        </div>
        <div className="col-2" style={{ margin: "auto" }}>
          <img src={incd} />
        </div>
        <div className="col-2" style={{ margin: "auto" }}>
          <img src={fcul} />
        </div>
        <div className="col-12">
          <hr class="my-0" />
        </div>
        <div className="col-12 col-md-6">
          <p className="text-center text-md-left">
            PypKa {new Date().getFullYear()}{" "}
            <a className="text-dark" href="http://mms.rd.ciencias.ulisboa.pt">
              MMS@FCUL
            </a>
            . Crafted by{" "}
            <a className="text-dark" href="https://github.com/pedrishi">
              Pedro Reis
            </a>
          </p>
        </div>

        <div className="col-12 col-md-6">
          <ul className="nav nav-inline nav-primary nav-dotted nav-dot-separated justify-content-center justify-content-md-end">
            <li className="nav-item">
              <Link className="nav-link" to="/privacy">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
