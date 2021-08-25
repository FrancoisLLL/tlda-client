import React, { Component } from 'react'

export class SVGWrapper extends Component {

    state = {
        svg: null,
        loading: false,
    }

    componentDidMount() {
        fetch(this.props.url)
            .then(res => res.text())
            .then(text => {
                // console.log(text)
                this.setState({ svg: text })
            });
    }

    render() {
        const { loading, svg } = this.state;
        if (loading) {
            return <div className="spinner" />;
        } else if (!svg) {
            return <div className="error" />
        }
        return <div {...this.props} dangerouslySetInnerHTML={{ __html: this.state.svg.replace(/fill=".*?"/g, 'fill="blue"') }} />;
    }
}

export default SVGWrapper
