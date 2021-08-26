import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { withUser } from '../components/Auth/withUser';
import apiHandler from '../api/apiHandler';
import "../styles/Index.css"

export class Index extends Component {

    handleLogout = () => {
        apiHandler
            .logout()
            .then(() => {
                this.props.context.removeUser();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        if (!this.props.context.user) {
            return <Redirect to="/"></Redirect>
        }
        return (

            <div id="Index">
                <h1 id="FormTitle">
                    <span>welcome</span>
                    <span>{this.props.context.user.firstName}</span>
                    <span>{this.props.context.user.lastName}</span>
                </h1>

                <div>
                    <NavLink to="/items">
                        <button className="button">Items</button>
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/outfits">
                        <button className="button">Generate</button>
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/history">
                        <button className="button">History</button>
                    </NavLink>
                </div>

                <div>
                    <button className="button">Shop</button>

                </div>
                <div>
                    <button className="button">Stats</button>
                </div>

                <div className="lastButton">
                    {/* <NavLink to="/signin"> */}
                    <div>
                    <NavLink to="/profile">
                        <button className="button">Profile</button>
                    </NavLink>
                </div>
                    <button className="button" onClick={this.handleLogout}>Logout</button>
                    {/* </NavLink> */}
                </div>


            </div>
        )
    }
}

export default withUser(Index)
