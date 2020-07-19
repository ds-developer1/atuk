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

import React, { useState } from "react";
import Spreadsheet from "react-spreadsheet";

const Pareto = (props) => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="control" onChange={props.handleChange}>
              <label className="radio mr-3">
                <input type="radio" value="80" name="pareto" defaultChecked />
                80/20
              </label>
              <label className="radio mr-3">
                <input type="radio" value="70" name="pareto" />
                70/30
              </label>
              <label className="radio mr-3">
                <input type="radio" value="60" name="pareto" />
                60/40
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-3 mx-1">
        <Spreadsheet data={props.swotData} onChange={props.setSwotData} />
      </div>
    </React.Fragment>
  );
};

export default Pareto;
