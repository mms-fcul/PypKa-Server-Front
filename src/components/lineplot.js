import React from "react";
import Plot from "react-plotly.js";

export default class LinePlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          type: "scatter",
          x: props.x,
          y: props.y,
          mode: "lines+markers",
          marker: { color: "lightgrey" },
          line: { shape: "spline" },
        },
      ],
      layout: {
        title: "Titration Curve",
        autosize: true,
        xaxis: {
          title: "pH",
          showgrid: false,
          zeroline: true,
        },
        yaxis: {
          title: "Protonation",
          showline: false,
        },
      },
    };
  }

  render() {
    console.log(this.state);
    return (
      <Plot
        useResizeHandler
        data={this.state.data}
        layout={this.state.layout}
        style={{ width: "100%", height: "100%" }}
        config={{ displayModeBar: false, responsive: true }}
      />
    );
  }
}
