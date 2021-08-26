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
        hasItems: false,
        error: null,
        season: null
    }

    async componentDidMount() {
        // const oneItem = await apiHandler.checkIfOneItem()
        // // console.log(oneItem)
        // if (oneItem) {
        apiHandler.getOutfit()
            .then(data => {
                // console.log(data)

                if (data.top && data.bottom && data.shoe) {
                    apiHandler.getMeteo()
                        .then(meteo => {
                            this.setState({
                                top: data.top,
                                bottom: data.bottom,
                                shoes: data.shoe,
                                colors: data.finalColorPalette,
                                hasItems: true,
                                season: meteo
                            })
                        }
                        )
                        .catch(err => console.log(err))

                }
            })
            .catch(err => {
                this.setState({
                    error: "NoOutfit"
                })
            })
        // }
        // else {
        //     // console.log("else")
        //     this.props.history.push('/items')
        //     this.setState({
        //         errorMessage: "No clothes found"
        //     })
        // }
    }

    handleRegenerate = () => {
        apiHandler.getOutfit()
            .then(data => {
                // console.log(data)

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
            .catch(err => console.log(err))
    }

    handleWear = () => {

        // console.log(this.state.top._id)

        const IDs = [this.state.top._id, this.state.bottom._id, this.state.shoes._id]

        // console.log({IDs})
        apiHandler.postOutfit({ item: IDs })
            .then(data => {
                // console.log(data)
                this.props.history.push("/index")
            })
            .catch(err => console.log(err))
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if(JSON.stringify(prevState.colors) !== JSON.stringify(this.state.colors))
    //     {
    //         console.log("changedState")
    //     }
    // }

    render() {

        // if (this.props.context.user && !this.state.hasItems) {
        //     return <Redirect to="/items" />;
        // }

        // if (!this.props.context.user) {
        //     return <Redirect to="/signin" />;
        //   }
        if (!this.props.context.user) {
            return <Redirect to="/"></Redirect>
        }


        if (this.state.error === "NoOutfit") {
            return <div>Please select at least one top, one bottom and one pair of shoes in "Items" </div>
        }


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

                    <div className="OutfitPalette">
                        <ColorPalette colors={this.state.colors} />


                    </div>
                    <h2 id="PageTitle">
                        <span>outfit</span>
                        <span>for</span>
                        <span>today</span>
                        <span>weather :</span>

                        {
                            this.state.season === "warm" && <span>&#x2600;</span>
                        }
                        {
                            this.state.season === "cold" && <span style={{color: "var(---main-font-color-comp1)"}}>&#10052;</span>

                        }
                    </h2>
                    <div className="OutfitItem">
                        <SVGFunkyFranck url={this.state.top.type.image} className="OutfitItem" color={this.state.top.color} />
                    </div>
                    <div className="OutfitItem">
                        <SVGFunkyFranck url={this.state.bottom.type.image} className="OutfitItem" color={this.state.bottom.color} />
                    </div>
                    <div className="OutfitItem">
                        <SVGFunkyFranck url={this.state.shoes.type.image} className="OutfitItem" color={this.state.shoes.color} />
                    </div>
                    <div>
                        <div>
                            <button className="button" onClick={this.handleRegenerate}>regenerate</button>

                            <button onClick={this.handleWear} className="button">wear</button>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default withRouter(withUser(Outfit));
