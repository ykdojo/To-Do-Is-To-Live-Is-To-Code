import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [{content: 'TODO Item 1', status: 'active'}, {id: 1, content: 'TODO Item 2', status: 'complete'}],
    };
  }

  handleCheckboxChange() {
    // alert('hello');
  }

  render() {
    const itemsToShow = this.state.items.map((item) =>
    {
      return (
        <Item item={item} onCheckboxChange={this.handleCheckboxChange}/>
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
    const isChecked = this.props.item.status === 'complete' ? true : false;

    return (
      <li className={`todo-item ${this.props.item.status}`}>
        <input type="checkbox" checked={isChecked}
        onChange={this.props.onCheckboxChange}
        /> {this.props.item.content}
      </li>
    )
  }
}

export default App;
