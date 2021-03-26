import React, { useEffect, useState } from "react";
import { Link } from "gatsby";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import comp_cluster from "../images/comp_cluster.jpg";

import Layout from "../components/layout";
import HeaderBar from "../components/headerbar";
import ControlledExpansionPanels from "../components/accordion";

import { getSubmissions } from "../utils/pypka";

const Latest = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    const updateSubmissions = async () => {
      if (state.length == 0) {
        const results = await getSubmissions();
        console.log(results);
        if (results.status) {
          setState(results.data);
        } else {
          toast.warning(`PypKa API Error: /getSubmissions`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }
    };
    console.log(state);
    updateSubmissions();
  });

  return (
    <Layout>
      <HeaderBar
        image={comp_cluster}
        title={"Latest Simulations"}
        subtitle={""}
      />

      <section id="basic" className="section bb-1">
        <div className="container">
          <div className="row gap-y">
            <div className="col-md-8 offset-md-2">
              {state.map((value, index) => {
                return (
                  <ControlledExpansionPanels
                    jobid={value[0]}
                    datetime={value[1]}
                    name={value[2]}
                    subid={value[3]}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Latest;
