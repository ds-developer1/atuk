// Copyright (C) 2020 Alan Quimbita, Esteban Molina, Shakira Cofre.
//
// WorkArea.js is part of Atuk.
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
import Input from "./input/InputTable";
import Pareto from "./input/Pareto";
import ReducedMatrix from "./process/ReducedMatrix";
import Evaluation from "./process/Evaluation";
import Priorization from "./process/Priorization";
import Graph from "./results/Graph";
import Pow from "./results/Pow";
/**
 * This component renders the work area current option
 * @module RenderArea
 * @param {*} props - includes swotData, setSwotData, handleChange (for Paretto), handleContinueClick (for Mathematical Swot workflow) titleName (of the Work Area), workAreaOption (the current step of the Mathematical Swot)
 * @param {boolean} props.authentication - Indicates if the user si logged in
 * @param {string} props.workAreaOption - Controls the current step of the mathematical SWOT
 * @param {string} props.workAreaTitle - Controls the current step title of the mathematical SWOT
 * @param {string} props.pareto - Defines the value to use in order to apply Pareto
 * @param {Array.<string>} props.dataGraph - Contains the result of the mathematical SWOT to be represented in a graph
 * @param {Array.<string>} props.swotData - Contains the data used within the Mathematical SWOT
 * @param {function(event)} props.handleAsideMenuClick - Handle function for Aside Menu
 * @param {function(event)} props.handleBackClick - Handle function for Back Click Button in WorkArea
 * @param {function(event)} props.handleContinueClick - Handle function for Continue Click Button in WorkArea
 * @param {function(event)} props.handleChange - Handle function for Radio Button Option in Pareto
 */
const RenderArea = (props) => {
  switch (props.workAreaOption) {
    case "1":
      return (
        <Input swotData={props.swotData} setSwotData={props.setSwotData} />
      );
    case "2":
      return (
        <Pareto
          handleChange={props.handleChange}
          swotData={props.swotData}
          setSwotData={props.setSwotData}
        />
      );
    case "3":
      return (
        <ReducedMatrix
          swotData={props.swotData}
          setSwotData={props.setSwotData}
        />
      );
    case "4":
      return (
        <Evaluation swotData={props.swotData} setSwotData={props.setSwotData} />
      );
    case "5":
      return (
        <Priorization
          swotData={props.swotData}
          setSwotData={props.setSwotData}
        />
      );
    case "6":
      return <Graph dataGraph={props.dataGraph} />;
    case "7":
    default:
      return (
        <Pow
          handleChangePow={props.handleChangePow}
          swotData={props.swotData}
          setSwotData={props.setSwotData}
        />
      );
  }
};

/**
 * This component lets manage the work area current option
 * @module WorkArea
 * @param {*} props - sends data to {@link RenderArea} component: swotData, setSwotData, handleChange (for Paretto), handleContinueClick (for Mathematical Swot workflow) titleName (of the Work Area), workAreaOption (the current step of the Mathematical Swot)
 */
const WorkArea = (props) => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="field is-grouped">
          <div className="control">
            <div
              className="button is-link mb-3"
              name="btnSave"
              onClick={props.handleSaveClick}
            >
              Guardar Proyecto
            </div>
          </div>
          <div className="control">
            <div
              className="button is-link mb-3"
              name="btnLoad"
              onClick={props.handleFileSubmit}
            >
              Subir Proyecto
            </div>
          </div>
          <div className="file has-name  is-right">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="fileProject"
                accept=".atuk"
                ref={props.fileInput}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Elegir proyecto...</span>
              </span>
              <span className="file-name">Proyecto Atuk</span>
            </label>
          </div>
        </div>
      </div>
      <div className="container" id="report">
        <p className="title">Atuk</p>
        <p className="subtitle">{props.titleName}</p>
        <RenderArea
          workAreaOption={props.workAreaOption}
          swotData={props.swotData}
          setSwotData={props.setSwotData}
          handleChange={props.handleChange}
          handleChangePow={props.handleChangePow}
          dataGraph={props.dataGraph}
        ></RenderArea>
      </div>
      <div className="container">
        <div className="field is-grouped">
          {/*
          <div className="control">
            <button
              className="button is-grey-ligth"
              name="btnBack"
              onClick={props.handleBackClick}
            >
              Atrás
            </button>
          </div>
          */}
          <div className="control">
            <div
              className="button is-link mt-3"
              name="btnContinue"
              onClick={props.handleContinueClick}
            >
              Continuar
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WorkArea;
