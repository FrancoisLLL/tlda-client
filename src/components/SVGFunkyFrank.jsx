import React from "react";

class SVGFunkyFranck extends React.Component {
  state = {
    svg: "",
    color: "red",
  };

  divRef = React.createRef(null);
  obsRef = React.createRef(null);

  componentDidMount() {
    this.obsRef.current = new MutationObserver(this.handleMutation);
    this.obsRef.current.observe(this.divRef.current, {
      // Check config in https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
      childList: true,
      attributes: false,
      characterData: true,
    });

    fetch(this.props.url)
    .then(res => res.text())
    .then(text => {
      this.setState({ svg: text , color: this.props.color})
    });

  }

  componentDidUpdate(prevProps, prevState) {
    console.log("did update ")
    if (this.state.color !== prevState.color) {
      const element = this.divRef.current.querySelector("svg")

      element.setAttribute("fill", this.state.color);
    }
  }

  componentWillUnmount() {
    this.obsRef.current.disconnect();
  }

  handleMutation = (mutationsList, observer) => {
    console.log("mutate ", this.state.color)
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        this.divRef.current
          .querySelector("svg")
          .setAttribute("fill", this.state.color);
      }
    }
  };

  render() {
    return (
      <div>
        {/* <button onClick={() => this.setState({ color: "green" })}>Color</button> */}
        <div
           {...this.props}
          ref={this.divRef}
          dangerouslySetInnerHTML={{
            __html: this.state.svg,
          }}
        ></div>
      </div>
    );
  }
}

export default SVGFunkyFranck;