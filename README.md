# YK's Solution to Brainstation Code Challenge

Hello Brainstation! Here is my solution to the to-do app coding challenge.

## What it does and what you can do with it
- Add a Todo item
- List Todo items
- Toggle Todo items as complete using a checkbox
- Completed Todo items are greyed out with a strikethrough line through them
- A "Clear Complete" button removes all Todos that are marked as completed (this button is disabled if no Todos are done)

## Some technical discussions

### Class structure

I have three React classes in the app:
- App, which is the main class
- Item, which is the view for each to-do item
- NewToDoForm

I did not put the "clear complete" button in a separate class because the code for it is fairly simple.

### Data structure

The to-do items are stored in App as an array of objects, as in:
```
[{content: 'TODO Item 1', status: 'active'},
{content: 'TODO Item 2', status: 'complete'}]  
```

I chose this structure for simplicity and efficiency (rather than storing this as an array of React objects). I opted to store this in App because App needs to be able to update it as users take actions.

When a user clicks one of the checkboxes, we know which one they clicked through its index in the array. I thought of adding a unique ID separately, but using the array index as each item's unique ID seems to lead to a simpler implementation here.

### Immutability
I designed this app so that each state variable is immutable. I decided to do this in case I want to implement an undo/redo function, as well as for performance. (I'm not sure what the exact technical reason for this is, but I read that immutable objects are easier to keep track of: https://facebook.github.io/react/tutorial/tutorial.html#why-immutability-is-important)
