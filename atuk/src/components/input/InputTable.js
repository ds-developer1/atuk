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

import React, { useCallback } from "react";
import Spreadsheet from "react-spreadsheet";

const InputTable = (props) => {
  const setSwotData = props.setSwotData;
  const addColumn = useCallback(
    () =>
      setSwotData((data) =>
        data.map((row) => {
          const nextRow = [...row];
          nextRow.length += 1;
          return nextRow;
        })
      ),
    [setSwotData]
  );

  const removeColumn = useCallback(() => {
    setSwotData((data) =>
      data.map((row) => {
        return row.slice(0, row.length - 1);
      })
    );
  }, [setSwotData]);

  const addRow = useCallback(
    () =>
      setSwotData((data) => {
        const columns = data[0].length ? data[0].length : 0;
        return [...data, Array(columns)];
      }),
    [setSwotData]
  );

  const removeRow = useCallback(() => {
    setSwotData((data) => {
      return data.slice(0, data.length - 1);
    });
  }, [setSwotData]);

  return (
    <React.Fragment>
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-success" onClick={addColumn}>
                  Añadir Elemento estratégico
                </button>
              </div>
              <div className="control">
                <button className="button is-success" onClick={addRow}>
                  Añadir Variable
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field is-grouped">
              <div className="control">
                <button
                  className="button is-danger"
                  onClick={props.swotData[0].length > 2 ? removeColumn : 0}
                >
                  Eliminar Elemento estratégico
                </button>
              </div>
              <div className="control">
                <button
                  className="button is-danger"
                  onClick={props.swotData.length > 1 ? removeRow : 0}
                >
                  Eliminar Variable
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-3 mx-1">
        <Spreadsheet data={props.swotData} onChange={setSwotData} />
      </div>
    </React.Fragment>
  );
};

export default InputTable;
