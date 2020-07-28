// Atuk.
// Copyright (C) 2020 Alan Quimbita, Esteban Molina, Shakira Cofre.
//
// Input.js is part of Atuk.
//
// Atuk is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import React from "react";
import { Bubble } from "react-chartjs-2";
/**
 * The Graph Component is used to shos the graphicla result of the Mathematical SWOT
 * @module Graph
 * @param {*} props - includes dataGraph from App component
 * @param {Array.<Object>} props.dataGraph - The values to graphic after being sanitized
 * @param {Object} data - Contains the parameters to generate the Bubble Data
 * @param {Array.<string>} data.labels - Contains the labels to be presented in the chart
 * @param {Array.<Object>} data.datasets - Establishes the visual parameters of the chart
 * @param {Array.<Object>} data.datasets[0].label - The label of the current Dataset
 * @param {Array.<Object>} data.datasets[0].fill - Property to color inside the bubble chart
 * @param {Array.<Object>} data.datasets[0].lineTension - Grossor of lines
 * @param {Array.<Object>} data.datasets[0].backgroundColor - Color of the chart's background
 * @param {Array.<Object>} data.datasets[0].borderColor - Color of the chart's borders
 * @param {Array.<Object>} data.datasets[0].data - Data to be used in the bubble chart
 */
const Graph = (props) => {
  let data = {
    labels: ["Variables del FODA Matemático"],
    datasets: [
      {
        label: "Variables del FODA Matemático",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.dataGraph,
      },
    ],
  };
  return <Bubble data={data} />;
};

export default Graph;
