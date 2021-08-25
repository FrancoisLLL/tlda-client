import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";

import "../../styles/Form.css"
class FormSignin extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };



  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.props.context.setUser(data);

      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
        this.setState({ error: "Wrong credentials" });

      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/outfits" />;
    }

    return (
      <div id="form">

        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <h1 id="FormTitle">
            <span>sign</span>
            <span>in</span>
          </h1>
          <div>
            <label htmlFor="email">Email</label>
            <p>          <input type="email" id="email" name="email" required />
            </p>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <p>          <input type="password" id="password" name="password" required />
            </p>
          </div>
          <p className="error">
            {this.state.error}
          </p>
          <button>Submit</button>
        </form>
      </div>

    );
  }
}

export default withRouter(withUser(FormSignin));
