# Daily Focus TODO

Hello BrainStation! Here is my solution to the to-do app coding challenge. I call it **Daily Focus TODO** because it's designed for listing things you need to get done each day.

## What it does and what you can do with it
- Add a Todo item
- List Todo items
- Toggle Todo items as complete using a checkbox
- Completed Todo items are greyed out with a strikethrough line through them
- A "Clear Complete" button removes all Todos that are marked as completed (this button is disabled if no Todos are done)
- A filter that will display All/Incomplete/Complete todos based on what option is selected.

---
## Focus on usability

After completing the minimum requirements, I decided to put a lot of focus and effort into **usability and UI**. This is because  I wanted to make something I would want to use personally.

You'll notice that, for example:
- I used Twitter Bootstrap and some custom CSS to make the app look pretty.
- You don't have to click the checkbox to complete an item. You can click anywhere on the item (more technical discussion about this below).
- On your laptop or desktop, once you enter a to-do item's content, you can just press Enter to add it to the list.
- I designed this for both my phones (iPhone 5S and Pixel) and laptop in mind, so you'll notice that the width of the app might seem somewhat narrow on a computer. I should ideally make it responsive, but for now, changing the zoom setting on your browser (Cmd and + or Ctrl and +) should make it easier to use the app.
[iPhone Screenshot](https://raw.githubusercontent.com/yksugi/To-Do-Is-To-Live-Is-To-Code/master/iphone_screenshot.PNG)


---
## Ideas for future improvement
- When the text is too long, it moves to the next line. It works just fine, but ideally it should be in the same line as the checkbox.
- To-do items should be editable.
- Add counts for in-progress and complete tasks for extra motivation.

---
## Technical discussions

### Class structure

I have three React classes in the app:
- **App**, which is the main class
- **Item**, which is the view for each to-do item
- **NewToDoForm**

I did not put the "clear complete" button in a separate class because the code for it is fairly simple. The same goes for the mode switching buttons (Active, In Progress, and Completed).

### Data structure

The to-do items are stored in **App** as an array of objects, as in:
```
[{content: 'TODO Item 1', status: 'active'},
{content: 'TODO Item 2', status: 'complete'}, ...]
```

I chose this structure for simplicity and efficiency (rather than storing this as an array of React objects). I opted to store this in **App** because **App** needs to be able to update it as the user takes actions.

When a user clicks one of the checkboxes, we know which one they clicked through its index in the array. I thought of adding a unique ID separately, but using the array index as each item's unique ID seems to lead to simpler implementation here.

Since we don't have a manually-generated unique key for each item, React gives us a warning. Fixing this issue will be for future improvement, especially if performance becomes a problem.


### Immutability
I designed this app so that each state variable is immutable. I decided to do this in case I want to implement an undo/redo function later, as well as for performance. (I'm not familiar with the exact technical reason for this, but I read that immutable objects are easier to keep track of: https://facebook.github.io/react/tutorial/tutorial.html#why-immutability-is-important)


### Clicking on checkbox vs. list item
As I mentioned above, you can click on either a checkbox or a list item to complete an item. So, I have two separate handlers for this, but perhaps the click handler on a list item alone is enough, since when I click on the checkbox, both of these handlers are called. I kept both of these handlers just in case it is possible for a user to change the content of a checkbox without "clicking" it, but I'm not sure if it is possible.
