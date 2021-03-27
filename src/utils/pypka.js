import axios from "axios";
import { io } from "socket.io-client";

let pypka_api = "https://api.pypka.org";
//let pypka_api = "http://127.0.0.1:5000";

let pypka_streamer = "https://socket.pypka.org";
//let pypka_streamer = "http://127.0.0.1:8888";

var config = {
  headers: {
    "Content-Type": "application/json", //
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    Token: Math.random(),
  },
};

export async function check_queue_size() {
  const response = await axios.get(`${pypka_api}/queue-size`, {}, config);
  return response;
}

export async function getSubID(pdbid) {
  const response = await axios.post(`${pypka_api}/getSubID`, {}, config);
  console.log("SUBID", response);
  return response.data.subID;
}

export async function submit_pypka_calculation(send_state) {
  console.log("SUBMITTING JOB:", send_state);
  try {
    const response = await axios.post(
      `${pypka_api}/submitSim`,
      send_state,
      config
    );
    const data = response.data;
    console.log(data);
    return { status: true, returned: { ...data } };
  } catch (error) {
    console.log(error);
    return { status: false, msg: error };
  }
}

export async function getNumberOfTitrableSites(pdbfile) {
  try {
    const response = await axios.post(
      `${pypka_api}/getTitrableSitesNumber`,
      { PDB: pdbfile },
      config
    );
    console.log("NSITES:", response);
    return { status: true, data: response.data };
  } catch (error) {
    console.log("nsites error", error);
    return { status: false };
  }
}

export async function queryPKPDB(idcode) {
  try {
    const response = await axios.get(
      `${pypka_api}/query/${idcode}`,
      {},
      config
    );
    console.log(response);
    return { status: true, data: response.data };
  } catch (error) {
    console.log("pkpdb", error);
    return { status: false };
  }
}

export async function existsOnPKPDB(idcode) {
  try {
    const response = await axios.post(
      `${pypka_api}/pkpdb/${idcode}`,
      {},
      config
    );
    console.log(response);
    return { status: true, data: response.data };
  } catch (error) {
    console.log("pkpdb", error);
    return { status: false };
  }
}

export function start_socket() {
  const socket = io(`${pypka_streamer}`, { transports: ["websocket"] });
  console.log("SOCKET:", socket);
  return socket;
}

export async function getSubmissions(setState) {
  try {
    const response = await axios.post(
      `${pypka_api}/getSubmissions`,
      {},
      config
    );
    console.log(response);
    return { status: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
}
