import React, { Component } from "react";
import PropTypes from "prop-types";
import { List as ImmutableList } from "immutable";

import ListItem from "../ListItem";
import NoRow from "../NoRows";

import {
  AutoSizer,
  List,
  CellMeasurerCache,
  CellMeasurer
} from "react-virtualized";

class InvertedList extends Component {
  static propTypes = {
    listItems: PropTypes.instanceOf(ImmutableList).isRequired
  };

  state = {
    scrollPosition: -1
  };

  cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 25
  });

  noRowsRenderer = () => <NoRow />;
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
      this.cache.clearAll();
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
      <AutoSizer>
        {({ width, height }) => (
          <List
            height={height}
            width={width}
            deferredMeasurementCache={this.cache}
            overscanRowCount={5}
            rowCount={listItems.size}
            rowHeight={this.cache.rowHeight}
            rowRenderer={this.rowRenderer}
            noRowsRenderer={this.noRowsRenderer}
            scrollToIndex={scrollPosition}
            onRowsRendered={this.handleRowsRendered}
            scrollToAlignment="end"
          />
        )}
      </AutoSizer>
    );
  }
}

export default InvertedList;
