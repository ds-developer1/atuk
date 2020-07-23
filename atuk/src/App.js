// Atuk.
// Copyright (C) 2020 Alan Quimbita, Esteban Molina, Shakira Cofre.
//
// App.js is part of Atuk.
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

import React, { useState, useEffect } from "react";
import "./App.css";
import "./App.sass";
//import logo from "./img/logoAtuk.svg";
//import github_logo from "./img/github-icon.svg";

import Hero from "./components/layout/Hero";
import WorkArea from "./components/WorkArea";
import SignInSide from "./components/authentication/SignInSide";

//#region asideMenuOptions
// Option for Aside Menu in the main App
let asideMenuOptions = {
  "1": "Matriz Inicial",
  "2": "Índice de pareto",
  "3": "Matriz reducida",
  "4": "Evaluación motricidad y dependencia",
  "5": "Priorización de variables",
  "6": "Clasificación por motricidad y dependencia",
  "7": "Elevación a la potencia",
};
//#endregion

//#region Aside Menu Component
// Aside Menu compotent
const AsideMenu = (props) => {
  return (
    <aside className="menu">
      <p className="menu-label is-white">Entrada</p>
      <ul className="menu-list">
        <li>
          <a
            href="/#"
            name="1/"
            onClick={props.handleClick}
            className={props.workAreaOption === "1" ? "is-active" : ""}
          >
            Matriz inicial
          </a>
          <ul>
            <li>
              <a
                href="/#"
                name="2/"
                onClick={props.handleClick}
                className={props.workAreaOption === "2" ? "is-active" : ""}
              >
                Índice de Pareto
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <p className="menu-label">Procesamiento</p>
      <ul className="menu-list">
        <li>
          <a
            href="/#"
            name="3/"
            onClick={props.handleClick}
            className={props.workAreaOption === "3" ? "is-active" : ""}
          >
            Matriz Reducida
          </a>
        </li>
        <li>
          <a
            href="/#"
            name="4/"
            onClick={props.handleClick}
            className={props.workAreaOption === "4" ? "is-active" : ""}
          >
            Evaluación motricidad y dependencia
          </a>
        </li>
        <li>
          <a
            href="/#"
            name="5/"
            onClick={props.handleClick}
            className={props.workAreaOption === "5" ? "is-active" : ""}
          >
            Priorización de variables
          </a>
        </li>
      </ul>
      <p className="menu-label">Salida</p>
      <ul className="menu-list">
        <li>
          <a
            href="/#"
            name="6/"
            onClick={props.handleClick}
            className={props.workAreaOption === "6" ? "is-active" : ""}
          >
            Clasificación por motricidad y dependencia
          </a>
        </li>
        <li>
          <a
            href="/#"
            name="7/"
            onClick={props.handleClick}
            className={props.workAreaOption === "7" ? "is-active" : ""}
          >
            Elevación a la potencia
          </a>
        </li>
      </ul>
      <p className="menu-label">Ayuda</p>
      <ul className="menu-list">
        <li>
          <a
            href="https://atuk-blog.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
        </li>
      </ul>
    </aside>
  );
};
//#endregion

