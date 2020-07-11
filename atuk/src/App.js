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

import React from "react";
import logo from "./img/logoAtuk.svg";
import github_logo from "./img/github-icon.svg";
import "./App.css";
import "./App.sass";

import Hero from "./components/layout/Hero";
import Input from "./components/input/InputTable";

function App() {
  var content = (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>A tool for Mathematical SWOT.</p>
        <a
          className="App-link"
          href="https://github.com/ds-developer1/atuk.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <img src={github_logo} className="Icon" alt="github-logo" />
          </span>
        </a>
      </header>
      <br />
      <br />
      <br />
      <h1 className="title">Bulma</h1>
      <p className="subtitle">
        Modern CSS framework based on{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox">
          Flexbox
        </a>
      </p>

      <div className="field">
        <div className="control">
          <input className="input" type="text" placeholder="Input" />
        </div>
      </div>

      <div className="field">
        <p className="control">
          <span className="select">
            <select>
              <option>Select dropdown</option>
            </select>
          </span>
        </p>
      </div>

      <div className="buttons">
        <a href="http://localhost:3000" className="button is-primary">
          Primary
        </a>
        <a href="http://localhost:3000" className="button is-link">
          Link
        </a>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <Hero></Hero>
      <div className="tile is-ancestor mt-2">
        <div className="tile is-parent">
          <article className="tile is-child notification is-info">
            <div className="content">
              <p className="title">Tall tile</p>
              <p className="subtitle">With even more content</p>
              <div className="content"></div>
            </div>
          </article>
        </div>
        <div className="tile is-10">
          <div className="tile is-parent">
            <article className="tile is-child notification">
              <p className="title">Wide tile</p>
              <p className="subtitle">Aligned with the right tile</p>
              <div className="container">
                <Input></Input>
              </div>
            </article>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
