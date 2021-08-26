import React, { Component } from "react";
import { withRouter, Redirect, NavLink } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";

import "../../styles/Form.css"
class FormSignup extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    // image: ""
  };



  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    if (key === "image") {
      this.setState({ [key]: event.target.files[0] });
    }
    else {
      this.setState({ [key]: value });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    apiHandler
      .signup(this.state)
      .then(() => {
        this.props.history.push("/signin");
      })
      .catch((error) => {
        console.log(error);

      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <div id="form">
        <NavLink to="/">
          <h2 id="subTitle">
            <span className="compColor">&lt;</span>
            tl<span className="mainColor">;</span>da
            <span className="compColor">&gt;</span>
          </h2>
        </NavLink>
        <form onSubmit={this.handleSubmit}>
          <h1 id="FormTitle">
            <span>let's</span>
            <span>get</span>
            <span>to</span>
            <span>know</span>
            <span>each</span>
            <span>other</span>
          </h1>

          <div className = "FormInputContainer">
            <label htmlFor="firstName">First Name</label>
            <p>
              <input
                onChange={this.handleChange}
                value={this.state.firstName}
                type="text"
                id="firstName"
                name="firstName"
                required
              />
            </p>

            <label htmlFor="lastName">Last Name</label>
            <p>

              <input
                onChange={this.handleChange}
                value={this.state.lastName}
                type="text"
                id="lastName"
                name="lastName"
                required
              />
            </p>


            <label htmlFor="email">Email</label>
            <p>

              <input
                onChange={this.handleChange}
                value={this.state.email}
                type="email"
                id="email"
                name="email"
                required
              />
            </p>

            <label htmlFor="password">Password</label>
            <p>
              <input
                onChange={this.handleChange}
                value={this.state.password}
                type="password"
                id="password"
                name="password"
                required
              />
            </p>
          </div>

          {/* <div>
            <label htmlFor="image">Photo</label>
            <p>


              <input
                onChange={this.handleChange}
                type="file"
                id="image"
                name="image"
              />

            </p>
          </div> */}


          <button className="button">Submit</button>

        </form>
      </div>

    );
  }
}

export default withRouter(withUser(FormSignup));
