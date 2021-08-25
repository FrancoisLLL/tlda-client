import React, { Component } from 'react'
import apiHandler from '../api/apiHandler'
import ColorPickerRound from './ColorPickerRound'
export class ItemColorSelector extends Component {
    state = {
        colors: null
    }

    async componentDidMount() {
        const colors = await apiHandler.getColors()
        this.setState({
            colors: [...colors]
        })
    }

    render() {
        if (!this.state.colors) {
            return <div>Loading...</div>
        }

        return (
            <div id = "colorPicker">
                {this.state.colors.sort((a,b) =>  {return b-a}).map(color => {
                    return <ColorPickerRound key={color + Math.random() *10000} handleClick = {this.props.handleClick} typeIdClicked = {this.props.typeIdClicked} items={this.props.items} color = {color.color}/>
                })}
            </div>
        )
    }
}

export default ItemColorSelector
