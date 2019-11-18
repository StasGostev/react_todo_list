import React, { Component } from "react";
import "../InfoPanel.css";

class InfoPanel extends Component {
  render() {
    return (
      <section className="info-panel">
        <span className="items-left">{this.props.left} items left</span>
        <span className="display">
          {["all", "completed", "active"].map(item => (
            <span
              onClick={() => this.props.displayChanged(item)}
              className={this.props.display === item ? "selected" : ""}
            >
              {item}
            </span>
          ))}
        </span>
        {this.props.completed ? <a href="{}" onClick={(event) => {
          event.preventDefault();
          this.props.remove();
        }}>Clear completed</a> : null}
      </section>
    );
  }
}

export default InfoPanel;
