import React from "react";
import { withUser } from "../components/Auth/withUser";

import './../styles/Profile.css'
const Profile = (props) => {
  return (
    <div id="Profile">
      {/* <pre>{JSON.stringify(props.context.user, null, 2)}</pre> */}
      <h1 id="FormTitle">
        <span>profile</span>
      </h1>

    <span></span>
      <p>First name : {props.context.user.firstName}</p>
      <p>Last name : {props.context.user.lastName}</p>
      <p>Email : {props.context.user.email}</p>
    </div>
  );
};

export default withUser(Profile);
