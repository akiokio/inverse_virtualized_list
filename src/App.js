import React, { Component } from "react";
import { List } from "immutable";

import styles from "./App.module.scss";
import "./Common/elements.scss";

import Header from "./Header";
import InvertedList from "./InvertedList";

import { GetListData } from "./Api/ListAPI";

class App extends Component {
  state = {
    sampleSize: "100",
    listItems: List()
  };

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
      <div className={styles.App}>
        <Header
          sampleSize={sampleSize}
          handleSampleSizeChanged={this.handleSampleSizeChanged}
          handleGenerate={this.handleGenerate}
          handlereset={this.handlereset}
        />
        <section className={styles.ListWrapper}>
          <InvertedList listItems={listItems} />
        </section>
      </div>
    );
  }
}

export default App;
