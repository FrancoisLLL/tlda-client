import React from "react";
import "../styles/Home.css";
import Cintre from "../components/icons/Cintre.js";
import { NavLink, Redirect } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
class Home extends React.Component {
  render() {
    if (this.props.context.user) {
      return <Redirect to="/index" />;
    }
    return (

      
      <div id="Home">
        {/* first section */}
        <section id="firstScreen">

          <div id="HomeTitle">
            <h1 >
              <span className="compColor">&lt;</span>
              tl<span className="mainColor">;</span>da
              <span className="compColor">&gt;</span>
            </h1>
          </div>

          <div id="LogoContainer">
            <Cintre></Cintre>
          </div>
          <p className="HomeText smallFont">If you want to dress better but do not want to  the effort</p>
          <a href='#secondScreen'>
            <button className="HomeArrowButtonDown"></button>
          </a>
        </section>

        {/* Second section */}

        <section id="secondScreen">
          <a href='#Home'>

            <button className="HomeArrowButtonUp"></button>
          </a>
          <article id="HomeArticle">
            <p>Improve your style with better color patterns</p>
            <p>Get recommendation based on weather</p>
            <p>Access to geeky stats</p>
          </article>
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

          <div className="flex center">
            <NavLink to="/signup">
              <div className="button">
                Sign up
              </div>
            </NavLink>

            <NavLink to="/signin">
              <div className="button">
                Sign in
              </div>
            </NavLink>
          </div>



        </section>

      </div>
    );
  }
}

export default withUser(Home);
