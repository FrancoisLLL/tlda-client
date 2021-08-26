import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";

import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;

  // function handleLogout() {
  //   apiHandler
  //     .logout()
  //     .then(() => {
  //       context.removeUser();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  return (
    context.isLoggedIn && (
      <nav className="NavMain">
        <NavLink exact to="/index">
          <div className = "HomeButton">
            &#8962;
          </div>
        </NavLink>

        <NavLink exact to="/index">

        <h3 id="nav-list">
          <span className="compColor">&lt;</span>
          tl<span className="mainColor">;</span>da
          <span className="compColor">&gt;</span>
        </h3>
        </NavLink>

      </nav>
    )
  );
};

export default withUser(NavMain);
