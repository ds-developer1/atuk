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

import React from "react";
import logo from "../../img/logoAtuk.svg";
import github_logo from "../../img/github-icon.svg";
// import atuk_logo from "../../img/atuk.svg";

const Hero = () => {
  return (
    <section className="hero is-info">
      <div className="hero-head"></div>

      <div className="hero-body level">
        <div className="level-item has-text-centered">
          <nav className="tabs is-boxed is-fullwidth">
            <div className="container">
              <ul>
                <li className="is-active">
                  <a href="https://atuk.netlify.app/">Inicio</a>
                </li>
                <li>
                  <a href="https://atuk-blog.netlify.app/foda">
                    FODA Matemático
                  </a>
                </li>
                <li>
                  <a href="https://atuk-blog.netlify.app/planificacion">
                    Planificación Estratégica
                  </a>
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
                  <a href="https://atuk-blog.netlify.app/" target="_blank">
                    Ayuda
                  </a>
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
