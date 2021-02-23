import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import comp_cluster from "../images/comp_cluster.jpg"

import Layout from "../components/layout"
import HeaderBar from "../components/headerbar"
import ControlledExpansionPanels from "../components/accordion"

import styles from "./run-pypka.module.css"

import axios from "axios"

var config = { headers: {  
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'}
}



async function getSubmissions(setState) {
  try {
    const response = await axios.post('http://127.0.0.1:5000/getSubmissions', {}, config)
    const data = response.data
    setState(data)
    var submissions = data.length
    return data
  } catch (error){
  console.log(error)
  }
}

const Latest = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    console.log(state)
    if (state.length==0){
      getSubmissions(setState);
      
    }
    
  })


  return (
  <Layout>
    <HeaderBar image={comp_cluster} 
             title={"Latest Simulations"} 
             subtitle={""} />

    <section id="basic" className="section bb-1">
      <div className="container">
        <div className="row gap-y">
          <div className="col-md-8 offset-md-2">
              
              {state.map((value, index) => {
                return <ControlledExpansionPanels jobid={value} name="Protein Name" datetime="23/02/2021 15:35" />
              })}
            
          </div>
        </div>
      </div>
    </section>
  </Layout>
)}

export default Latest