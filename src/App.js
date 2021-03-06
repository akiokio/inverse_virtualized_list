import React, { Component } from "react";
import { List } from "immutable";

import styles from "./App.module.scss";
import "./Common/elements.scss";

import Header from "./Header";
import InverseList from "./InverseList";

import { GetListData } from "./Api/ListAPI";
import { saveState, loadState } from "./Api/State";

class App extends Component {
  constructor(props) {
    super(props);

    const loadedState = loadState();
    this.state = loadedState;

    window.addEventListener("beforeunload", event => {
      this.handleSaveState();
    });
  }

  handleSaveState = () => {
    saveState(this.state);
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
    // Cooldown to avoid click spam
    setTimeout(() => {
      this.setState({
        generateButtonEnabled: true
      });
    }, 300);
  };

  handleGenerate = () => {
    this.setState({ generateButtonEnabled: false });
    const { sampleSize } = this.state;
    const desiredSampleSize = parseInt(sampleSize);
    if (!desiredSampleSize) {
      alert("Please provide a number");
      this.setState({ generateButtonEnabled: true });
    } else if (desiredSampleSize < 0) {
      alert("Please provide a positive number");
      this.setState({ generateButtonEnabled: true });
    } else if (desiredSampleSize >= 50000) {
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

  onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) return;

    const { listItems } = this.state;
    const copyList = List(listItems);
    const item = copyList.get(oldIndex);
    const newList = copyList.splice(oldIndex, 1).splice(newIndex, 0, item);

    this.setState({
      listItems: newList
    });
  };

  render() {
    const { listItems, sampleSize, generateButtonEnabled } = this.state;
    return (
      <div className={styles.App}>
        <section>
          <Header
            sampleSize={sampleSize}
            generateButtonEnabled={generateButtonEnabled}
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
              onSortEnd={this.onSortEnd}
              lockAxis="y"
              disableAutoscroll
            />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
