import React, { Component } from "react";
import "../todo.css";
import TodoItem from "./TodoItem";
import MarkAll from "./MarkAll";
import InfoPanel from "./InfoPanel";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      items: [],
      nextId: 0,
      display: 'all'
    };
    this.newItemChanged = this.newItemChanged.bind(this);
    this.newItemKey = this.newItemKey.bind(this);
    this.statusChanged = this.statusChanged.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markAllChanged = this.markAllChanged.bind(this);
    this.displayChanged = this.displayChanged.bind(this);
    this.removeClicked = this.removeClicked.bind(this);
  }

  newItemKey(event) {
    if (event.key === "Enter" && this.state.input.trim() !== "") {
      this.setState(state => {
        const newItem = {
          title: state.input,
          id: state.nextId,
          completed: false
        };

        const newItems = [...state.items, newItem];

        return {
          items: newItems,
          nextId: state.nextId + 1,
          input: ""
        };
      });
    }
  }

  newItemChanged(event) {
    this.setState({
      input: event.target.value
    });
  }

  removeItem(itemId) {
    this.setState(state => {
      return {
        items: state.items.filter(item => item.id !== itemId)
      };
    });
  }

  markAllChanged(checked) {
    this.setState(state => {
      return {
        items: state.items.map(item => {
          return {
            title: item.title,
            id: item.id,
            completed: checked
          };
        })
      };
    });
  }

  statusChanged(completed, itemId) {
    this.setState(state => {
      return {
        items: state.items.map(item =>
          item.id === itemId
            ? {
                title: item.title,
                id: item.id,
                completed: completed
              }
            : item
        )
      };
    });
  }

  displayChanged(displayType) {
    this.setState({ display: displayType });
  }

  removeClicked() {
    this.setState((state) => {
      return {
        items: state.items.filter(item => !item.completed)
      }
    })
  }

  render() {
    return (
      <section className="todo">
        <input
          type="text"
          value={this.state.input}
          className="new-item"
          onChange={this.newItemChanged}
          onKeyDown={this.newItemKey}
        />
        <MarkAll
          checked={this.state.items.every(item => item.completed)}
          changed={this.markAllChanged}
        />
        <section className="items">
          {this.state.items
            .filter(
              item =>
                this.state.display === "all" ||
                (this.state.display === "completed" && item.completed) ||
                (this.state.display === "active" && !item.completed)
            )
            .map(item => (
              <TodoItem
                key={item.id}
                item={item}
                statusChanged={this.statusChanged}
                removeItem={this.removeItem}
              />
            ))}
        </section>
        <InfoPanel
          left={"" + this.state.items.filter(item => !item.completed).length}
          display={this.state.display}
          displayChanged={this.displayChanged}
          completed={this.state.items.some((item) => item.completed)}
          remove={this.removeClicked}
        />
      </section>
    );
  }
}

export default Todo;
