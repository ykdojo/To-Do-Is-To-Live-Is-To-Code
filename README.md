# YK's Solution to BrainStation Code Challenge

Hello BrainStation! Here is my solution to the to-do app coding challenge.

## What it does and what you can do with it
- Add a Todo item
- List Todo items
- Toggle Todo items as complete using a checkbox
- Completed Todo items are greyed out with a strikethrough line through them
- A "Clear Complete" button removes all Todos that are marked as completed (this button is disabled if no Todos are done)

---

## Technical discussions

### Class structure

I have three React classes in the app:
- **App**, which is the main class
- **Item**, which is the view for each to-do item
- **NewToDoForm**

I did not put the "clear complete" button in a separate class because the code for it is fairly simple.

### Data structure

The to-do items are stored in **App** as an array of objects, as in:
```
[{content: 'TODO Item 1', status: 'active'},
{content: 'TODO Item 2', status: 'complete'}]  
```

I chose this structure for simplicity and efficiency (rather than storing this as an array of React objects). I opted to store this in **App** because **App** needs to be able to update it as the user takes actions.

When a user clicks one of the checkboxes, we know which one they clicked through its index in the array. I thought of adding a unique ID separately, but using the array index as each item's unique ID seems to lead to simpler implementation here.

Since we don't have a manually-generated unique key for each item, React gives us a warning. Fixing this issue will be for future improvement, especially if performance becomes a problem.


### Immutability
I designed this app so that each state variable is immutable. I decided to do this in case I want to implement an undo/redo function later, as well as for performance. (I'm not familiar with the exact technical reason for this, but I read that immutable objects are easier to keep track of: https://facebook.github.io/react/tutorial/tutorial.html#why-immutability-is-important)
