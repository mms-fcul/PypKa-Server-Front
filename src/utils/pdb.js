import axios from "axios";

var config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Token: Math.random(),
  },
};

export async function downloadPDB(pdbid) {
  try {
    const url = `https://files.rcsb.org/view/${pdbid}.pdb`;
    const response = await axios.get(url);
    return response.data;
  } catch {
    return "ERROR on downloading PDB";
  }
}

export async function isPdbIdValid(pdbid) {
  const url = `https://data.rcsb.org/rest/v1/holdings/status/${pdbid}`;
  const response = await axios
    .get(url, {}, config)
    .then(() => {
      console.log(response);
      return null;
    })
    .catch((error) => {
      const expected_error = `No data found for entry id: ${pdbid}`;
      if (error.response && error.response.data.message === expected_error) {
        return "PDBID not found";
      } else {
        return "ERROR on GET data.rcsb.org";
      }
    });
  return response;
}
