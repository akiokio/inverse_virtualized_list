import React, { Component } from "react";
import "./App.css";

import Header from "./Header";
import InvertedList from "./InvertedList";

import { GetListData } from "./Api/ListAPI";

class App extends Component {
  state = {
    sampleSize: "",
    listItems: []
  };

  componentDidMount() {}

  handleSampleSizeChanged = event => {
    this.setState({ sampleSize: event.target.value });
  };

  handlereset = () => {
    this.setState({ sampleSize: "", listItems: [] });
  };

  handleGenerate = () => {
    const { sampleSize } = this.state;
    this.setState({ listItems: GetListData(parseInt(sampleSize)) });
  };

  render() {
    const { listItems, sampleSize } = this.state;
    return (
      <div className="App">
        <Header
          sampleSize={sampleSize}
          handleSampleSizeChanged={this.handleSampleSizeChanged}
          handleGenerate={this.handleGenerate}
          handlereset={this.handlereset}
        />
        <InvertedList listItems={listItems} />
      </div>
    );
  }
}

export default App;
