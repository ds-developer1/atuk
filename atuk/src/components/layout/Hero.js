// Atuk.
// Copyright (C) 2020 Alan Quimbita, Esteban Molina, Shakira Cofre.
//
// Hero.js is part of Atuk.
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
import logo from "../../img/logoAtuk.svg";
import github_logo from "../../img/github-icon.svg";

const Hero = () => {
  return (
    <section className="hero is-info">
      <div className="hero-head">
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <a href="#" className="navbar-item">
                <img
                  src="https://bulma.io/images/bulma-type-white.png"
                  alt="Logo"
                />
              </a>
              <span
                className="navbar-burger burger"
                data-target="navbarMenuHeroB"
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroB" className="navbar-menu">
              <div className="navbar-end">
                <a href="#" className="navbar-item is-active">
                  Home
                </a>
                <a href="#" className="navbar-item">
                  Examples
                </a>
                <a href="#" className="navbar-item">
                  Documentation
                </a>
                <span className="navbar-item">
                  <a href="#" className="button is-info is-inverted">
                    <span className="icon">
                      <i className="fab fa-github"></i>
                    </span>
                    <span>Download</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="hero-body level">
        <div className="level-item has-text-centered">
          <nav className="tabs is-boxed is-fullwidth">
            <div className="container">
              <ul>
                <li className="is-active">
                  <a href="#">Inicio</a>
                </li>
                <li>
                  <a href="#">FODA Matemático</a>
                </li>
                <li>
                  <a href="#">Planificación Estratégica</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="level-item has-text-centered">
          <img src={logo} style={{ maxHeight: "192px" }} alt="logo" />
        </div>
        <div className="level-item has-text-centered">
          <nav className="tabs is-boxed is-fullwidth">
            <div className="container">
              <ul>
                <li className="">
                  <a href="#">Acerca de</a>
                </li>
                <li>
                  <a href="#">Ayuda</a>
                </li>
                <li>
                  <a
                    href="https://github.com/ds-developer1/atuk.git"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      <img
                        src={github_logo}
                        style={{ maxHeight: "32px" }}
                        alt="github-logo"
                      />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className="hero-foot"></div>
    </section>
  );
};

export default Hero;
