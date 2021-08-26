import React, { Component } from 'react'
import apiHandler from '../api/apiHandler'
import OutfitHistoryCard from '../components/OutfitHistoryCard'
import "../styles/History.css"
export class History extends Component {
    state = {
        outfits: null
    }

    componentDidMount() {
        apiHandler.getOutfitsHistory()
            .then(data => {
                this.setState({
                    outfits: data
                })
            }
            )
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div id="History">
                {/* <pre>{JSON.stringify(this.state.outfits,null,2)}</pre> */}
                <h1 id="PageTitle">
                    <span>history</span>
                    <span>of</span>
                    <span>outfits</span>
                </h1>
                <div id = "HistoryContent">
                    {this.state.outfits && (
                        this.state.outfits.map(outfit => {
                            return <OutfitHistoryCard key = {outfit._id} items = {outfit.item} date={outfit.date}/>
                        })
                    )}
                </div>
            </div>
        )
    }
}

export default History
