import React, { Component } from "react";
import Slide from "./components/slide";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main className="container">
          <Slide />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
