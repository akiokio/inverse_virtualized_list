import React, { Component } from "react";
import { List } from "immutable";

import styles from "./App.module.scss";
import "./Common/elements.scss";

import Header from "./Header";
import InverseList from "./InverseList";

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

  generateNewList = sampleSize => {
    const { listItems } = this.state;
    this.setState({
      listItems: listItems.concat(GetListData(sampleSize))
    });
  };

  handleGenerate = () => {
    const { sampleSize } = this.state;
    const desiredSampleSize = parseInt(sampleSize);
    if (!desiredSampleSize) {
      alert("Please provide a number");
    } else if (desiredSampleSize < 0) {
      alert("Please provide a positive number");
    } else if (desiredSampleSize >= 500000) {
      const confirmation = window.confirm(
        "Rendering that amount of items will work but it can take a while, do you want to continue?"
      );
      confirmation && this.generateNewList(desiredSampleSize);
    } else {
      this.generateNewList(desiredSampleSize);
    }
  };

  handleRemoveItem = index => {
    const { listItems } = this.state;

    this.setState({
      listItems: listItems.delete(index)
    });
  };

  render() {
    const { listItems, sampleSize } = this.state;
    return (
      <div className={styles.App}>
        <section>
          <Header
            sampleSize={sampleSize}
            handleSampleSizeChanged={this.handleSampleSizeChanged}
            handleGenerate={this.handleGenerate}
            handlereset={this.handlereset}
          />
        </section>
        <section className={styles.ListSection}>
          <div className={styles.ListBox}>
            <InverseList
              listItems={listItems}
              handleRemoveItem={this.handleRemoveItem}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
