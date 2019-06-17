import React from "react";
import { shallow } from "enzyme";
import { List } from "immutable";

import App from "./App";

import Header from "./Header";
import InverseList from "./InverseList";

jest.useFakeTimers();

const mockAlert = jest.fn();
const mockConfirm = jest.fn().mockReturnValue(true);
window.alert = mockAlert;
window.confirm = mockConfirm;

describe("App", () => {
  const wrapper = shallow(<App />);

  describe("before leaving the page", () => {
    it("should call saveState", () => {
      const spy = jest.spyOn(wrapper.instance(), "handleSaveState");
      window.dispatchEvent(new Event("beforeunload"));
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("render", () => {
    it("should render a header component", () => {
      expect(wrapper.find(Header)).toHaveLength(1);
    });

    it("should render a inverse list", () => {
      expect(wrapper.find(InverseList)).toHaveLength(1);
    });

    it("should start with generate button enabled", () => {
      expect(wrapper.state("generateButtonEnabled")).toBeTruthy();
    });
  });

  describe("events", () => {
    describe("handleSampleSizeChanged", () => {
      it("should update the state", () => {
        wrapper
          .instance()
          .handleSampleSizeChanged({ target: { value: "122" } });
        expect(wrapper.state("sampleSize")).toEqual("122");
      });
    });

    describe("handlereset", () => {
      it("should update the state", () => {
        wrapper.instance().handlereset();
        expect(wrapper.state("sampleSize")).toEqual("");
        expect(wrapper.state("listItems").size).toEqual(0);
      });
    });

    describe("generateNewList", () => {
      it("generateNewList should add more items to the list", () => {
        wrapper.instance().generateNewList(2);
        jest.runAllTimers();
        expect(wrapper.state("listItems").size).toEqual(2);
        expect(wrapper.state("generateButtonEnabled")).toBeTruthy();
      });
    });

    describe("handleGenerate", () => {
      describe("no sample size", () => {
        it("should disable generate button", () => {
          wrapper.setState({ sampleSize: "" });
          wrapper.instance().handleGenerate();
          expect(wrapper.state("generateButtonEnabled")).toBeTruthy();
          expect(mockAlert).toHaveBeenCalledWith("Please provide a number");
        });
      });

      describe("with negative number", () => {
        it("should disable generate button", () => {
          wrapper.setState({ sampleSize: "-11" });
          wrapper.instance().handleGenerate();
          expect(wrapper.state("generateButtonEnabled")).toBeTruthy();
          expect(mockAlert).toHaveBeenCalledWith(
            "Please provide a positive number"
          );
        });
      });

      describe("normal number of items", () => {
        it("should call generate new list", () => {
          const mockGenerateNewList = jest.fn();
          wrapper.instance().generateNewList = mockGenerateNewList;
          wrapper.setState({ sampleSize: "100" });
          wrapper.instance().handleGenerate();
          expect(wrapper.state("generateButtonEnabled")).toBeFalsy();
          expect(mockGenerateNewList).toHaveBeenCalled();
        });
      });

      describe("with a big number", () => {
        it("should call generate new list", () => {
          const mockGenerateNewList = jest.fn();
          wrapper.instance().generateNewList = mockGenerateNewList;
          wrapper.setState({ sampleSize: "50000" });
          wrapper.instance().handleGenerate();
          expect(wrapper.state("generateButtonEnabled")).toBeFalsy();
          expect(mockConfirm).toHaveBeenCalledWith(
            "Rendering that amount of items will work but it can take a while, do you want to continue?"
          );
          expect(mockGenerateNewList).toHaveBeenCalled();
        });
      });
    });

    describe("handleRemoveItem", () => {
      beforeAll(() => {
        wrapper.setState({
          listItems: List([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }])
        });
      });

      it("should remove item at index", () => {
        wrapper.instance().handleRemoveItem(2);
        expect(wrapper.state("listItems").size).toEqual(3);
        expect(wrapper.state("listItems").get(2)).toEqual({ id: 4 });
      });
    });

    describe("onSortEnd", () => {
      const initialList = List([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
      beforeAll(() => {
        wrapper.setState({
          listItems: initialList
        });
      });

      it("should not reorder the list", () => {
        wrapper.instance().onSortEnd({ oldIndex: 2, newIndex: 2 });
        expect(wrapper.state("listItems")).toEqual(initialList);
      });

      it("should reorder the list", () => {
        wrapper.instance().onSortEnd({ oldIndex: 1, newIndex: 3 });
        expect(wrapper.state("listItems")).toEqual(
          List([{ id: 1 }, { id: 3 }, { id: 4 }, { id: 2 }])
        );
      });
    });
  });
});
