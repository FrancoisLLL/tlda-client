import React, { Component } from 'react'
import apiHandler from '../api/apiHandler'
import { withRouter, Redirect } from "react-router-dom";
import { withUser } from '../components/Auth/withUser';
import SVGFunkyFranck from '../components/SVGFunkyFrank';
import ColorPalette from '../components/ColorPalette';

import "../styles/Outfit.css"
export class Outfit extends Component {

    state = {
        top: null,
        bottom: null,
        shoes: null,
        colors: null,
        hasItems: false
    }

    async componentDidMount() {
        const oneItem = await apiHandler.checkIfOneItem()
        console.log(oneItem)
        if (oneItem) {
            apiHandler.getOutfit()
                .then(data => {
                    console.log(data)

                    if (data.top && data.bottom && data.shoe) {

                        this.setState({
                            top: data.top,
                            bottom: data.bottom,
                            shoes: data.shoe,
                            colors: data.finalColorPalette,
                            hasItems: true
                        })
                    }
                })
        }
        else {
            console.log("else")
            console.log(this.props.history.push('/items'))
        }
    }

    handleRegenerate = () => {
        apiHandler.getOutfit()
        .then(data => {
            console.log(data)

            if (data.top && data.bottom && data.shoe) {

                this.setState({
                    top: data.top,
                    bottom: data.bottom,
                    shoes: data.shoe,
                    colors: data.finalColorPalette,
                    hasItems: true
                })
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(JSON.stringify(prevState.colors) !== JSON.stringify(this.state.colors))
        {
            console.log("changedState")
        }
    }

    render() {

        // if (this.props.context.user && !this.state.hasItems) {
        //     return <Redirect to="/items" />;
        // }

        if (!this.state.top) {
            return <div>Generating outfit.......</div>
        }

        return (
            <>
                <div id="Outfit">
                        <h2 id="PageTitle">
                            <span>colormind</span>
                            <span>scheme</span>
                        </h2>

                    <div className = "OutfitPalette">
                    <ColorPalette colors={this.state.colors} />


                    </div>
                    <h2 id="PageTitle">
                            <span>closest</span>
                            <span>outfit</span>

                        </h2>
                    <div className = "OutfitItem">
                        <SVGFunkyFranck   url={this.state.top.type.image} className="OutfitItem" color={this.state.top.color} />
                    </div>
                    <div className = "OutfitItem">
                        <SVGFunkyFranck url={this.state.bottom.type.image} className="OutfitItem" color={this.state.bottom.color} />
                    </div>
                    <div className = "OutfitItem">
                        <SVGFunkyFranck url={this.state.shoes.type.image} className="OutfitItem" color={this.state.shoes.color} />
                    </div>
                    <div>
                        <div>
                        <button onClick = {this.handleRegenerate}>regenerate</button>

                            <button>submit</button>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default withRouter(withUser(Outfit));
