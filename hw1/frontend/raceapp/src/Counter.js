import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
class Counter extends Component {
  @observable count = 0;

  render() {
    return (
      <div>
        Counter: {this.count} <br />
        <button onClick={this.handleInc}> + </button>
        <button onClick={this.handleDecr}> - </button>
      </div>
    );
  }

  handleInc = () => {
    this.count++;
  };

  handleDecr = () => {
    this.count--;
  };
}

export default Counter;
