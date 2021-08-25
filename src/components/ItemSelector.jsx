import React, { Component } from 'react'
import apiHandler from '../api/apiHandler'
import "../styles/itemSelector.css"
import SVGWrapper from './SVGWrapper'

export class ItemSelector extends Component {
    state = {
        types: null
    }

    async componentDidMount() {
        const types = await apiHandler.getTypes()
        this.setState({
            types: [...types],
        })
    }

    render() {
        if (!this.state.types) {
            return <div>Loading...</div>
        }
        return (
            <div id="itemSelector">
                {this.state.types.map(type =>
                    <div key = { type._id} onClick={()=> this.props.handleClick(type._id)} name={type._id} >
                        <SVGWrapper className = {type._id ===this.props.typeIdClicked ? "ItemSelectorImageActive": "ItemSelectorImage"} url={type.image} />
                    </div>
                )}
            </div>
        )
    }
}

export default ItemSelector
