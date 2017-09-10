import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [{content: 'TODO Item 1', status: 'active'},
              {content: 'TODO Item 2', status: 'complete'}],
      newContent: '',
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewTodoFormChange = this.handleNewTodoFormChange.bind(this);
    this.handleClearComplete = this.handleClearComplete.bind(this);
  }

  handleCheckboxChange(event) {
    const target = event.target;
    const newStatus = target.checked ? 'complete' : 'active';
    const itemID = target.getAttribute('itemid');
    // Use Object.assign() instead of simply slice() to make a deep copy of
    // |items|, which is an array of objects.
    const items = this.state.items.map(item => Object.assign({}, item));
    items[itemID].status = newStatus;
    this.setState({
        items: items
    })
  }

  handleNewTodoFormChange(event) {
    this.setState({newContent: event.target.value});
  }

  handleSubmit(event) {
    const target = event.target;
    const newContent = this.state.newContent
    const items = this.state.items.map(item => Object.assign({}, item));
    this.setState({
        items: items.concat([{content: newContent, status: 'active'}]),
        newContent: '',
    });
  }

  // This method clears (delets) all items marked as "complete".
  handleClearComplete(event) {
    const items = this.state.items.map(item => Object.assign({}, item));
    const clearedItems = items.filter(item => item.status === 'active');
    this.setState({items: clearedItems});
  }

  render() {
    const itemsToShow = this.state.items.map((item, index) =>
    {
      return (
        <Item key={index} itemID={index} item={item} onCheckboxChange={this.handleCheckboxChange}/>
      );
    });

    // If no completed items exist, the clear complete button should be disabled.
    const completedItemsExist = this.state.items.some((item) =>
    {
      return item.status === 'complete';
    })

    return (
      <div>
        <ul>
          {itemsToShow}
        </ul>
        <NewTodoForm newContent={this.state.newContent} onChange={this.handleNewTodoFormChange} onSubmit={this.handleSubmit}/>
        <form onSubmit={this.handleClearComplete}>
          <input type="submit" value="Clear Complete" disabled={!completedItemsExist}/>
        </form>
      </div>
    );
  }
}

class Item extends Component {
  render() {
    const isChecked = this.props.item.status === 'complete' ? true : false;

    return (
      <li className={`todo-item ${this.props.item.status}`}>
        <input type="checkbox" checked={isChecked} itemID={this.props.itemID}
        onChange={this.props.onCheckboxChange}/>
        {this.props.item.content}
      </li>
    )
  }
}

class NewTodoForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <label>
        New TODO:
        <input type="text" value={this.props.newContent} onChange={this.props.onChange}/>
        </label>
        <input type="submit" value="Create" />
      </form>
    )
  }
}


export default App;
