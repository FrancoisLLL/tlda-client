

import React, { Component } from 'react'
import ItemSelector from "../components/ItemSelector";
import ItemColorSelector from "../components/ItemColorSector";
import apiHandler from '../api/apiHandler';
import { Redirect } from "react-router-dom"

export class Items extends Component {
    state = {
        typeIdClicked: null,
        typeClicked: null,
        itemsSelected: null,
        isSubmitted: false
    }

    handleItemClick = (id) => {
        this.setState(
            {
                typeIdClicked: id,
            }
        )
    }

    handleColorPick = (color) => {
        const items = this.state.itemsSelected ? [...this.state.itemsSelected] : []
        items.push({
            typeId: this.state.typeIdClicked,
            color: color
        })

        this.setState({
            itemsSelected: items
        }
        )
    }

    handleSubmit = () => {

        const batchItem = this.state.itemsSelected.map((item) => {
            return {
                type: item.typeId,
                color: item.color
            }
        })

        apiHandler.postBatchItems(batchItem)
            .then(data => {
                this.setState({
                    typeIdClicked: null,
                    typeClicked: null,
                    itemsSelected: null,
                    isSubmitted: true
                })
            })
            .catch(err => console.log(err))

    }

    render() {

        if(this.state.isSubmitted) {
            console.log("redirect")
            return <Redirect to="/outfits"/>
        }

        return (<>
            <div id="Item">
                <h1 id="PageTitle">
                    <span>pick</span>
                    <span>the</span>
                    <span>clothes</span>
                    <span>you</span>
                    <span>own</span>
                </h1>
                <div className="flex">
                    <ItemSelector handleClick={this.handleItemClick} typeIdClicked={this.state.typeIdClicked} />
                    {this.state.typeIdClicked && <ItemColorSelector handleClick={this.handleColorPick} typeIdClicked={this.state.typeIdClicked} items={this.state.itemsSelected} />}
                </div>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        </>
        )
    }
}

export default Items
