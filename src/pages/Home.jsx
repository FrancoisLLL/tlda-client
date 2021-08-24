import React from "react";
import "../styles/Home.css";
import { Svg001TShirt, Svg002Tshirt, ClothesRack } from "../components/icons";

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <section id="firstScreen">

          <h1 id = "title">&lt;tl<span className="violet">;</span>da&gt;</h1>
          <div id="LogoContainer">
            <Svg001TShirt></Svg001TShirt>
          </div>
          <p className="HomeText smallFont">If you want to dress better but do not want to  the effort</p>
          <button>Scroll down</button>
        </section>
        <section id="secondScreen">
          <p></p>
          <p></p>
          <p></p>
        </section>

      </div>
    );
  }
}

export default Home;
