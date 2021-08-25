import React from "react";
import "../styles/Home.css";
import { Svg001TShirt } from "../components/icons";
import { NavLink } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <section id="firstScreen">

          <h1 id="title">
            <span className="compColor">&lt;</span>
            tl<span className="mainColor">;</span>da
            <span className="compColor">&gt;</span>
          </h1>
          <div id="LogoContainer">
            <Svg001TShirt></Svg001TShirt>
          </div>
          <p className="HomeText smallFont">If you want to dress better but do not want to  the effort</p>
          <button>Scroll down</button>
        </section>
        <section id="secondScreen">
          <div>
            <p>Improve your style with better color patterns</p>
            <p>Get recommendation based on weather</p>
            <p>Access to geeky stats</p>

          </div>
          <div>
            <h2 id="subTitle">
              <span className="compColor">&lt;</span>
              tl<span className="mainColor">;</span>da
              <span className="compColor">&gt;</span>
            </h2>
            <h3 id="subsubTitle">
              <span>the</span>
              <span>lazy</span>
              <span>dev</span>
              <span>apparel</span>
            </h3>
          </div>

          <NavLink to="/signup">Sign up</NavLink>

        </section>

      </div>
    );
  }
}

export default Home;
