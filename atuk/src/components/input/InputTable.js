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

import React, { useState, useCallback } from "react";
import Spreadsheet from "react-spreadsheet";

const initialData = [
  [
    { value: "Variable" },
    { value: "Valor" },
    { value: "Misión" },
    { value: "Visión" },
  ],
  [{ value: "Personal capacitado" }],
];

const InputTable = (props) => {
  const [data, setData] = useState(initialData);

  const addColumn = useCallback(
    () =>
      setData((data) =>
        data.map((row) => {
          const nextRow = [...row];
          nextRow.length += 1;
          return nextRow;
        })
      ),
    [setData]
  );

  const removeColumn = useCallback(() => {
    setData((data) =>
      data.map((row) => {
        return row.slice(0, row.length - 1);
      })
    );
  }, [setData]);

  const addRow = useCallback(
    () =>
      setData((data) => {
        const columns = data[0].length ? data[0].length : 0;
        return [...data, Array(columns)];
      }),
    [setData]
  );

  const removeRow = useCallback(() => {
    setData((data) => {
      return data.slice(0, data.length - 1);
    });
  }, [setData]);

  return (
    <React.Fragment>
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
            <div className="control">
              <button
                className="button is-danger"
                onClick={data[0].length > 2 ? removeColumn : 0}
              >
                Eliminar Elemento estratégico
              </button>
            </div>
            <div className="control">
              <button
                className="button is-danger"
                onClick={data.length > 1 ? removeRow : 0}
              >
                Eliminar Variable
              </button>
            </div>
          </div>
        </div>
      </div>
      <Spreadsheet data={data} onChange={setData} />
    </React.Fragment>
  );
};

export default InputTable;
