import { navigate } from "gatsby";
import React from "react";

import Layout from "../components/layout";
import HeaderBar from "../components/headerbar";
import SEO from "../components/seo";
import { InputFloat, InputFloatSimple } from "../components/inputfloat";

import {
  getNumberOfTitrableSites,
  existsOnPKPDB,
  check_queue_size,
  submit_pypka_calculation,
} from "../utils/pypka";
import {
  downloadPDB,
  downloadAlphaFold,
  isPdbIdValid,
  isUniprotIdValid,
} from "../utils/pdb";

import {
  inputGroup,
  borderPrimary,
  formControl,
  hidden,
} from "./run-pypka.module.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import comp_cluster from "../images/comp_cluster.jpg";

class RunPage extends React.Component {
  state = default_values;

  componentDidMount() {
    this.update_queue_size();
  }

  getTimeEstimate = (nsites, pHmax, pHmin, pHstep) => {
    return nsites * 1.2 + nsites * ((pHmax - pHmin) / pHstep) * 0.1;
  };

  setTimeEstimate = () => {
    var estimate = this.getTimeEstimate(
      this.state.nsites,
      this.state.pHmax,
      this.state.pHmin,
      this.state.pHstep
    );
    this.setState({
      time_estimate: estimate,
    });
  };

  setoutputFilepH = (value) => {
    this.setState({
      outputFilepH: value,
    });
  };
  setpHmin = (value) => {
    this.setState({
      pHmin: value,
    });
    console.log(this.state.pHmin);
  };
  setpHmax = (value) => {
    this.setState({
      pHmax: value,
    });
  };
  setpHstep = (value) => {
    if (value == 0) {
      return;
    }
    this.setState({
      pHstep: value,
    });
  };
  setproteinDielectric = (value) => {
    this.setState({
      proteinDielectric: value,
    });
  };
  setsolventDielectric = (value) => {
    this.setState({
      solventDielectric: value,
    });
  };
  setionicStrength = (value) => {
    this.setState({
      ionicStrength: value,
    });
  };
  setemail = (value) => {
    this.setState({
      email: value,
    });
  };

  retrieveNumberOfSites = (event) => {
    const inputFile = event.target.files[0];

    console.log(inputFile);

    const numberOfSites = 1;
    this.setState({
      inputFile: inputFile,
      numberOfTitratableSites: numberOfSites,
    });
  };

  retrieveFromPDB = (pdbid) => {
    if (!pdbid) {
      this.setState({
        pdbcode_error: null,
      });
      return;
    }
    if (![4, 6, 10].includes(pdbid.length)) {
      this.setState({
        pdbcode_error:
          "Please insert a valid PBD code or UniProtKB accession number.",
      });
    } else if (pdbid.length == 4) {
      this.setState({
        pdbcode_error: "Checking PDB code...",
      });
      this.checkPdbId(pdbid, "PDB");
    } else if (pdbid.length === 6 || pdbid.length === 10) {
      let re = new RegExp(
        "[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2}"
      );
      var codeValidity = re.exec(pdbid);

      if (codeValidity && codeValidity[0] == codeValidity.input) {
        this.setState({
          pdbcode_error: "Checking UniprotKB accession number...",
        });
        this.checkPdbId(pdbid, "AF");
      } else {
        this.setState({
          pdbcode_error: "Wrong UniProtKB accession number format",
        });
      }
    } else {
      this.setState({
        pdbcode_error:
          "UniProtKB accession numbers should be comprised of 6 or 10 characters",
      });
    }
  };

