class GlobalState {
  constructor(subID) {
    this.state = {
      subID: subID,
      pKas: [],
      tit_x: [],
      tit_y: [],
      params: "",
      pdb_out: null,
      failed: null,
    };

    const savedSubmission = JSON.parse(localStorage.getItem(subID));
    if (savedSubmission) {
      this.state = {
        ...this.state,
        ...savedSubmission,
      };
    }
  }

  saveSubmission = (subID, results) => {
    const savedSubmission = JSON.parse(localStorage.getItem(subID));
    if (savedSubmission) {
      results = {
        ...savedSubmission,
        ...results,
      };
    }
    const results_json = JSON.stringify(results);
    checkStorageSpace(results_json);
    localStorage.setItem(subID, results_json);
  };

  saveError = (subID) => {
    const savedSubmission = JSON.parse(localStorage.getItem(subID));
    let toSave = { failed: true };
    if (savedSubmission) {
      toSave = {
        ...savedSubmission,
        ...toSave,
      };
    }
    const toSave_json = JSON.stringify(toSave);
    checkStorageSpace(toSave_json);
    localStorage.setItem(subID, toSave_json);
  };
}

function checkStorageSpace(toAdd) {
  const localStorageSize = new Blob(Object.values(localStorage)).size;
  const newResultsSize = new Blob([toAdd]).size;

  console.log(localStorageSize, newResultsSize);
  if (localStorageSize + newResultsSize > 4500000) {
    localStorage.clear();
  }
}

export default GlobalState;
