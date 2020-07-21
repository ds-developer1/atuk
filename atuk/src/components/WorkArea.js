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

import React, { useState } from "react";
import Input from "./input/InputTable";
import Pareto from "./input/Pareto";
import ReducedMatrix from "./process/ReducedMatrix";
import Evaluation from "./process/Evaluation";
import Priorization from "./process/Priorization";

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
      break;
    case "7":
      break;
  }
};

const WorkArea = (props) => {
  return (
    <React.Fragment>
      <p className="title">Atuk</p>
      <p className="subtitle">{props.titleName}</p>
      <div className="container">
        <RenderArea
          workAreaOption={props.workAreaOption}
          swotData={props.swotData}
          setSwotData={props.setSwotData}
          handleChange={props.handleChange}
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
              className="button is-link"
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
