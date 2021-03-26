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
    localStorage.setItem(subID, JSON.stringify(results));
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
    localStorage.setItem(subID, JSON.stringify(toSave));
  };
}

export default GlobalState;
