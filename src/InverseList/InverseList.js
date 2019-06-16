import React, { Component, Fragment, createRef } from "react";
import PropTypes from "prop-types";
import { List as ImmutableList } from "immutable";
import {
  AutoSizer,
  List,
  CellMeasurerCache,
  CellMeasurer
} from "react-virtualized";

import ListItem from "../ListItem";
import NoRows from "../NoRows";

import styles from "./InverseList.module.scss";

class InverseList extends Component {
  static propTypes = {
    listItems: PropTypes.instanceOf(ImmutableList).isRequired,
    handleRemoveItem: PropTypes.func.isRequired
  };

  state = {
    scrollPosition: -1,
    shouldShowScrollToBottomButton: false
  };

  listRef = createRef();

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

  handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    const isAtTheBottom = clientHeight + scrollTop === scrollHeight;
    this.setState({ shouldShowScrollToBottomButton: !isAtTheBottom });
  };

  handleScrollToButtom = () => {
    const { listItems } = this.props;
    this.listRef.current.scrollToRow(listItems.size);
  };

  render() {
    const { listItems } = this.props;
    const { scrollPosition, shouldShowScrollToBottomButton } = this.state;
    console.log("render");
    return (
      <Fragment>
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={this.listRef}
              height={height}
              width={width}
              deferredMeasurementCache={this.cache}
              overscanRowCount={10}
              rowCount={listItems.size}
              rowHeight={this.cache.rowHeight}
              rowRenderer={this.rowRenderer}
              noRowsRenderer={this.noRowsRenderer}
              scrollToIndex={scrollPosition}
              onRowsRendered={this.handleRowsRendered}
              onScroll={this.handleScroll}
              scrollToAlignment="end"
            />
          )}
        </AutoSizer>
        {shouldShowScrollToBottomButton && (
          <button
            onClick={this.handleScrollToButtom}
            className={styles.ScrolltoBottomButton}
          >
            Return to bottom
          </button>
        )}
      </Fragment>
    );
  }
}

export default InverseList;
