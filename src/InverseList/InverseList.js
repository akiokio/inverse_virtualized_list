import React, { Component, Fragment, createRef } from "react";
import PropTypes from "prop-types";
import { List as ImmutableList } from "immutable";
import {
  AutoSizer,
  List,
  CellMeasurerCache,
  CellMeasurer
} from "react-virtualized";
import { sortableContainer } from "react-sortable-hoc";

import ListItem from "../ListItem";
import NoRows from "../NoRows";

import styles from "./InverseList.module.scss";

class InverseList extends Component {
  static propTypes = {
    listItems: PropTypes.instanceOf(ImmutableList).isRequired,
    handleRemoveItem: PropTypes.func.isRequired
  };

  state = {
    shouldShowScrollToBottomButton: false
  };

  listRef = createRef();

  cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
    minHeight: 100
  });

  noRowsRenderer = () => <NoRows />;

  rowRenderer = ({ index, key, parent, style }) => {
    const { listItems, handleRemoveItem } = this.props;
    const item = listItems.get(index);
    const content = (
      <Fragment>
        <div>{item.get("content")}</div>
        <br />
        <div>
          <strong>Position on the generated batch: </strong>
          {item.get("localIndex")}
        </div>
      </Fragment>
    );
    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        <div style={style}>
          <ListItem
            index={index}
            handleRemove={handleRemoveItem}
            content={content}
          />
        </div>
      </CellMeasurer>
    );
  };

  componentDidUpdate(prevProps) {
    const { listItems } = this.props;
    if (!prevProps.listItems.equals(listItems)) {
      this.cache.clearAll();
      this.listRef.current.recomputeRowHeights();
      this.listRef.current.forceUpdate();
      if (listItems.size > prevProps.listItems.size) {
        this.listRef.current.scrollToRow(listItems.size);
      }
    }
  }

  handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    const { listItems } = this.props;
    const isAtTheBottom = clientHeight + scrollTop === scrollHeight;
    const shouldShowScrollToBottomButton =
      clientHeight > 0 && !isAtTheBottom && listItems.size > 0;
    this.setState({ shouldShowScrollToBottomButton });
  };

  handleScrollToButtom = () => {
    const { listItems } = this.props;
    this.listRef.current.scrollToRow(listItems.size);
  };

  render() {
    const { listItems } = this.props;
    const { shouldShowScrollToBottomButton } = this.state;
    return (
      <Fragment>
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={this.listRef}
              height={height}
              width={width}
              deferredMeasurementCache={this.cache}
              overscanRowCount={20}
              rowCount={listItems.size}
              rowHeight={this.cache.rowHeight}
              rowRenderer={this.rowRenderer}
              noRowsRenderer={this.noRowsRenderer}
              scrollToIndex={listItems.size}
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

export default sortableContainer(InverseList);
