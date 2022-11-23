import React from "react";
import { ProgressCircle } from "../components/progressBar";

const PKTable = (props) => {
  if (props.pKas) {
    var pKlist = props.pKas.map((sites) => (
      <tr key={sites[0] + sites[2] + sites[1]}>
        <th scope="row">{sites[0]}</th>
        <td>{sites[1]}</td>
        <td>{sites[2]}</td>
        <td>{sites[3]}</td>
      </tr>
    ));
    var waiting = "";
  } else {
    var pKlist = <tr></tr>;
    var waiting = <ProgressCircle />;
  }

  return (
    <div>
      <table className="table table-hover" style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>Chain</th>
            <th>Residue Name</th>
            <th>Residue Number</th>
            <th>
              p<em>K</em>
              <sub>a</sub>
            </th>
          </tr>
        </thead>
        <tbody>{pKlist}</tbody>
      </table>
      {waiting}
    </div>
  );
};

export default PKTable;
