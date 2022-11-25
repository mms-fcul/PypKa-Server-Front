import React from "react";
import { ProgressCircle } from "../components/progressBar";

const pK_mod = {
  ASP: 3.79,
  CTR: 2.9,
  CYS: 8.67,
  GLU: 4.2,
  HIS: 6.74,
  LYS: 10.46,
  NTR: 7.99,
  TYR: 9.59,
};

//

function paintShift(restype, pka) {
  if (pka == "-") {
    return "white";
  }
  const shift = Math.abs(pK_mod[restype.slice(0, 3)] - pka);
  if (shift < 1.5) {
    return "white";
  } else if (shift <= 2.5) {
    return "rgb(204, 85, 0, 0.25)";
  } else {
    return "rgb(204, 85, 0, 0.5)";
  }
}

const PKTable = (props) => {
  if (props.pKas) {
    var pKlist = props.pKas.map((sites) => (
      <tr
        key={sites[0] + sites[2] + sites[1]}
        style={{ background: paintShift(sites[1], sites[3]) }}
      >
        <th scope="row">{sites[0]}</th>
        <td>{sites[1]}</td>
        <td>{sites[2]}</td>
        <td>{sites[3] != "-" ? sites[3].toFixed(2) : sites[3]}</td>
        <td>
          {sites[3] != "-"
            ? (pK_mod[sites[1].slice(0, 3)] - sites[3]).toFixed(2)
            : "-"}
        </td>
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
            <th>
              Δp<em>K</em>
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
