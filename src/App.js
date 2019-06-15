import React, { Component } from "react";
import { List } from "immutable";

import "./App.css";

import Header from "./Header";
import InvertedList from "./InvertedList";

import { GetListData } from "./Api/ListAPI";

class App extends Component {
  state = {
    sampleSize: "100",
    listItems: List()
  };

  componentDidMount() {}

  handleSampleSizeChanged = event => {
    this.setState({ sampleSize: event.target.value });
  };

  handlereset = () => {
    this.setState({ sampleSize: "", listItems: List() });
  };

  handleGenerate = () => {
    const { sampleSize, listItems } = this.state;
    const desiredSampleSize = parseInt(sampleSize);
    if (!desiredSampleSize) {
      alert("Please provide a positive number");
    } else {
      this.setState({
        listItems: listItems.concat(GetListData(desiredSampleSize))
      });
    }
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
