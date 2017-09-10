import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [{content: 'TODO Item 1', status: 'active'},
              {content: 'TODO Item 2', status: 'complete'}],
      newContent: '',
      mode: 'all'
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleClickOnItem = this.handleClickOnItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewTodoFormChange = this.handleNewTodoFormChange.bind(this);
    this.handleClearComplete = this.handleClearComplete.bind(this);
    this.handleSwitchModes = this.handleSwitchModes.bind(this);
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

  // If an item is clicked, even if the user clicks on it without hitting the
  // checkbox, we should still toggle the state (slightly better UX this way).
  handleClickOnItem(event) {
    const target = event.target;
    const itemID = target.getAttribute('itemid');
    const items = this.state.items.map(item => Object.assign({}, item));
    items[itemID].status = items[itemID].status === 'active' ? 'complete' : 'active';
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
    event.preventDefault();
  }

  // This method clears (delets) all items marked as "complete".
  handleClearComplete(event) {
    const items = this.state.items.map(item => Object.assign({}, item));
    const clearedItems = items.filter(item => item.status === 'active');
    this.setState({items: clearedItems});
    event.preventDefault();
  }

  // This is a method for switching modes (All, In Progress and Complete).
  handleSwitchModes(event) {
    const target = event.target;
    this.setState({mode: event.target.name});
    event.preventDefault();
  }

  render() {
    const mode = this.state.mode;
    const allItems = this.state.items;
    const filteredItems = mode === 'all' ? allItems : allItems.filter((item) =>
      item.status === mode
    )

    const itemsToShow = filteredItems.map((item, index) =>
    {
      return (
        <Item itemID={index} item={item}
          onCheckboxChange={this.handleCheckboxChange}
          onClick={this.handleClickOnItem}/>
      );
    });

    // If no completed items exist, the clear complete button should be disabled.
    const completedItemsExist = this.state.items.some((item) => {
      return item.status === 'complete';
    });

    // Set class names for Twitter Bootstrap.
    let allButtonClass = "btn-secondary";
    let activeButtonClass = "btn-secondary";
    let completeButtonClass = "btn-secondary";
    if (this.state.mode == "all") {
      allButtonClass = "btn-primary";
    } else if (this.state.mode == "active") {
      activeButtonClass = "btn-primary";
    } else if (this.state.mode == "complete") {
      completeButtonClass = "btn-primary";
    }

    return (
      <div className="app-main">
        <div className="text-center">
          <button name="all" className={`btn btn-sm ${allButtonClass} todo-mode-button`} onClick={this.handleSwitchModes}>All</button>
          <button name="active"className={`btn btn-sm ${activeButtonClass} todo-mode-button`} onClick={this.handleSwitchModes}>In Progress</button>
          <button name="complete" value="Completed" className={`btn btn-sm ${completeButtonClass} todo-mode-button`} onClick={this.handleSwitchModes}>Completed</button>
        </div>
        <ul className="list-group todo-list-group">
          {itemsToShow}
        </ul>
        <NewTodoForm newContent={this.state.newContent} onChange={this.handleNewTodoFormChange} onSubmit={this.handleSubmit}/>
        <form onSubmit={this.handleClearComplete} className="clear-complete-button text-right">
          <input type="submit" value="Clear Complete" disabled={!completedItemsExist} className="btn btn-info btn-sm"/>
        </form>
      </div>
    );
  }
}

class Item extends Component {
  render() {
    const isComplete = this.props.item.status === 'complete'
    // If the item has already been completed, the checkbox should be checked.
    const isChecked = isComplete ? true : false;

    return (
      <li className={`todo-item todo-${this.props.item.status} list-group-item`}
        onClick={this.props.onClick} itemID={this.props.itemID}>
          <input type="checkbox" checked={isChecked} itemID={this.props.itemID}
            className="todo-checkbox" onChange={this.props.onCheckboxChange}/>
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
        <input type="text" className="new-todo-form" value={this.props.newContent} onChange={this.props.onChange} placeholder="Enter your to-do item here"/>
        </label>
        <input type="submit" value="Create" className="btn btn-primary btn-sm"/>
      </form>
    )
  }
}


export default App;
