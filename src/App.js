import React, { Component } from 'react';

function increment(step) {
  return function(handleAction, state) {
    handleAction({
      counter: state.counter + step
    });
  }
}

function setIsLoading(isLoading) {
  return function(handleAction) {
    handleAction({
      isLoading
    });
  }
}

function incrementAsync(step) {
  return function(handleAction, state) {
    setIsLoading(true)(handleAction);
    setTimeout(() => {
      increment(step)(handleAction, state);
      setIsLoading(false)(handleAction);
    }, 1000);
  }
}

function setState(state) {
  this.setState(state, () => {
    console.log(this.state);
  });
}

function bindActions(actions) {
  return context => {
    context.actions = {};

    Object.keys(actions).forEach(action => {
      context.actions[action] = args => {
        const handleAction = setState.bind(context);
        actions[action](args)(handleAction, context.state)
      }
    })
  }
}

import Nested from './Nested';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }

    bindActions({
      incrementAsync
    })(this);
  }

  render() {
    return (
      <div className="App">
        <h1>Outer</h1>
        <Nested actions={this.actions} app={this.state} />
      </div>
    );
  }
}

export default App;