function App() {
  // Sign In variables
  let [authentication, setAuthentication] = useState(false);
  // Menu & flow state variables
  let [workAreaOption, setWorkAreaOption] = useState("1");
  let [workAreaTitle, setWorkAreaTitle] = useState("Matriz Inicial");
  let [pareto, setPareto] = useState("80");
  let [dataGraph, setDataGraph] = useState([]);

  // Data for SWOT workflow
  let [swotData, setSwotData] = useState([
    [
      { value: "Variable" },
      { value: "Valor" },
      { value: "Elemento estratégico" },
      { value: "Misión" },
      { value: "Visión" },
    ],
    [
      { value: "Personal capacitado" },
      { value: "1" },
      { value: "1" },
      { value: "1" },
      { value: "1" },
    ],
    [
      { value: "Variables 2" },
      { value: "2" },
      { value: "2" },
      { value: "2" },
      { value: "2" },
    ],
    [
      { value: "Variables 3" },
      { value: "3" },
      { value: "3" },
      { value: "3" },
      { value: "3" },
    ],
    [
      { value: "Variables 4" },
      { value: "4" },
      { value: "4" },
      { value: "4" },
      { value: "4" },
    ],
    [
      { value: "Variables 5" },
      { value: "5" },
      { value: "5" },
      { value: "5" },
      { value: "5" },
    ],
    [
      { value: "Variables 6" },
      { value: "6" },
      { value: "6" },
      { value: "6" },
      { value: "6" },
    ],
    [
      { value: "Variables 7" },
      { value: "7" },
      { value: "7" },
      { value: "7" },
      { value: "7" },
    ],
    [
      { value: "Variables 8" },
      { value: "8" },
      { value: "8" },
      { value: "8" },
      { value: "8" },
    ],
    [
      { value: "Variables 9" },
      { value: "9" },
      { value: "9" },
      { value: "9" },
      { value: "9" },
    ],
    [
      { value: "Variables 10" },
      { value: "10" },
      { value: "10" },
      { value: "10" },
      { value: "10" },
    ],
  ]);

  // Functions to use in the SWOT workflow
  // Function to add row "Total" with calculation in SWOT data
  const calculateTotals = function (items) {
    // Add column fot Total
    items[0].push({ value: "Total" });
    // Get the length of the data array
    let length = items.length;
    for (let i = 1; i < length; i++) {
      let sum = 0;
      //Number of passes
      for (let j = 2; j < items[i].length; j++) {
        // Accumulate values given
        sum += Number(items[i][j].value);
      }
      // Add total sum at the end of the row
      items[i][items[i].length] = {
        value: sum.toString(),
      };
    }
  };

  // Function to sort the data SWOT in descending order
  const orderSwotData = function (items) {
    // Get the length of the data array
    let length = items.length;
    for (let i = 1; i < length; i++) {
      //Number of passes
      for (let j = 1; j < length - i; j++) {
        //Notice that j < (length - i)
        //Compare the adjacent positions
        let lastIndex = items[j].length - 1;
        if (
          Number(items[j][lastIndex].value) <
          Number(items[j + 1][lastIndex].value)
        ) {
          //Swap the numbers
          let tmp = items[j]; //Temporary variable to hold the current number
          items[j] = items[j + 1]; //Replace current number with adjacent number
          items[j + 1] = tmp; //Replace adjacent number with current number
        }
      }
    }
  };

  // Function to add row "Porcentaje" with calculation in SWOT data
  const calculatePercentages = function (items) {
    // Add column for 'Porcentaje'
    items[0].push({ value: "Porcentaje" });
    // Get the length of the data array
    let length = items.length;
    // Get last index of all rows
    let lastIndex = items[1].length - 1 || 0;
    // Variable for sumatory
    let sum = 0;
    for (let i = 1; i < length; i++) {
      sum += Number(items[i][lastIndex].value);
    }
    // Initialize variable percentage
    let percentage = 0;
    for (let i = 1; i < length; i++) {
      // Percentaje to zero
      percentage = 0;
      // Calculate value for percentage
      percentage = (Number(items[i][lastIndex].value) / sum) * 100;
      // Fix to decimals places
      percentage = percentage.toFixed(2);
      // Add percentage at the end of the row
      items[i].push({ value: percentage.toString() });
    }
  };

  // Function to add row "Porcentaje Acumulado" with calculation in SWOT data
  const calculateAccumulatedPercentages = function (items) {
    // Add column for 'Porcentaje Acumulado'
    items[0].push({ value: "Porcentaje Acumulado" });
    // Get the length of the data array
    let length = items.length;
    // Get last index of all rows
    let lastIndex = items[1].length - 1 || 0;
    // Set first accumulated percentage
    let p1 = items[1][lastIndex].value;
    items[1].push({ value: p1 });
    // Initialize variable percentage
    let percentage = 0;
    for (let i = 2; i < length; i++) {
      // Percentaje to zero
      percentage = 0;
      // Calculate accumulated percentage
      percentage =
        Number(items[i][items[i].length - 1].value) +
        Number(items[i - 1][items[i - 1].length - 1].value);
      // Fix to decimals places
      percentage = percentage.toFixed(2);
      // Add accumulated percentaje at the end of the row
      items[i].push({ value: percentage.toString() });
    }
  };

  // Function to apply Pareto Index in SWOT data
  const applyPareto = function (items) {
    // Get the length of the data array
    let length = items.length;
    // Variable to count rows to delete
    let count = 0;
    // Loop to count to delete rows based on Pareto Index
    for (let i = 1; i < length; i++) {
      if (Number(items[i][items[i].length - 1].value) > Number(pareto)) {
        count++;
      }
    }
    // Delete row according Pareto Index
    for (let i = 0; i < count; i++) {
      items.pop();
    }
  };

  // Function to generate de evaluation matrix from Reduced Matrix
  const generateEvaluationMatrix = function (items) {
    // Get the length of the data array
    let length = items.length;
    // Variable for de SWOT variables
    let variables = [];
    // Loop to separate the variables of SWOT Data
    for (let i = 1; i < length; i++) {
      variables.push(items[i][0]);
    }
    // Clean the SWOT Data (it's empty now)
    items.splice(0);
    // Variables for new Evaluation Matrix
    items.push([{ value: "" }, ...variables]);
    // Loop to generate the evaluation Matrix
    for (let i = 1; i < variables.length + 1; i++) {
      items.push([variables[i - 1]]);
      for (let j = 1; j <= variables.length; j++) {
        if (i === j) {
          items[i].push({ value: "------" });
        } else {
          items[i].push({ value: "0" });
        }
      }
    }
  };

  // Function to obtain the influency in the Evaluation Matrix
  const evaluateInfluency = function (items) {
    // Get the length of the data array
    let length = items.length;
    // Variable for the sumatory of motricity in each variable
    let sumMotricity = 0;
    // array of motricity
    let motricity = [];
    // Loop to evaluate motricity
    for (let i = 1; i < length; i++) {
      sumMotricity = 0;
      for (let j = 1; j < length; j++) {
        if (i !== j) {
          sumMotricity += Number(items[i][j].value);
        }
      }
      motricity.push(sumMotricity);
    }
    // Variable for the sumatory of dependency in each variable
    let sumDependency = 0;
    // array of dependency
    let dependency = [];
    // Loop to evaluate dependency
    for (let i = 1; i < length; i++) {
      sumDependency = 0;
      for (let j = 1; j < length; j++) {
        if (i !== j) {
          sumDependency += Number(items[j][i].value);
        }
      }
      dependency.push(sumDependency);
    }
    // Variable for de SWOT variables
    let variables = [];
    // Loop to separate the variables of SWOT Data
    for (let i = 1; i < length; i++) {
      variables.push(items[i][0]);
    }
    // Clean the SWOT Data (it's empty now)
    items.splice(0);
    // Variables for new Priorization Matrix
    items.push([
      { value: "Variable" },
      { value: "Dependencia" },
      { value: "Motricidad" },
    ]);
    // Loop to generate the Priorization Matrix
    for (let i = 1; i < variables.length + 1; i++) {
      items.push([
        variables[i - 1],
        { value: dependency[i - 1] },
        { value: motricity[i - 1] },
      ]);
    }
  };

  // Function to generate the data to be presented in a Bubble Chart
  const generateDataGraph = function (items, data) {
    // Variable for radius (in pixels) for bubbles
    let r = 25;
    // Loop to gather the data to graph from SWOT data
    for (let i = 1; i < items.length; i++) {
      data.push({
        x: Number(items[i][1].value),
        y: Number(items[i][2].value),
        r: r,
      });
    }
  };

  const performanceWorkflow = function (option) {
    // slice() creates a new array with the values of swotData
    let items = swotData.slice();
    // switch the new value of workAreaOption
    // Argument 'items' are send by reference
    switch (option) {
      case "1":
        break;
      case "2":
        calculateTotals(items);
        orderSwotData(items);
        calculatePercentages(items);
        calculateAccumulatedPercentages(items);
        break;
      case "3":
        applyPareto(items);
        break;
      case "4":
        generateEvaluationMatrix(items);
        break;
      case "5":
        evaluateInfluency(items);
        break;
      case "6":
        let data = dataGraph.slice();
        generateDataGraph(items, data);
        setDataGraph(data);
        break;
      case "7":
        break;
      default:
        break;
    }
    setSwotData(items);
  };

  // Buttons & Aside Menu hanlde funcions
  // Handle function for Aside Menu
  const handleAsideMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Gets the number of the name <a> element in Aside Menu Component
    let [option] = e.target.name.split("/");
    // Updates the option of the Work Area
    setWorkAreaOption(option);
  };

  // Handle function for Back Click Button in WorkArea
  const handleBackClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Transforms workAreaOption to Number
    let option = Number(workAreaOption);
    // Compares the current value of the option
    if (option > 1) {
      // Decrease the value of option
      option--;
      // Updates the option of the Work Area
      setWorkAreaOption(option.toString());
    }
  };

  // Handle function for Continue Click Button in WorkArea
  const handleContinueClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Transforms workAreaOption to Number
    var option = Number(workAreaOption);
    // Compares the current value of the option
    if (option < Object.keys(asideMenuOptions).length) {
      // Increase the value of option
      option++;
      // Updates the option of the Work Area
      setWorkAreaOption(option.toString());
      // Performance the correspodent operations over the SWOT Data Array
      performanceWorkflow(option.toString());
    }
  };

  // Handle function for Radio Button Option in Pareto
  const handleChange = (e) => {
    setPareto(e.target.value);
  };

  // Effect of workAreaOption -- Updates de title of the WorkArea
  useEffect(() => {
    // Updates the Work Area Title
    setWorkAreaTitle(asideMenuOptions[workAreaOption]);
  }, [workAreaOption]);

  useEffect(() => {
    // Sets the first Pareto Index => 80
    setPareto("80");
  }, []);

  //#region Render App component
  let renderedAppSection;
  if (!authentication) {
    renderedAppSection = (
      <div className="container" id="signIn">
        <SignInSide setAuthentication={setAuthentication}></SignInSide>
      </div>
    );
  } else {
    renderedAppSection = (
      <div className="container" id="mainArea">
        <Hero></Hero>
        <div className="tile is-ancestor mt-2 mx-3">
          <div className="tile is-parent">
            <article className="tile is-child notification is-info">
              <AsideMenu
                handleClick={handleAsideMenuClick}
                workAreaOption={workAreaOption}
              ></AsideMenu>
            </article>
          </div>
          <div className="tile is-9">
            <div className="tile is-parent">
              <div className="tile is-child notification">
                <WorkArea
                  workAreaOption={workAreaOption}
                  swotData={swotData}
                  setSwotData={setSwotData}
                  titleName={workAreaTitle}
                  handleBackClick={handleBackClick}
                  handleContinueClick={handleContinueClick}
                  handleChange={handleChange}
                  dataGraph={dataGraph}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  //#endregion

  return (
    <>
      <div className="container">{renderedAppSection}</div>
    </>
  );
}

export default App;
