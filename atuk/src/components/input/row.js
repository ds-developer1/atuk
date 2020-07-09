// Atuk.
// Copyright (C) 2020 Alan Quimbita, Esteban Molina, Shakira Cofre.
//
// Row.js is part of Atuk.
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

const Row = (props) => {
  const [dataText, setDataText] = useState("Ingrese su elemento");
  const [variable, setVariable] = useState([
    <React.Fragment key="v"></React.Fragment>,
  ]);
  const [element, setElement] = useState([
    <React.Fragment key="e"></React.Fragment>,
  ]);
  const [keyVariable, setKeyVariable] = useState(0);
  const [keyElement, setKeyElement] = useState(0);
  const [keyInput, setKeyInput] = useState(0);

  const inputChanged = (event) => {
    setDataText(event.target.value);
  };

  const handleSubmitVariable = (event) => {
    if (dataText !== "") {
      var createInput = () => {
        var input = [];
        let j = keyInput;
        for (let i = 0; i < element.length; i++) {
          input.push(<td key={"i" + j}>here</td>);
          j++;
          setKeyInput((k) => k + 1);
        }
        return input;
      };
      var newInput = createInput();

      var newVariable = (
        <tr key={"e" + keyVariable}>
          <td>
            <p>{dataText}</p>
          </td>
          {newInput.map((data) => {
            return data;
          })}
        </tr>
      );
      setVariable([...variable, newVariable]);
      setKeyVariable((k) => k + 1);
      setDataText("");
    }
  };

  const handleSubmitElement = (event) => {
    if (dataText !== "") {
      setElement([
        ...element,
        <td key={"v" + keyElement}>
          <p>{dataText}</p>
        </td>,
      ]);
      setKeyElement((k) => k + 1);
      setDataText("");
    }
  };

  return (
    <React.Fragment>
      <div className="columns">
        <div className="column">
          <div className="field">
            <div className="control">
              <input
                className="input is-info"
                type="text"
                name="dataText"
                value={dataText}
                onChange={inputChanged}
                placeholder="Info input"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-link"
                name="variable"
                onClick={handleSubmitVariable}
              >
                Ingresar variable
              </button>
            </div>
            <div className="control">
              <button
                className="button is-link"
                name="element"
                onClick={handleSubmitElement}
              >
                Ingresar elemento estratégico
              </button>
            </div>
            <div className="control">
              <button className="button is-link is-light" type="reset">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="table-container">
        <table className="table is-hoverable">
          <thead>
            <tr>
              <td>Variable</td>
              <td>Valor</td>
              {element}
              <td>Porcentaje</td>
              <td>Porcentaje acumulado</td>
            </tr>
          </thead>
          <tfoot>
            <tr></tr>
          </tfoot>
          <tbody>{variable}</tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Row;
