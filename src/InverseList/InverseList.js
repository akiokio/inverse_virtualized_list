import React, { Component } from "react";
import PropTypes from "prop-types";
import { List as ImmutableList } from "immutable";

import ListItem from "../ListItem";
import NoRows from "../NoRows";

import {
  AutoSizer,
  List,
  CellMeasurerCache,
  CellMeasurer
} from "react-virtualized";

class InverseList extends Component {
  static propTypes = {
    listItems: PropTypes.instanceOf(ImmutableList).isRequired
  };

  state = {
    scrollPosition: -1
  };

  cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 50
  });

  noRowsRenderer = () => <NoRows />;
  rowRenderer = ({ index, key, parent, style }) => {
    const { listItems, handleRemoveItem } = this.props;
    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {({ measure }) => {
          return (
            <ListItem
              style={style}
              item={listItems.get(index)}
              index={index}
              handleRemove={handleRemoveItem}
            />
          );
        }}
      </CellMeasurer>
    );
  };

  // shouldComponentUpdate(nextProps) {
  //   const { listItems } = this.props;
  //   return !nextProps.listItems.equals(listItems) ? true : false;
  // }

  componentDidUpdate(prevProps) {
    const { listItems } = this.props;
    if (!prevProps.listItems.equals(listItems)) {
      this.cache.clearAll();
      this.setState({ scrollPosition: listItems.size - 1 });
    }
  }

  render() {
    const { listItems } = this.props;
    const { scrollPosition } = this.state;
    console.log("render");
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

export default InverseList;
