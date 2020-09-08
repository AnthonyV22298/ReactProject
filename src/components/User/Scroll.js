import React, { Component } from "react";
import { Link } from "react-scroll";

export default class Scroll extends Component {
  render() {
    return (
      <nav className="nav navParentClass" id="navbar">
        <div className="nav-content scrollNav">
          <ul className="nav-items scrollUl">
            <li className="nav-item navUlLi">
              <Link
                activeClass="active"
                to="updateSection"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
              <div className="updatePointer">
                  <div id="arrowD" className="arrow list-group">
                      <a className="aLink" href="#updateSection">
                          <h2>Edit</h2>
                          <p>▽</p>
                      </a>
                  </div>
              </div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

















/*import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Section from "./Components/Section";
import dummyText from "./DummyText";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Section
          title="Section 1"
          subtitle={dummyText}
          dark={true}
          id="section1"
        />
      </div>
    );
  }
}

export default App;
*/
