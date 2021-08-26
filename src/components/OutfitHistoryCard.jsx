import React, { Component } from 'react'
import apiHandler from '../api/apiHandler';
import SVGFunkyFranck from './SVGFunkyFrank'
import { buildFormData } from '../utils';
export class OutfitHistoryCard extends Component {

    state = {
        items: null,
        selectedImage: null,
        image: null,
        date: null,
        submitted: false
    }

    componentDidMount() {
        apiHandler.getOneHistory(this.props.id)
            .then(data => {
                console.log(data)
                this.setState({
                    items: data.item,
                    date: data.date,
                    image: data.image,
                    submitted: false
                })
            })
            .catch(err => console.log(err))
    }

    handleChange = (event) => {
        const value = event.target.files[0];
        const key = event.target.name;
        this.setState({ [key]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)

        const fd = new FormData();
        if(this.state.selectedImage) {
            fd.append("image", this.state.selectedImage);

            apiHandler.patchOneOutfit(this.props.id, fd)
                .then(data => {
                    this.setState({
                        image: data.image,
                        submitted: true
                    })
                })
                .catch(err => console.log(err))
        }
        
    }


    convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
    }

    render() {

        if (!this.state.items) {
            return <div>Loading.....</div>
        }

        return (
            <div className="OutfitCard">
                <p>
                    {this.convertDate(this.state.date)}
                </p>
                <div className="OutfitCardItems">
                    {this.state.items.map(item => {
                        return <SVGFunkyFranck key={item.type.image + item.color} url={item.type.image} color={item.color} />
                    })}

                </div>
                {(!this.state.image )&& <form onSubmit={this.handleSubmit}>
                    <div>
                    <label htmlFor={"selectedImage"}>Upload photo</label>
                    <input onChange={this.handleChange} type="file" id="selectedImage" name="selectedImage" ></input>

                    </div>
                    <button className="button">Submit</button>
                </form>}

                {
                    this.state.image  && <div className = "OutfitImageContainer">
                        <img className = "OutfitImage" src={this.state.image} alt="" />
                    </div>
                }

            </div>
        )
    }
}

export default OutfitHistoryCard
