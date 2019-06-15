import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { List as ImmutableList } from "immutable";

import ListItem from "../ListItem";

import {
  List,
  CellMeasurerCache,
  CellMeasurer,
  WindowScroller
} from "react-virtualized";

class InvertedList extends Component {
  static propTypes = {
    listItems: PropTypes.instanceOf(ImmutableList).isRequired
  };

  listRef = createRef();

  state = {
    scrollPosition: -1
  };

  cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 25
  });

  noRowsRenderer = () => <div>Select the number of rows to start</div>;
  rowRenderer = ({ index, key, parent, style }) => {
    const { listItems } = this.props;
    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {({ measure }) => {
          return <ListItem style={style} item={listItems.get(index)} />;
        }}
      </CellMeasurer>
    );
  };

  componentDidUpdate(prevProps) {
    const { listItems } = this.props;
    if (!prevProps.listItems.equals(listItems)) {
      console.log("list is different");
      this.cache.clearAll();
      this.listRef.current.scrollToRow(listItems.size);
    }
  }

  handleRowsRendered = () => {
    const { listItems } = this.props;
    this.setState({ scrollPosition: listItems.size });
  };

  render() {
    const { listItems } = this.props;
    const { scrollPosition } = this.state;
    return (
      <WindowScroller>
        {({ height }) => (
          <List
            ref={this.listRef}
            height={height}
            width={300}
            deferredMeasurementCache={this.cache}
            overscanRowCount={0}
            rowCount={listItems.size}
            rowHeight={this.cache.rowHeight}
            rowRenderer={this.rowRenderer}
            noRowsRenderer={this.noRowsRenderer}
            scrollToIndex={scrollPosition}
            onRowsRendered={this.handleRowsRendered}
            scrollToAlignment="end"
          />
        )}
      </WindowScroller>
    );
  }
}

export default InvertedList;
