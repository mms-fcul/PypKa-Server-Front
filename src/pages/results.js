import React from "react";

import Layout from "../components/layout";
import HeaderBar from "../components/headerbar";
import PKTable from "../components/pktable";
import LinePlot from "../components/lineplot";
import { ProgressCircle, ProgressLinear } from "../components/progressBar";

import { card, cardBody } from "./run-pypka.module.css";
import "../styles/thesaas.scss";

import comp_cluster from "../images/comp_cluster.jpg";
import graph_design from "../images/graph_design.png";

import {
  queryPKPDB,
  check_queue_size,
  start_sse,
  donwloadFile,
} from "../utils/pypka";

import GlobalState from "../context/ThemeContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function downloadString(text, fileType, fileName) {
  var blob = new Blob([text], { type: fileType });

  var a = document.createElement("a");
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(":");
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () {
    URL.revokeObjectURL(a.href);
  }, 1500);
}

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultState;

    console.log(props.location);
    console.log(("PASSED STATE", props.location.state));
    if (props.location.search.startsWith("?query=")) {
      if (props.location.state && props.location.state.pdbcode) {
        this.state = props.location.state;
        this.state.query = props.location.state.pdbcode;
        this.global = new GlobalState(props.location.state.pdbcode);
        this.global.saveSubmission(
          props.location.state.pdbcode,
          props.location.state
        );
      } else {
        this.state = pKPDBParams;
        let pdbcode = props.location.search.split("?query=")[1];
        this.state.pdbcode = pdbcode;
        this.state.query = pdbcode;
        this.state.protein_name = pdbcode;
        this.queryPKPDB();
      }
    } else if (props.location.search.startsWith("?jobid=")) {
      if (props.location.state && props.location.subID) {
        this.state = props.location.state;
        this.global = new GlobalState(props.location.subID);
      } else {
        let subID = props.location.search.split("?jobid=")[1];
        this.state.subID = subID;
        this.global = new GlobalState(subID);
      }
    }
  }

  componentDidMount() {
    if (this.state.query) {
      return;
    }

    this.update_queue_size();

    console.log("BSTATE", this.state);

    console.log("IN CACHE", this.global);

    if (
      this.global.state.pKas.length !== 0 &&
      this.global.state.tit_x.length !== 0
    ) {
      this.setState({ ...this.global.state });
    } else {
      let subID = this.state.subID;
      let page = this;

      const sse = start_sse(subID);
      sse.addEventListener("new_message", (event) => {
        console.log(`Received data from server`);
        let data = JSON.parse(event.data);
        console.log(data);
        console.log(data.status);
        if (data.status === "running") {
          console.log("Job still running");
          page.setState({ log: data.content });
          console.log(data.content);
        } else if (data.status === "success") {
          console.log("Job has finished");
          page.setState({ ...data.content });
          page.global.saveSubmission(subID, data.content);
          sse.close();
        } else if (data.status === "failed") {
          console.log("BOOOM");
        } else {
          console.log("A non authorized status has been passed.");
        }
        if (
          !page.state.nchains &&
          typeof data.content == "object" &&
          data.content &&
          "pKas" in data.content &&
          data.content.pKas
        ) {
          page.update_missing_chains(data.content.pKas);
        }
      });
    }

    console.log("ASTATE", this.state);

    // setTimeout(function () {
    //   window.dispatchEvent(new Event("resize"));
    // }, 5000);
  }

  DownloadTitration = () => {
    var tit_data = "pH;pKa\n";
    for (const i in this.state.tit_y) {
      const x = this.state.tit_x[i];
      const y = this.state.tit_y[i];
      tit_data = tit_data.concat(`${x};${y}\n`);
    }
    console.log(tit_data);
    downloadString(tit_data, "text/csv", "titration.csv");
  };

  DownloadpKTable = () => {
    var pK_table = "Chain;Type;Number;pKa\n";
    for (const elem of this.state.pKas) {
      pK_table = pK_table.concat(`${elem}\n`.split(",").join(";"));
    }
    console.log(pK_table);
    downloadString(pK_table, "text/csv", "pKs.csv");
  };

  DownloadParams = () => {
    const params_cleaned =
      " " +
      this.state.params
        .slice(1, -1)
        .replaceAll("'", "")
        .replaceAll(": ", " = ");
    downloadString(params_cleaned, "text/txt", "params.txt");
  };

  DownloadPDB = (f, fname) => {
    downloadString(f, "text/txt", fname);
  };

  async queryPKPDB() {
    const response = await queryPKPDB(this.state.pdbcode);
    if (response.status) {
      this.setState({ ...response.data });
      if (!response.data.pKas) {
        this.setState({
          failed: true,
        });
        toast.warning(`${this.state.pdbcode} not found in pKPDB`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        const pKas = response.data.pKas;
        this.update_missing_chains(pKas);
      }
    } else {
      toast.warning(`PypKa API Error: /query`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  update_missing_chains(pKas) {
    const nsites = pKas.length;
    let chains = [];
    pKas.forEach((i) => {
      if (!chains.includes(i[0])) {
        chains.push(i[0]);
      }
    });
    const nchains = chains.length;

    this.setState({
      nsites: nsites,
      nchains: nchains,
    });
  }

  async update_queue_size() {
    let response = await check_queue_size();

    console.log("QUEUE SIZE:", response, this.state.pKas || this.state.failed);

    if (response) {
      const queue_size = response.data;
      this.setState({
        queue_size: queue_size,
      });
    }

    if (this.state.failed || this.state.pKas) {
      return;
    } else {
      setTimeout(() => {
        this.update_queue_size();
      }, 5000);
    }
  }

  async update_pypka_status(socket) {
    console.log("EMITING", this);
    socket.emit("get pypka status", this.state.subID);

    if (this.state.failed || this.state.pKas) {
      return;
      // } else {
      //   setTimeout(() => {
      //     this.update_pypka_status(socket);
      //   }, 1000);
    }
  }

  render() {
    return (
      <Layout>
        <HeaderBar image={comp_cluster} title={"Results"} subtitle={""} />
        {this.state.pKas ? (
          ""
        ) : (
          <ProgressLinear run_time={this.state.time_estimate} />
        )}

        <section
          style={{
            display: this.state.log || this.state.pKas ? "none" : "block",
            marginTop: "50px",
            fontSize: "18px",
          }}
        >
          <div
            style={{
              display: "block",
              textAlign: "center",
            }}
          >
            {this.state.queue_size > 1 ? (
              <p>Jobs in Queue: {this.state.queue_size}</p>
            ) : (
              <p>Starting Job</p>
            )}
          </div>
        </section>

        <section
          style={{
            display: this.state.pKas && !this.state.failed ? "none" : "block",
            marginTop: "50px",
            fontSize: "18px",
          }}
        >
          <div>
            <p
              id="pypkalog"
              style={{ textAlign: "center", whiteSpace: "pre-wrap" }}
            >
              {this.state.log}
            </p>
          </div>
        </section>

        <section id="basic" className="section bb-1">
          <div className="container">
            <div className="row gap-y">
              <div className="col-md-6">
                <div className={"card shadow-4 " + card}>
                  <div className={"card-body " + cardBody}>
                    <h2>{this.state.protein_name}</h2>
                    <div className="row gap-y">
                      <div className="col-md-6">
                        <p>Number of Titrable Sites: {this.state.nsites}</p>
                        <p>
                          pH range: {this.state.pHmin}-{this.state.pHmax}
                        </p>
                        <p>Ionic Strength: {this.state.ionicStrength}</p>

                        {this.state.original_pdb ? (
                          <button
                            style={{ marginBottom: "10px" }}
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={async () => {
                              const toastId = toast.info(
                                `Downloading pdb_${this.state.subID}.pdb`,
                                {
                                  position: "top-right",
                                  hideProgressBar: true,
                                  closeOnClick: false,
                                  draggable: false,
                                }
                              );
                              var response = await donwloadFile(
                                this.state.subID,
                                "original_pdb"
                              );
                              toast.dismiss(toastId);
                              this.DownloadPDB(
                                response.data,
                                `pdb_${this.state.subID}.pdb`
                              );
                            }}
                          >
                            Original PDB
                          </button>
                        ) : (
                          ""
                        )}
                        {this.state.pdb_out ? (
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={async () => {
                              const toastId = toast.info(
                                `Downloading pdb_${this.state.subID}.pdb`,
                                {
                                  position: "top-right",
                                  hideProgressBar: true,
                                  closeOnClick: false,
                                  draggable: false,
                                }
                              );
                              var response = await donwloadFile(
                                this.state.subID,
                                "pdb_out"
                              );
                              toast.dismiss(toastId);
                              this.DownloadPDB(
                                response.data,
                                `pdb_${this.state.subID}_${this.state.outputFilepH}.pdb`
                              );
                            }}
                          >
                            PDB at pH {this.state.outputFilepH}{" "}
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-md-6">
                        <p>Number of Chains: {this.state.nchains}</p>

                        <p>
                          Protein Dielectric: {this.state.proteinDielectric}
                        </p>
                        <p>
                          Solvent Dielectric: {this.state.solventDielectric}
                        </p>
                        {this.state.params ? (
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={this.DownloadParams}
                          >
                            All Parameters
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div
                  className={"card shadow-4 " + card}
                  style={{ display: this.state.failed ? "none" : "flex" }}
                >
                  {this.state.tit_x ? (
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={this.DownloadTitration}
                    >
                      Download CSV
                    </button>
                  ) : (
                    ""
                  )}
                  <div className={"card-body " + cardBody}>
                    {this.state.tit_x ? (
                      <LinePlot x={this.state.tit_x} y={this.state.tit_y} />
                    ) : (
                      <div>
                        <h5>Titration Curve</h5>
                        <ProgressCircle />
                      </div>
                    )}
                  </div>
                  <div
                    className={"card-body " + cardBody}
                    style={{ textAlign: "center" }}
                  >
                    {this.state.pI ? `Isoelectric Point: ${this.state.pI}` : ""}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className={"card shadow-4 " + card}
                  style={{ display: this.state.failed ? "none" : "flex" }}
                >
                  {this.state.pKas ? (
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={this.DownloadpKTable}
                    >
                      Download CSV
                    </button>
                  ) : (
                    ""
                  )}
                  <div className={"card-body " + cardBody}>
                    <PKTable pKas={this.state.pKas} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="row gap-y align-items-center">
              <div className="col-md-6 text-center">
                <img src={graph_design} alt="..." />
              </div>

              <div className="col-md-6 text-center text-md-left">
                <h2>Help us develop a better service</h2>
                <p className="lead mb-6">
                  Report errors and let us know what other plots and data you
                  would like to see
                </p>
                <p>
                  <a
                    className="btn btn-lg btn-round btn-info button"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdRRt5i5edat78zyKE-dqAl7UhLP9PyCvLpv_JlYD8k7w9TvQ/viewform?usp=sf_link"
                    data-mode="popup"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Reach Out
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

const defaultState = {
  subID: null,
  pdbfile: "",
  inputFileNamingScheme: "",
  outputpKValues: "",
  outputPDBFile: "",
  outputFileNamingScheme: "",
  outputFilepH: "",
  pHmin: 0,
  pHmax: 0,
  pHstep: 0,
  proteinDielectric: 0,
  solventDielectric: 0,
  ionicStrength: 0,
  nchains: 0,
  nsites: 0,
  protein_name: "",
  time_estimate: 0,
  email: "",
  pKas: "",
  tit_x: "",
  tit_y: "",
  pI: null,
  params: "",
  pdb_out: "",
  failed: null,
  queue_size: null,
  log: null,
};

const pKPDBParams = {
  ionicStrength: 0.1,
  pHmin: -6,
  pHmax: 20,
  proteinDielectric: 15,
  solventDielectric: 80,
};

export default Results;
