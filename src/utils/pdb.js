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

export async function downloadAlphaFold(pdbid) {
  try {
    const url = `https://alphafold.ebi.ac.uk/files/AF-${pdbid}-F1-model_v2.pdb`;
    const response = await axios.get(url);
    return response.data;
  } catch {
    return "ERROR on downloading AlphaFold PDB";
  }
}

export async function isPdbIdValid(pdbid) {
  const url = `https://data.rcsb.org/rest/v1/holdings/status/${pdbid}`;
  const response = await axios
    .get(url, {}, config)
    .then(() => {
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

export async function isUniprotIdValid(uniprotid) {
  const url = `https://www.ebi.ac.uk/proteins/api/proteins/${uniprotid}`;
  console.warn(url);
  const response = await axios
    .get(url, {}, config)
    .then(() => {
      return null;
    })
    .catch((error) => {
      return "ERROR on GET ebi.ac.uk";
    });
  return response;
}