  submitForm = () => {
    console.log(this.state);
    var triggerHappy = true;

    // Check if pdbfile has been saved
    if (!this.state.pdbfile) {
      triggerHappy = false;
      console.log("pdbfile not found");
    }

    // Check that if the input mode is a uploaded file
    // we have saved the naming scheme
    if (this.state.inputModeRadio === "upload") {
      if (!this.state.inputFileNamingScheme) {
        triggerHappy = false;
        console.log("inputFileNamingScheme not found");
      }
    }

    // Check there is at least one of the output modes
    if (!(this.state.outputpKValues || this.state.outputPDBFile)) {
      triggerHappy = false;
      console.log("no output mode found");
    }

    // Check that if the output file mode is turned on
    // its desired pH value and naming schema are selected
    if (this.state.outputPDBFile) {
      if (!(this.state.outputFilepH && this.state.outputFileNamingScheme)) {
        triggerHappy = false;
        console.log("outputfile pH value or naming schema not found");
      }
    }

    if (this.state.outputpKValues) {
      if (
        isNaN(this.state.pHmin) ||
        isNaN(this.state.pHmax) ||
        isNaN(this.state.pHstep)
      ) {
        triggerHappy = false;
        console.log(
          "pH values not defined",
          isNaN(this.state.pHmin),
          isNaN(this.state.pHmax),
          isNaN(this.state.pHstep)
        );
      } else if (this.state.pHmin > this.state.pHmax) {
        triggerHappy = false;
        console.log("pH min > pHmax");
      } else if (this.state.pHstep <= 0) {
        triggerHappy = false;
        console.log("pHstep <= 0");
      }
    }

    if (
      !(
        this.state.proteinDielectric &&
        this.state.solventDielectric &&
        this.state.ionicStrength
      )
    ) {
      triggerHappy = false;
      console.log("either dielectrics or ionic strength is not defined");
    }

    if (!triggerHappy) {
      toast.warning(
        "Please address the missing parameters highlighted in yellow",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } else {
      toast.success("Submitting", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      this.submit_pypka();
    }
  };

  async submit_pypka() {
    this.setTimeEstimate();

    this.setState({
      submitted: true,
    });

    const results = await submit_pypka_calculation(this.state);

    if (results.status) {
      toast.success("Successfully submitted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log("SUBMITTED", results.returned);

      if (results.returned.subID) {
        navigate(`/results?jobid=${results.returned.subID}`, {
          state: { ...this.state, subID: results.returned.subID },
        });
      } else {
        navigate(`/results?query=${this.state.pdbcode}`, {
          state: { ...this.state, ...results.returned },
        });
      }
    } else {
      toast.warning(`PypKa API Error: /submitSim`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    return;
  }

  async update_queue_size() {
    let response = await check_queue_size();

    console.log("QUEUE SIZE:", response, this.state);

    if (response) {
      this.setState({
        queue_size: response.data,
      });
    }

    if (this.state && this.state.submitted) {
      return;
    } else {
      setTimeout(() => {
        this.update_queue_size();
      }, 5000);
    }
  }

  async checkPKPDB() {
    var results = await existsOnPKPDB(this.state.pdbcode);
    console.log(results, this.state.onPKPDB);
    if (results === true) {
      this.setState({
        onPKPDB: true,
      });
    }
  }

  async checkPdbId(pdbid, mode) {
    let pdbid_final = pdbid;
    let pdb_file = null;
    let foundonpkpdb = null;
    var nchains = 0;
    var nsites = 0;
    var protein_name = "";

    if (mode == "PDB") {
      var error = await isPdbIdValid(pdbid);
    } else if (mode == "AF") {
      var error = await isUniprotIdValid(pdbid);
    }

    console.log("isPdbIdValid:", error);

    if (error !== null) {
      pdbid_final = null;
    } else {
      protein_name = pdbid;
      console.log("/download PDB");
      if (mode == "PDB") {
        pdb_file = await downloadPDB(pdbid);
      } else if (mode == "AF") {
        pdb_file = await downloadAlphaFold(pdbid);
      }

      if (pdb_file.startsWith("ERROR")) {
        pdbid_final = null;
        error = pdb_file;
      } else {
        console.log("/getNumberofTitrableSites");

        const response_ntits = await getNumberOfTitrableSites(pdb_file);

        let data = null;
        if (!response_ntits.status) {
          toast.warning(`PypKa API Error: /getTitrableSitesNumber`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else if ("nchains" in response_ntits.data) {
          nchains = response_ntits.data.nchains;
          nsites = response_ntits.data.nsites;

          const response_pkpdb = await existsOnPKPDB(pdbid);

          if (!response_pkpdb.status) {
            toast.warning(`PypKa API Error: /pkpdb`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else {
            foundonpkpdb = response_pkpdb.data;
          }

          console.log(response_ntits.data);
          console.log(protein_name, nchains, nsites);
          console.log(foundonpkpdb);
        }
      }
    }

    this.setState({
      onPKPDB: foundonpkpdb,
      pdbcode: pdbid_final,
      pdbcode_error: error,
      pdbfile: pdb_file,
      nchains: nchains,
      nsites: nsites,
      protein_name: protein_name,
    });
  }

  render() {
    return (
      <Layout>
        <SEO title="Run PypKa | Query pKPDB" />
        <HeaderBar
          image={comp_cluster}
          title={"PypKa Server"}
          subtitle={
            "Leverage the webserver to quickly start calculating p<em>K</em><sub>a</sub> values in your protein of interest"
          }
        />

        <section className="section bg-gray" id="section-form">
          <div className="container">
            <header className="section-header">
              <small>input</small>
              <h2>{this.props.isDarKMode} Parameters</h2>
            </header>

            <div className="row gap-y">
              <div className="col-12 col-lg-4">
                <div className="form-group">
                  <h3
                    className="divider"
                    style={{ fontSize: "1rem", width: "80%", color: "#777" }}
                  >
                    Input Mode
                  </h3>
                  <div className="custom-controls-stacked">
                    <label
                      className="custom-control custom-radio"
                      style={{ textAlign: "center", margin: "auto" }}
                    >
                      <input
                        type="radio"
                        id="input-mode-pdbcode"
                        className="custom-control-input"
                        name="radio_input_mode"
                        val="pdb_code"
                        checked={this.state.inputModeRadio === "pdb_code"}
                        onChange={(e) => {
                          document.getElementsByName("pdb_code")[0].value = "";
                          this.setState({
                            pdbfile: null,
                            inputModeRadio: e.target.getAttribute("val"),
                            inputFileNamingScheme: "GROMOS",
                          });
                        }}
                      />
                      <span className="custom-control-indicator"></span>
                      <span className="custom-control-description">
                        Protein Code
                      </span>
                    </label>
                    <label
                      className="custom-control custom-radio"
                      style={{ textAlign: "center", margin: "auto" }}
                    >
                      <input
                        type="radio"
                        id="input-mode-upload"
                        className="custom-control-input"
                        name="radio_input_mode"
                        val="upload"
                        checked={this.state.inputModeRadio === "upload"}
                        onChange={(e) => {
                          document.getElementsByName("file_uploaded")[0].value =
                            "";
                          this.setState({
                            pdbfile: null,
                            inputModeRadio: e.target.getAttribute("val"),
                          });
                        }}
                      />
                      <span className="custom-control-indicator"></span>
                      <span className="custom-control-description">
                        Upload File
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <div className="form-group" style={{ textAlign: "center" }}>
                  <h3
                    className="divider"
                    style={{ fontSize: "1rem", width: "80%", color: "#777" }}
                  >
                    Protein Code
                  </h3>
                  <input
                    className={
                      this.state.inputModeRadio === "pdb_code" &&
                      [null, ""].includes(this.state.pdbcode)
                        ? borderPrimary + " " + formControl
                        : formControl
                    }
                    type="text"
                    placeholder="Ex: 4LZT or P00698"
                    name="pdb_code"
                    onChange={(e) => {
                      this.setState({ pdbcode: null });
                      const pdbid = e.target.value;
                      this.retrieveFromPDB(pdbid);
                    }}
                    disabled={this.state.inputModeRadio !== "pdb_code"}
                  />

                  <div
                    className={
                      this.state.inputModeRadio === "pdb_code" &&
                      ![null, ""].includes(this.state.pdbcode_error)
                        ? "alert alert-warning"
                        : ""
                    }
                  >
                    {this.state.pdbcode_error}
                  </div>
                </div>
                <div className="form-group" style={{ textAlign: "center" }}>
                  <h3
                    className="divider"
                    style={{ fontSize: "1rem", width: "80%", color: "#777" }}
                  >
                    Input File
                  </h3>
                  <input
                    className={
                      this.state.inputModeRadio === "upload" &&
                      [null, ""].includes(this.state.pdbfile)
                        ? borderPrimary + " " + formControl
                        : formControl
                    }
                    type="file"
                    name="file_uploaded"
                    disabled={this.state.inputModeRadio !== "upload"}
                    onChange={(e) => {
                      var self = this;
                      var reader = new FileReader();
                      reader.onload = function () {
                        const content = reader.result;

                        console.log(content);

                        async function reportTitrableSites(content) {
                          const response_ntits = await getNumberOfTitrableSites(
                            content
                          );

                          if (!response_ntits.status) {
                            toast.warning(
                              `PypKa API Error: /getTitrableSitesNumber`,
                              {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                              }
                            );
                          } else if ("nchains" in response_ntits.data) {
                            let nchains = response_ntits.data.nchains;
                            let nsites = response_ntits.data.nsites;

                            self.setState({
                              pdbfile: content,
                              nchains: nchains,
                              nsites: nsites,
                            });
                          }
                        }
                        reportTitrableSites(content);
                      };
                      var input_file = e.target.files[0];
                      var sys_name = input_file.name.split(".")[0];
                      this.setState({
                        protein_name: sys_name,
                      });

                      reader.readAsBinaryString(input_file);
                    }}
                  />
                  <div style={{ marginBottom: "5px" }}></div>
                  <select
                    className={
                      this.state.inputModeRadio === "upload" &&
                      [null, ""].includes(this.state.inputFileNamingScheme)
                        ? borderPrimary + " " + formControl
                        : formControl
                    }
                    id="file_uploaded_force_field"
                    disabled={this.state.inputModeRadio !== "upload"}
                    defaultValue={""}
                    onBlur={(e) => {
                      console.log(e.target.value);
                      this.setState({
                        inputFileNamingScheme: e.target.value,
                      });
                    }}
                  >
                    <option value="" disabled>
                      Select the naming scheme
                    </option>
                    <option value="AMBER">AMBER</option>
                    <option value="CHARMM">CHARMM</option>
                    <option value="GROMOS">GROMOS</option>
                    <option value="GROMOS">PDB</option>
                  </select>
                </div>
              </div>

              <div
                className="col-12 col-lg-4"
                style={{ borderLeft: "0.5px solid rgba(47, 47, 47, 0.8)" }}
              >
                <div className="form-group">
                  <label>Help</label>
                  <p>
                    The input PDB file can be retrieved from the Protein Data
                    Bank, AlphaFold DB or it can be uploaded by the user.
                  </p>
                  <p>
                    To use a structure from the <b>Protein Data Bank</b> please
                    provide a valid 4-character PBD identification code.
                  </p>
                  <p>
                    To use a structure from the <b>AlphaFold DB</b> please
                    provide a valid UniProtKB accession number.
                  </p>
                  <p>
                    To use a uploaded structure please select a PDB file with
                    one of the following naming schemes: AMBER, GROMOS, CHARMM
                    or PDB.
                  </p>
                </div>
              </div>
            </div>

            <br />
            <br />
            <br />
            <div className="row gap-y">
              <div className="col-12 col-lg-4">
                <div className="form-group">
                  <h3
                    className="divider"
                    style={{ fontSize: "1rem", width: "80%", color: "#777" }}
                  >
                    Output
                  </h3>
                  <div className="custom-controls-stacked">
                    <label
                      className="custom-control custom-checkbox"
                      style={{ margin: "auto" }}
                    >
                      <input
                        className="custom-control-input"
                        type="checkbox"
                        checked={this.state.outputpKValues}
                        onChange={(e) => {
                          console.log(
                            this.state.outputpKValues + this.state.outputPDBFile
                          );
                          this.setState({
                            outputpKValues: e.target.checked,
                          });
                        }}
                      />
                      <span className="custom-control-indicator"></span>
                      <span
                        className="custom-control-description"
                        style={{ width: "100px" }}
                      >
                        pK<sub>a</sub> values
                      </span>
                    </label>
                    <label
                      className="custom-control custom-checkbox"
                      style={{ margin: "auto" }}
                    >
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        checked={this.state.outputPDBFile}
                        onChange={(e) => {
                          this.setState({
                            outputPDBFile: e.target.checked,
                          });
                        }}
                      />
                      <span className="custom-control-indicator"></span>
                      <span
                        className="custom-control-description"
                        style={{ width: "100px" }}
                      >
                        MD-ready PDB
                      </span>
                    </label>
                  </div>
                  <div
                    className={
                      this.state.outputpKValues + this.state.outputPDBFile === 0
                        ? "alert alert-warning"
                        : hidden
                    }
                  >
                    One of the two must be selected
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <div className="form-group" style={{ textAlign: "center" }}>
                  <h3
                    className="divider"
                    style={{ fontSize: "1rem", width: "80%", color: "#777" }}
                  >
                    Output PDB
                  </h3>

                  <select
                    className={
                      this.state.outputPDBFile === true &&
                      [null, ""].includes(this.state.outputFileNamingScheme)
                        ? borderPrimary + " " + formControl
                        : formControl
                    }
                    disabled={!this.state.outputPDBFile}
                    defaultValue={this.state.outputFileNamingScheme}
                    onBlur={(e) => {
                      this.setState({
                        outputFileNamingScheme: e.target.value,
                      });
                    }}
                  >
                    <option value="" disabled>
                      Select the desired naming scheme
                    </option>
                    <option value="amber">AMBER</option>
                    <option value="gromos_cph">GROMOS</option>
                  </select>
                  <br />

                  <div
                    className={
                      this.state.outputPDBFile === true &&
                      [null, ""].includes(this.state.outputFilepH)
                        ? borderPrimary + " " + formControl
                        : formControl
                    }
                    style={{
                      border: "2px solid transparent",
                      marginTop: "10px",
                    }}
                  >
                    <InputFloat
                      name={"pH value"}
                      extraStyle={"form-control"}
                      defaultValue={this.state.outputFilepH}
                      condition1={this.state.outputPDBFile === true}
                      condition2={[null, "", NaN].includes(
                        this.state.outputFilepH
                      )}
                      disableOn={this.state.outputPDBFile}
                      saveState={this.setoutputFilepH}
                    />
                  </div>
                </div>
              </div>

              <div
                className="col-12 col-lg-4"
                style={{ borderLeft: "0.5px solid rgba(47, 47, 47, 0.8)" }}
              >
                <div className="form-group">
                  <p>
                    The available outputs are the p<em>K</em>
                    <sub>a</sub> values of the titratable amino acids and a PDB
                    formatted file with the most likely protonation state at a
                    given pH value.
                  </p>
                  <p>
                    Please select the desired output file naming scheme and the
                    target pH value.
                  </p>
                </div>
              </div>
            </div>

            <br />
            <br />
            <br />
            <div className="row gap-y">
              <div
                className="col-8"
                style={{ padding: "0px", marginBottom: "-15px" }}
              >
                <h3
                  className="divider"
                  style={{ fontSize: "1rem", width: "80%", color: "#777" }}
                >
                  Parameters
                </h3>
              </div>
              <div className="col-4"></div>
              <div className="col-12 col-lg-8">
                <div className="form-group">
                  <div className="row">
                    <div
                      className="col-12 col-lg-12"
                      style={{ margin: "auto", textAlign: "center" }}
                    >
                      <label
                        className="custom-control custom-checkbox"
                        style={{ margin: "auto" }}
                      >
                        <input
                          className="custom-control-input"
                          type="checkbox"
                          checked={this.state.defaultParams}
                          onChange={(e) => {
                            this.setState({
                              defaultParams: e.target.checked,
                            });

                            console.log(
                              this.state.inputModeRadio === "pdb_code",
                              this.state.pdbcode,
                              e.target.checked,
                              !this.state.pdbcode_error
                            );
                            if (
                              this.state.inputModeRadio === "pdb_code" &&
                              this.state.pdbcode &&
                              e.target.checked &&
                              !this.state.pdbcode_error
                            ) {
                              this.checkPKPDB(this);
                            }
                          }}
                        />
                        <span className="custom-control-indicator"></span>
                        <span
                          className="custom-control-description"
                          style={{ width: "150px" }}
                        >
                          use default parameters
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-lg-4"
                style={{
                  borderLeft: "0.5px solid rgba(47, 47, 47, 0.8)",
                  marginBottom: "15px",
                }}
              >
                <div className="form-group">
                  <p>
                    We recommend using default parameters. By using them you'll
                    be allowed to query the pKPDB database and retrieve your
                    results instantaneously.
                  </p>
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <div className="form-group">
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label>pH Titration Range</label>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className={inputGroup}>
                        <InputFloat
                          name={"pH min"}
                          extraStyle={"form-control"}
                          defaultValue={this.state.pHmin}
                          condition1={true}
                          condition2={[null, "", NaN].includes(
                            this.state.pHmin
                          )}
                          disableOn={
                            this.state.outputpKValues &&
                            !this.state.defaultParams
                          }
                          saveState={this.setpHmin}
                        />
                      </div>

                      <div className={inputGroup}>
                        <InputFloat
                          name={"pH max"}
                          extraStyle={"form-control"}
                          defaultValue={this.state.pHmax}
                          condition1={true}
                          condition2={[null, "", NaN].includes(
                            this.state.pHmax
                          )}
                          disableOn={
                            this.state.outputpKValues &&
                            !this.state.defaultParams
                          }
                          saveState={this.setpHmax}
                        />
                      </div>

                      <div className={inputGroup}>
                        <InputFloat
                          name={"pH step"}
                          extraStyle={"form-control"}
                          defaultValue={this.state.pHstep}
                          condition1={true}
                          condition2={[null, "", NaN].includes(
                            this.state.pHstep
                          )}
                          disableOn={
                            this.state.outputpKValues &&
                            !this.state.defaultParams
                          }
                          saveState={this.setpHstep}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <label>Dielectric Constants</label>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className={inputGroup}>
                      <InputFloat
                        name={"Protein"}
                        extraStyle={"form-control"}
                        defaultValue={this.state.proteinDielectric}
                        condition1={true}
                        condition2={[null, "", NaN].includes(
                          this.state.proteinDielectric
                        )}
                        disableOn={!this.state.defaultParams}
                        saveState={this.setproteinDielectric}
                      />
                    </div>

                    <div className={inputGroup} style={{ marginTop: "5px" }}>
                      <InputFloat
                        name={"Solvent"}
                        extraStyle={"form-control"}
                        defaultValue={this.state.solventDielectric}
                        condition1={true}
                        condition2={[null, "", NaN].includes(
                          this.state.solventDielectric
                        )}
                        disableOn={!this.state.defaultParams}
                        saveState={this.setsolventDielectric}
                      />
                    </div>
                  </div>
                </div>
                <div className="row" style={{ marginTop: "15px" }}>
                  <div className="col-12 col-lg-6">
                    <label>Ionic Strength</label>
                  </div>
                  <div className="col-12 col-lg-6">
                    <InputFloatSimple
                      width={"100%"}
                      extraStyle={"form-control"}
                      defaultValue={this.state.ionicStrength}
                      condition1={true}
                      condition2={[null, "", NaN].includes(
                        this.state.ionicStrength
                      )}
                      disableOn={!this.state.defaultParams}
                      saveState={this.setionicStrength}
                    />
                  </div>
                </div>
              </div>

              <div
                className="col-6 col-lg-4"
                style={{ borderLeft: "0.5px solid rgba(47, 47, 47, 0.8)" }}
              >
                <div className="form-group">
                  <p>
                    Please set pH min and pH max so that the p<i>K</i>
                    <sub>a</sub> of all titratable amino acids is withing the
                    titration range. pH step determines the difference between
                    consecutive pH values in the simulated titration.
                  </p>
                  <p>
                    The default value for the protein dielectric has been found
                    to minimize the error of the prediction. The default value
                    for the solvent dielectric is the experimental value of
                    water at around 273K.
                  </p>
                </div>
              </div>
            </div>

            <br />
            <br />
            <br />
            <div className="row gap-y" style={{ display: "none" }}>
              <div
                className="col-8"
                style={{ padding: "0px", marginBottom: "-15px" }}
              >
                <h3
                  className="divider"
                  style={{ fontSize: "1rem", width: "80%", color: "#777" }}
                >
                  Email Notification (optional)
                </h3>
              </div>
              <div className="col-4"></div>

              <div className="col-12 col-lg-8">
                <div className="form-group">
                  <div className="row">
                    <div
                      className="col-12 col-lg-6"
                      style={{ textAlign: "right" }}
                    >
                      <label>Email</label>
                    </div>

                    <div className="col-12 col-lg-6">
                      <input
                        type="text"
                        value={this.state.email}
                        onChange={(e) => {
                          const email = e.target.value;
                          this.setemail(email);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-6 col-lg-4"
                style={{ borderLeft: "0.5px solid rgba(47, 47, 47, 0.8)" }}
              >
                <div className="form-group">
                  <p>
                    Insert email to receive notification of the end of the run.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="section section-inverse py-40"
          style={{ backgroundColor: "#8ea6e6" }}
        >
          <div className="container">
            <div
              className="row gap-y align-items-center text-center text-md-left"
              style={{ alignItems: "flex-end!important" }}
            >
              <div className="col-12 col-md-9">
                <h4 className="fw-300 mb-0">
                  {this.state.nsites} Titratable Sites over {this.state.nchains}{" "}
                  Chains
                </h4>

                <h4
                  className="fw-300 mb-0"
                  style={{
                    display:
                      this.state.onPKPDB &&
                      this.state.defaultParams &&
                      !this.state.outputPDBFile
                        ? "none"
                        : "block",
                  }}
                >
                  Estimated Running Time:{" "}
                  {this.getTimeEstimate(
                    this.state.nsites,
                    this.state.pHmax,
                    this.state.pHmin,
                    this.state.pHstep
                  )}
                  s
                </h4>
                <h4
                  className="fw-300 mb-0"
                  style={{
                    display:
                      this.state.onPKPDB &&
                      this.state.defaultParams &&
                      !this.state.outputPDBFile
                        ? "block"
                        : "none",
                  }}
                >
                  Results will be retrieved from the PKPDB database
                </h4>

                <h4
                  className=" fw-300 mb-0"
                  style={{ display: this.state.onPKPDB ? "none" : "block" }}
                >
                  Queued Submissions: {this.state.queue_size}
                </h4>
              </div>

              <div className="col-12 col-md-3 text-center text-md-right">
                <a
                  className="btn btn-lg btn-round btn-white"
                  onClick={this.submitForm}
                  style={{ color: "#b5b9bf" }}
                >
                  {" "}
                  Submit
                </a>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

const default_values = {
  inputModeRadio: "pdb_code",
  pdbcode: null,
  pdbcode_error: null,
  inputFile: null,
  inputFileNamingScheme: "GROMOS",

  outputPDBFile: true,
  outputFileNamingScheme: "amber",
  outputFilepH: 7,
  outputpKValues: true,

  defaultParams: true,
  onPKPDB: null,

  pHmin: 0,
  pHmax: 12,
  pHstep: 0.25,

  solventDielectric: 80,
  proteinDielectric: 15,

  ionicStrength: 0.1,

  numberOfTitratableSites: 0,
  pdbfile: "",

  nsites: 0,
  nchains: 0,

  time_estimate: 0,

  email: "",
  queue_size: 0,
  submitted: null,
};

export default RunPage;
