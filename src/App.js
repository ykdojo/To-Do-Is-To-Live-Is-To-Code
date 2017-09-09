import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [{content: 'TODO Item 1', status: 'active'},
              {content: 'TODO Item 2', status: 'complete'}],
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange(event) {
    const target = event.target;
    const newStatus = target.checked ? 'complete' : 'active';
    const itemID = target.getAttribute('itemid');
    // Use Object.assign() instead of simply slice() to make a deep copy of
    // |items|, which is an array of objects.
    const items = this.state.items.map(o => Object.assign({}, o));
    items[itemID].status = newStatus;
    this.setState({
        items: items
    })
  }

  render() {
    const itemsToShow = this.state.items.map((item, index) =>
    {
      return (
        <Item key={index} itemID={index} item={item} onCheckboxChange={this.handleCheckboxChange}/>
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
        <input type="checkbox" checked={isChecked} itemID={this.props.itemID}
        onChange={this.props.onCheckboxChange}
        /> {this.props.item.content}
      </li>
    )
  }
}

export default App;
