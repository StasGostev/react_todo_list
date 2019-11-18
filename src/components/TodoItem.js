import React, { Component } from "react";
import "../TodoItem.css";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.removeClickedItem = this.removeClickedItem.bind(this);
    this.completedChanged = this.completedChanged.bind(this);
  }

  completedChanged(event) {
    this.props.statusChanged(event.target.checked, this.props.item.id);
  }

  removeClickedItem(event) {
    this.props.removeItem(this.props.item.id);
    event.preventDefault();
  }

  render() {
    return (
      <p className="item">
        <label>
          <input
            type="checkbox"
            checked={this.props.item.completed}
            onChange={this.completedChanged}
          />
          <span className={this.props.item.completed ? "completed" : "active"}>
            {this.props.item.title}
          </span>
          <a href="{}" onClick={this.removeClickedItem} className="removed">
            &times;
          </a>
        </label>
      </p>
    );
  }
}

export default TodoItem;
