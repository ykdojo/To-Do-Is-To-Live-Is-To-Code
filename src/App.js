import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    // NOTE: to-do items will be stored in |items| in the form of:
    // [{content: 'To-Do Item 1', status: 'active'},
    // {content: 'To-Do Item 2', status: 'complete'}, ...]
    this.state =  {
      items: [],
      newContent: '',
      mode: 'all' // 'all', 'active', or 'complete'. TODO: put put this in enum.
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewTodoFormChange = this.handleNewTodoFormChange.bind(this);
    this.handleClearComplete = this.handleClearComplete.bind(this);
  }

  handleCheckboxChange(itemID, event) {
    const target = event.target;
    const newStatus = target.checked ? 'complete' : 'active';
    // Use Object.assign() instead of simply slice() to make a deep copy of
    // |items|, which is an array of objects. (For maintaining immutability.)
    const items = this.state.items.map(item => Object.assign({}, item));
    items[itemID].status = newStatus;
    this.setState({items: items});
  }

  // If an item is clicked, even if the user clicks on it without hitting the
  // checkbox, we should still toggle the state (slightly better UX this way).
  handleClickOnItem(itemID) {
    const items = this.state.items.map(item => Object.assign({}, item));
    items[itemID].status =
      items[itemID].status === 'active' ? 'complete' : 'active';
    this.setState({items: items});
  }

  handleNewTodoFormChange(event) {
    this.setState({newContent: event.target.value});
  }

  // This is the handler for creating a new to-do item.
  handleSubmit(event) {
    const newContent = this.state.newContent;
    const items = this.state.items.map(item => Object.assign({}, item));
    this.setState({
        items: items.concat([{content: newContent, status: 'active'}]),
        newContent: '',
    });
    event.preventDefault();
  }

  // This method clears (deletes) all items marked as "complete".
  handleClearComplete(event) {
    const items = this.state.items.map(item => Object.assign({}, item));
    const clearedItems = items.filter(item => item.status === 'active');
    this.setState({items: clearedItems});
    event.preventDefault();
  }

  // This is a method for switching modes ('all', 'active', and 'complete').
  handleSwitchModes(mode) {
    this.setState({mode: mode});
  }

  render() {
    // We need to use reduce() instead of filer() and map() here so we can
    // preserve each item's unique index (the array index).
    // Once we have a proper unique index, this part will be slihgtly simpler.
    const mode = this.state.mode;
    const itemsToShow = this.state.items.reduce((filteredItems, item, index) =>
    {
      if (mode === 'all' || item.status === mode) {
        filteredItems.push(
          <Item item={item}
            onCheckboxChange={(e) => this.handleCheckboxChange(index, e)}
            onClick={() => this.handleClickOnItem(index)}/>
        );
      }
      return filteredItems;
    }, []);

    // If no completed items exist, the clear complete button should be disabled.
    const completedItemsExist = this.state.items.some((item) => {
      return item.status === 'complete';
    });

    // Set class names for Twitter Bootstrap.
    let allButtonClass = "btn-secondary";
    let activeButtonClass = "btn-secondary";
    let completeButtonClass = "btn-secondary";
    if (mode === "all") {
      allButtonClass = "btn-primary";
    } else if (mode === "active") {
      activeButtonClass = "btn-primary";
    } else if (mode === "complete") {
      completeButtonClass = "btn-primary";
    }

    return (
      <div className="app-main">
        <div className="text-center">
          <div className="app-title">Daily Focus TODO</div>
        </div>

        <div className="text-center">
          <button className={`btn btn-sm ${allButtonClass} todo-mode-button`}
            onClick={() => this.handleSwitchModes('all')}>All</button>
          <button className={`btn btn-sm ${activeButtonClass} todo-mode-button`}
            onClick={() => this.handleSwitchModes('active')}>In Progress</button>
          <button className={`btn btn-sm ${completeButtonClass} todo-mode-button`}
          onClick={() => this.handleSwitchModes('complete')}>Completed</button>
        </div>
        {
          itemsToShow.length === 0 && this.state.mode !== 'complete' ? (
            <div className="alert alert-success" role="alert">
              <strong>Hooray!</strong> No TODO items left here.
            </div>
          ) : (
            <ul className="list-group todo-list-group">
              {itemsToShow}
            </ul>
          )
        }
        <NewTodoForm newContent={this.state.newContent}
          onChange={this.handleNewTodoFormChange} onSubmit={this.handleSubmit}/>
        <form onSubmit={this.handleClearComplete}
          className="clear-complete-button text-right">
          <input type="submit" value="Clear Complete"
            disabled={!completedItemsExist} className="btn btn-info btn-sm"/>
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
        onClick={this.props.onClick}>
          <input type="checkbox" checked={isChecked}
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
          <input type="text" className="new-todo-form"
            value={this.props.newContent} onChange={this.props.onChange}
            placeholder="Enter your to-do item here"/>
        </label>
        <input type="submit" value="Create" className="btn btn-primary btn-sm"/>
      </form>
    )
  }
}


export default App;
