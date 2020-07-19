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

import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import "./App.sass";
//import logo from "./img/logoAtuk.svg";
//import github_logo from "./img/github-icon.svg";

import Hero from "./components/layout/Hero";
import WorkArea from "./components/WorkArea";

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

// Aside Menu compotent
const AsideMenu = (props) => {
  return (
    <aside className="menu">
      <p className="menu-label is-white">Entrada</p>
      <ul className="menu-list">
        <li>
          <a
            href="#"
            name="1/"
            onClick={props.handleClick}
            className={props.workAreaOption === "1" ? "is-active" : ""}
          >
            Matriz inicial
          </a>
          <ul>
            <li>
              <a
                href="#"
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
            href="#"
            name="3/"
            onClick={props.handleClick}
            className={props.workAreaOption === "3" ? "is-active" : ""}
          >
            Matriz Reducida
          </a>
        </li>
        <li>
          <a
            href="#"
            name="4/"
            onClick={props.handleClick}
            className={props.workAreaOption === "4" ? "is-active" : ""}
          >
            Evaluación motricidad y dependencia
          </a>
        </li>
        <li>
          <a
            href="#"
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
            href="#"
            name="6/"
            onClick={props.handleClick}
            className={props.workAreaOption === "6" ? "is-active" : ""}
          >
            Clasificación por motricidad y dependencia
          </a>
        </li>
        <li>
          <a
            href="#"
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
          <a href="https://atuk-blog.netlify.app/" target="_blank">
            Blog
          </a>
        </li>
      </ul>
    </aside>
  );
};

function App() {
  // Menu & flow state variables
  let [workAreaOption, setWorkAreaOption] = useState("1");
  let [workAreaTitle, setWorkAreaTitle] = useState("Matriz Inicial");

  // Data for SWOT workflow
  let [swotData, setSwotData] = useState([
    [
      { value: "Variable" },
      { value: "Valor" },
      { value: "Misión" },
      { value: "Visión" },
    ],
    [{ value: "Personal capacitado" }],
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
      for (let j = 1; j < items[i].length; j++) {
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

  const performanceWorkflow = function (option) {
    // switch the new value of workAreaOption
    switch (option) {
      case "1":
        break;
      case "2":
        // Calculates totals of each variable
        let items = swotData.slice();
        // Argument 'items' are send by reference
        calculateTotals(items);
        orderSwotData(items);
        calculatePercentages(items);
        calculateAccumulatedPercentages(items);
        setSwotData(items);
        break;
      case "3":
        break;
      case "4":
        break;
      case "5":
        break;
      case "6":
        break;
      case "7":
        break;
    }
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

  // Effect of workAreaOption -- Updates de title of the WorkArea
  useEffect(() => {
    // Updates the Work Area Title
    setWorkAreaTitle(asideMenuOptions[workAreaOption]);
  }, [workAreaOption]);

  return (
    <React.Fragment>
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
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
