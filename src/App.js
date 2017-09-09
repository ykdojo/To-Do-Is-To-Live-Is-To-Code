import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [{content: 'TODO Item 1'}, {id: 1, content: 'TODO Item 2'}],
    };
}

  render() {
    const itemsToShow = this.state.items.map((item) =>
    {
      return (
        <Item item={item}/>
        );
    });

    return (
      <ul>
        {itemsToShow}
      </ul>
    );
  }
}

class Item extends Component {
  render() {
    return (
      <li>
        {this.props.item.content}
          </li>
    )
  }
}

export default App;
