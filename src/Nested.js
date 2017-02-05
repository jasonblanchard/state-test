import React, { PureComponent } from 'react';

export default class Nested extends PureComponent {
  render() {
    return (
      <div>
        <h2>Inner</h2>
        <div>Counter: {this.props.app.counter}</div>
        <button onClick={() => this.props.actions.incrementAsync(2)}>click</button>
        <div>{this.props.app.isLoading ? 'loading...' : null}</div>
      </div>
    )
  }
}
