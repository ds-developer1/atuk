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

import React, { useState, useEffect, useRef } from "react";
// Styles
import "./App.css";
import "./App.sass";
//import logo from "./img/logoAtuk.svg";
//import github_logo from "./img/github-icon.svg";

// Components for the process
import Hero from "./components/layout/Hero";
import WorkArea from "./components/WorkArea";
import SignInSide from "./components/authentication/SignInSide";

// Libraries for PDF Report
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";

let swotDataProcess7_1 = [[{ value: "swotData" }]];

//#region asideMenuOptions
/**
 * Option for Aside Menu in the main App
 * @property {Object} asideMenuOptions - Describes the options available for the Work Area Option
 */
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
/**
 * Aside Menu compotent
 * @module AsideMenu
 * @param {*} props - includes the handleClick event and workAreaOption
 */
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

/**
 * Main component of the program
 * @module App
 * @param {boolean} authentication - Indicates if the user is logged in
 * @param {string} workAreaOption - Controls the current step of the mathematical SWOT
 * @param {string} workAreaTitle - Controls the current step title of the mathematical SWOT
 * @param {string} pareto - Defines the value to use in order to apply Pareto
 * @param {Array.<string>} dataGraph - Contains the result of the mathematical SWOT to be represented in a graph
 * @param {Array.<string>} swotData - Contains the data used within the Mathematical SWOT
 * @param {JSX} renderedAppSection - Cotains the area rendered in App component
 * @param {function(items)} calculateTotals - Function to add row "Total" with calculation in SWOT data
 * @param {function(items)} orderSwotData - Function to sort the data SWOT in descending order
 * @param {function(items)} calculatePercentages - Function to add row "Porcentaje" with calculation in SWOT data
 * @param {function(items)} calculateAccumulatedPercentages - Function to add row "Porcentaje Acumulado" with calculation in SWOT data
 * @param {function(items)} applyPareto - Function to apply Pareto Index in SWOT data
 * @param {function(items)} generateEvaluationMatrix - Function to generate de evaluation matrix from Reduced Matrix
 * @param {function(items)} evaluateInfluency - Function to obtain the influency in the Evaluation Matrix
 * @param {function(items)} generateDataGraph - Function to generate the data to be presented in a Bubble Chart
 * @param {function(items)} performanceWorkflow - Function to control de workflow of the Mathematical Swot
 * @param {function(event)} handleAsideMenuClick - Handle function for Aside Menu
 * @param {function(event)} handleBackClick - Handle function for Back Click Button in WorkArea
 * @param {function(event)} handleContinueClick - Handle function for Continue Click Button in WorkArea
 * @param {function(event)} handleChange - Handle function for Radio Button Option in Pareto
 */
