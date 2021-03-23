import { navigate } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import HeaderBar from "../components/headerbar"
import SEO from "../components/seo"

import axios from "axios"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import comp_cluster from "../images/comp_cluster.jpg"
import paper from "../images/pkpdb_paper.png"
import library from "../images/library.jpg"


const pkpdb = () => ( 
  <Layout>
 
    <SEO title="pKPDB | A Protein Data Bank extension database of pka and pI theoretical values" />
    <HeaderBar image={comp_cluster} title={"pKPDB"} subtitle={"a Protein Data Bank extension database of pK<sub>a</sub> and pI theoretical values"} />

    <section class="section pb-0  bg-gray">
        <div class="container">
          <div class="row">

            <div class="col-md-6 align-self-center pb-7">

              <p>
              p<italic style={{ fontStyle: "italic"}}>K</italic><sub>a</sub> values of ionizable residues and isoelectric points of proteins provide valuable local and global insights about their structure and function. 
              These properties can be estimated with reasonably good accuracy using Poisson-Boltzmann and Monte Carlo calculations at a considerable computational cost (from some minutes to several hours). 
              pKPDB is a database of theoretical p<italic style={{ fontStyle: "italic"}}>K</italic><sub>a</sub> values and pIs calculated over protein structures deposited in the Protein Data Bank.
              </p>
              <div class="row mt-7">
                <div class="col-6">
                  <br /><br />
                  <h5>10M p<italic style={{ fontStyle: "italic"}}>K</italic><sub>a</sub> values</h5>                  
                  <p>Calculated by using PypKa with default parameters (Ɛ = 15) on ~70% of the Protein Data Bank</p>
                </div>

                <div class="col-6">
                  <br /><br />
                  <h5>120k Isoelectric Points</h5>
                  <p>Determined from the theoretical titration curve accounting for the individual pka values of all titrable residues of each protein</p>                  
                </div>
              </div>
            </div>

            <div class="col-md-6 text-center order-md-first">
              <img class="mr-40" src={ paper } style={{ borderRadius: "15px" }}/>
            </div>


          </div>
        </div>
      </section>


      <section className="section py-150" style={{backgroundImage: `url(${library})`, backgroundSize: "cover"}} data-overlay="7" id="why">
      <div className="container">

        <div className="section-dialog text-center">
          <h2>Citation</h2>
          <p>
            Was pKPDB helpful in your research? Please cite:<br />
            <code>Reis <span>et al. J Chem Inf Model.</span> 2020</code><br />
            <a href="https://pubs.acs.org/doi/10.1021/acs.jcim.0c00718"><code>DOI: 10.1021/acs.jcim.0c00718</code></a>
            
          </p>

          </div>
      </div>
    </section>


      <section class="section bg-gray">
        <div class="container">
          <div class="row gap-y">

            <div class="col-lg-4">
              <div class="card card-body border text-center">
                <p class="my-5"><i class="icon-global lead-8 text-lighter"></i></p>
                <h5>Isoelectric Points</h5>
                <p>120k proteins <br /> (csv file with ~1MB)</p>
                <p><a class="small-3 fw-600" href="https://api.pypka.org/isoelectric.csv.gz">Download <i class="fa fa-angle-right small-5 pl-1"></i></a></p>
              </div>
            </div>


            <div class="col-lg-4">
              <div class="card card-body border text-center">
                <p class="my-5"><i class="icon-scope lead-8 text-lighter"></i></p>
                <h5>p<italic style={{ fontStyle: "italic"}}>K</italic><sub>a</sub> values</h5>
                <p>10M residues <br /> (csv file with ~61MB)</p>
                <p><a class="small-3 fw-600" href="https://api.pypka.org/pkas.csv.gz">Download <i class="fa fa-angle-right small-5 pl-1"></i></a></p>
              </div>
            </div>


            <div class="col-lg-4">
              <div class="card card-body border text-center">
                <p class="my-5"><i class="icon-layers lead-8 text-lighter"></i></p>
                <h5>Similarity Clusters</h5>
                <p>Sequence identity > 0.9 <br /> (csv file with ~48MB)</p>
                <p><a class="small-3 fw-600" href="https://api.pypka.org/similarity090.csv.gz">Download <i class="fa fa-angle-right small-5 pl-1"></i></a></p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section class="section text-white py-50" style={{ backgroundImage: "linear-gradient(120deg, #a8c0ff 0%, #3f2b96 100%)" }}>
        <div class="container">
          <header class="section-header">
            <small><strong>PypKa</strong></small>
            <h2 class="display-3 fw-400">Download vs <span class="mark-underline">Query</span></h2>
            <hr />
            <p class="lead-2">Are you interested in querying individual proteins by PDB ID instead of downloading the full database?</p>
          </header>

          <p class="text-center">
            <a class="btn btn-xl btn-round btn-light w-250" href="/run-pypka">Use the Pypka Server</a><br />            
          </p>
        </div>
      </section>

  </Layout>
);

export default pkpdb;