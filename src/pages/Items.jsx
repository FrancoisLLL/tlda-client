

import React, { Component } from 'react'
import ItemSelector from "../components/ItemSelector";
import ItemColorSelector from "../components/ItemColorSector";
import apiHandler from '../api/apiHandler';
import { Redirect } from "react-router-dom"
import { withUser } from '../components/Auth/withUser';
export class Items extends Component {
    state = {
        typeIdClicked: null,
        typeClicked: null,
        itemsSelected: null,
        itemsOwned: null,
        isSubmitted: false
    }


    componentDidMount() {
        apiHandler.getItems()
            .then(data => {
                const itemsFound = data.map(item => {
                    return {
                        typeId: item.type,
                        color: item.color
                    }
                })
                this.setState({
                    itemsSelected: [...itemsFound],
                    itemsOwned: [...itemsFound],
                })
            }
            )
            .catch()
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

        const filteredItems = items.filter(item => JSON.stringify(item) !== JSON.stringify({
            typeId: this.state.typeIdClicked,
            color: color
        }))

        if(filteredItems.length===items.length)
        {
            items.push({
                typeId: this.state.typeIdClicked,
                color: color
            })

            this.setState({
                itemsSelected: [...items]
            })
        }
        else{
            this.setState({
                itemsSelected: [...filteredItems]
            })
        }

    }

    handleSubmit = () => {

        if (this.state.itemsSelected) {
            // const batchItem = this.state.itemsSelected.map((item) => {
            //     return {
            //         type: item.typeId,
            //         color: item.color
            //     }
            // })

            const batchItemFiltered = this.state.itemsSelected.filter((item) => {
                return (
                    !this.state.itemsOwned.includes(item)
                )
            }).map((item) => {
                return {
                    type: item.typeId,
                    color: item.color
                }
            })

            apiHandler.postBatchItems(batchItemFiltered)
                .then(data => {
                    this.setState({
                        typeIdClicked: null,
                        typeClicked: null,
                        itemsSelected: null,
                        itemsOwned: null,
                        isSubmitted: true
                    })
                })
                .catch(err => console.log(err))
        }
        else {
            this.setState({
                isSubmitted: true
            })
        }
    }


    render() {


        // console.log(!this.props.context.user)
        // if (!this.props.context.user) {
        //     return <Redirect to="/signin" />;
        //   }
        if (!this.props.context.user) {
            return <Redirect to = "/"></Redirect>
        }

        if (this.state.isSubmitted) {
            return <Redirect to="/index" />
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
                <div id="ItemSelector" className="flex">
                    <ItemSelector handleClick={this.handleItemClick} typeIdClicked={this.state.typeIdClicked} />
                    {this.state.typeIdClicked && <ItemColorSelector handleClick={this.handleColorPick} typeIdClicked={this.state.typeIdClicked} items={this.state.itemsSelected} />}
                </div>
                <button className="button" onClick={this.handleSubmit}>Add to collection</button>
            </div>
        </>
        )
    }
}

export default withUser(Items)