function App() {
  // Sign In variables
  let [authentication, setAuthentication] = useState(false);
  // Menu & flow state variables
  let [workAreaOption, setWorkAreaOption] = useState("1");
  let [workAreaTitle, setWorkAreaTitle] = useState("Matriz Inicial");
  let [pareto, setPareto] = useState("80");
  let [pow, setPow] = useState("2");
  let [dataGraph, setDataGraph] = useState([]);
  // Files uploaded
  let fileInput = useRef();

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
  ]);
  let [swotDataProcess1, setSwotDataProcess1] = useState(swotData);
  let [swotDataProcess2, setSwotDataProcess2] = useState([
    [{ value: "Índice de pareto" }],
  ]);
  let [swotDataProcess3, setSwotDataProcess3] = useState([
    [{ value: "Matriz reducida" }],
  ]);
  let [swotDataProcess4, setSwotDataProcess4] = useState([
    [{ value: "Evaluación motricidad y dependencia" }],
  ]);
  let [swotDataProcess5, setSwotDataProcess5] = useState([
    [{ value: "Priorización de variables" }],
  ]);
  let [swotDataProcess6, setSwotDataProcess6] = useState([
    [{ value: "Clasificación por motricidad y dependencia" }],
  ]);
  let [swotDataProcess7, setSwotDataProcess7] = useState([
    [{ value: "Elevación a la potencia" }],
  ]);

  // Functions to use in the SWOT workflow
  /**
   * Function to add row "Total" with calculation in SWOT data
   * @function
   * @param {Array.<Object>} items - Swot Data of {@link App}
   * @returns {Array.<Object>}
   */
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

  /**
   * Function to sort the data SWOT in descending order
   * @function
   * @param {Array.<Object>} items - Swot Data of {@link App}
   * @returns {Array.<Object>}
   */
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

  /**
   * Function to add row "Porcentaje" with calculation in SWOT data
   * @function
   * @param {Array.<Object>} items - Swot Data of {@link App}
   * @returns {Array.<Object>}
   */
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

  /**
   * Function to add row "Porcentaje Acumulado" with calculation in SWOT data
   * @function
   * @param {Array.<Object>} items - Swot Data of {@link App}
   * @returns {Array.<Object>}
   */
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

  /**
   * Function to apply Pareto Index in SWOT data
   * @function
   * @param {Array.<Object>} items - Swot Data of {@link App}
   * @returns {Array.<Object>}
   */
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

  /**
   * Function to generate de evaluation matrix from Reduced Matrix
   * @function
   * @param {Array.<Object>} items - Swot Data of {@link App}
   * @returns {Array.<Object>}
   */
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

  /**
   * Function to obtain the influency in the Evaluation Matrix
   * @function
   * @param {Array.<Object>} items - Swot Data of {@link App}
   * @returns {Array.<Object>}
   */
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
        { value: dependency[i - 1].toString() },
        { value: motricity[i - 1].toString() },
      ]);
    }
  };

  /**
   * Function to generate the data to be presented in a Bubble Chart
   * @function
   * @param {Array.<Object>} items - Swot Data of {@link App}
   * @returns {Array.<Object>}
   */
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

  /**
   * Function to generate the data to be presented after apply Pow
   * @function
   * @param {Array.<Object>} items - Swot Data of {@link App}
   * @returns {Array.<Object>}
   */
  const applyPow = function (items) {
    // Get the length of the data array
    let length = items.length;
    // Loop to generate the pow Matrix
    for (let i = 1; i < length; i++) {
      for (let j = 1; j < length; j++) {
        if (i !== j) {
          items[i][j].value = Math.pow(
            Number(items[i][j].value),
            Number(pow)
          ).toString();
        }
      }
    }
    return items;
  };

  /**
   * Function to control de workflow of the Mathematical Swot
   * @function
   * @param {string} option - The value of the current workSpaceOption
   */
  const performanceWorkflow = function (option) {
    // switch the new value of workAreaOption
    // Argument 'items' are send by reference
    // slice() creates a new array with the values of swotData
    let items = swotData.slice();
    switch (option) {
      case "1":
        setSwotData(items);
        break;
      case "2":
        let __data1 = [[{ value: "Process1" }]];
        __data1.pop();
        for (let i = 0; i < swotData.length; i++) {
          __data1.push([]);
          for (let j = 0; j < swotData[0].length; j++) {
            __data1[i].push({ value: swotData[i][j].value });
          }
        }
        setSwotDataProcess1(__data1);
        calculateTotals(items);
        orderSwotData(items);
        calculatePercentages(items);
        calculateAccumulatedPercentages(items);
        setSwotDataProcess2(items);
        setSwotData(items);
        break;
      case "3":
        applyPareto(items);
        setSwotDataProcess3(items);
        setSwotData(items);
        break;
      case "4":
        generateEvaluationMatrix(items);
        setSwotData(items);
        break;
      case "5":
        setSwotDataProcess4(swotData);
        setSwotDataProcess7(swotData);
        swotDataProcess7_1.pop();
        for (let i = 0; i < swotData.length; i++) {
          swotDataProcess7_1.push([]);
          for (let j = 0; j < swotData[0].length; j++) {
            var v = swotData[i][j].value;
            swotDataProcess7_1[i].push({ value: v });
          }
        }
        evaluateInfluency(items);
        setSwotDataProcess5(items);
        setSwotData(items);
        break;
      case "6":
        let data = dataGraph.slice();
        generateDataGraph(items, data);
        setDataGraph(data);
        setSwotDataProcess6(data);
        /**
         * Convert HTML rendered to SVG in canvas
         * */
        html2canvas(document.getElementById("report")).then(function (canvas) {
          // Convert SVG in canvas to PNG
          const imgData = canvas.toDataURL("image/png");
          // Convert PNG to PDF to download
          const pdf = new jsPDF({
            orientation: "landscape",
          });
          pdf.addImage(imgData, "PNG", 10, 10);
          pdf.save("Informe Proyecto ATUK.pdf");
        });
        setSwotData(items);
        break;
      case "7":
        let _data = [];
        _data.pop();
        for (let i = 0; i < swotDataProcess7_1.length; i++) {
          _data.push([]);
          for (let j = 0; j < swotDataProcess7_1[0].length; j++) {
            var _v = swotDataProcess7_1[i][j].value;
            _data[i].push({ value: _v });
          }
        }
        let _swotData = applyPow(_data);
        setSwotData(_swotData);
        setSwotDataProcess7(_swotData);
        break;
      default:
        break;
    }
  };

  // Buttons & Aside Menu handle functions
  /**
   * Handle function for Aside Menu
   * @function
   * @param {event} e - The click event data
   */
  const handleAsideMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Gets the number of the name <a> element in Aside Menu Component
    let [option] = e.target.name.split("/");
    // Updates the option of the Work Area
    setWorkAreaOption(option);
    switch (option) {
      case "1":
        setSwotData(swotDataProcess1);
        break;
      case "2":
        setSwotData(swotDataProcess2);
        break;
      case "3":
        setSwotData(swotDataProcess3);
        break;
      case "4":
        setSwotData(swotDataProcess4);
        break;
      case "5":
        setSwotData(swotDataProcess5);
        break;
      case "6":
        setSwotData(swotDataProcess6);
        break;
      case "7":
        setSwotData(swotDataProcess7);
        break;
    }
  };

  /**
   * Handle function for Back Click Button in WorkArea
   * @function
   * @param {event} e - The click event data
   */
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

  /**
   * Handle function for Continue Click Button in WorkArea
   * @function
   * @param {event} e - The click event data
   */
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
    } else {
      performanceWorkflow("7");
    }
  };

  /**
   * Handle function for Save Click Button in WorkArea
   * @function
   * @param {event} e - The click event data
   */
  const handleSaveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    var fileNamePrompt = prompt(
      "Ingrese el nombre del proyecto",
      "Proyecto Atuk 1"
    );
    var fileName;
    if (fileNamePrompt === null || fileNamePrompt === "") {
      fileName = "Proyecto_Atuk_FODA_Matematico.atuk";
    } else {
      fileName = fileNamePrompt + ".atuk";
    }
    var saveData = (function () {
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      return function (data, fileName) {
        var json = JSON.stringify(data),
          blob = new Blob([json], { type: "octet/stream" }),
          url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      };
    })();
    var data = {
      process1: swotDataProcess1,
      process2: swotDataProcess2,
      process3: swotDataProcess3,
      process4: swotDataProcess4,
      process5: swotDataProcess5,
      process6: swotDataProcess6,
      process7: swotDataProcess7,
    };

    saveData(data, fileName);
  };

  /**
   * Handle function for Radio Button Option in Pareto
   * @function
   * @param {event} e - The click event data
   */
  const handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPareto(e.target.value);
  };

  /**
   * Handle function for Radio Button Option in Pow
   * @function
   * @param {event} e - The click event data
   */
  const handleChangePow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPow(e.target.value);
  };

  // Effect of workAreaOption -- Updates de title of the WorkArea
  useEffect(() => {
    // Updates the Work Area Title
    setWorkAreaTitle(asideMenuOptions[workAreaOption]);
  }, [workAreaOption]);

  useEffect(() => {
    // Sets the first Pareto Index => 80
    setPareto("80");
    setPow("2");
  }, []);

  // File Input functions
  const handleFileSubmit = (event) => {
    event.preventDefault();
    let file = fileInput.current.files[0];
    if (file !== undefined) {
      if (file.type && file.type.indexOf("atuk") === -1) {
        alert("No ha seleccionao un proyecto de ATUK");
      } else {
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = (e) => {
          var project = JSON.parse(e.target.result);
          setSwotDataProcess1(project.process1);
          setSwotDataProcess2(project.process2);
          setSwotDataProcess3(project.process3);
          setSwotDataProcess4(project.process4);
          setSwotDataProcess5(project.process5);
          setSwotDataProcess6(project.process6);
          setSwotDataProcess7(project.process7);
          swotDataProcess7_1 = [];
          for (let i = 0; i < project.process4.length; i++) {
            swotDataProcess7_1.push([]);
            for (let j = 0; j < project.process4[0].length; j++) {
              var v = project.process4[i][j].value;
              swotDataProcess7_1[i].push({ value: v });
            }
          }
          switch (workAreaOption) {
            case "1":
              setSwotData(project.process1);
              break;
            case "2":
              setSwotData(project.process2);
              break;
            case "3":
              setSwotData(project.process3);
              break;
            case "4":
              setSwotData(project.process4);
              break;
            case "5":
              setSwotData(project.process5);
              break;
            case "6":
              setSwotData(project.process6);
              break;
            case "7":
              setSwotData(project.process7);
              break;
            default:
              break;
          }
        };
      }
    } else {
      alert("No ha seleccionado ningún archivo");
    }
  };

  //#region Render App component
  /**
   * @type {JSX}
   */
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
                  handleSaveClick={handleSaveClick}
                  handleChange={handleChange}
                  handleChangePow={handleChangePow}
                  handleFileSubmit={handleFileSubmit}
                  fileInput={fileInput}
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

  return <div className="container">{renderedAppSection}</div>;
}

export default App;
