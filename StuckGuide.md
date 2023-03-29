# SPOILERS IN THIS FILE ONLY READ THIS IS YOU ARE COMPLETELY STUCK AND HAVE NO IDEA WHERE TO PROGRESS

## Step-by-Step Guide

Here is a step-by-step guide on how to create this game:

1. Set up the game grid using HTML and CSS.

- Create a `<div>` element to act as the game grid.
- Use CSS to style the grid with a specified number of rows and columns.
- Create a CSS class to represent the cards, and style them with a background color and border radius.
- Create CSS classes to represent the flipped and matched states of the cards, and add corresponding styles.

2. Create a deck of cards with random values.

- Create an array of values to represent the card values.
- Use a loop to create pairs of cards with the same value, and push them into a cards array.
- Use the Math.random() method to shuffle the cards array.
- Loop through the cards array and create corresponding HTML elements for each card, and add them to the game grid.

3. Add click event listeners to handle card flips.

- Add a click event listener to each card element.
- When a card is clicked, use the classList.add() method to add the flipped class to the card element.
- Store the currently flipped cards in an array.

4. Add game logic to check for matching pairs.

- When two cards are flipped, compare their values to see if they match.
- If they match, use the classList.add() method to add the matched class to each card element.
- Increment the player's score.
- Clear the currently flipped cards array.

5. Add game logic to handle incorrect matches.

- If two flipped cards do not match, use the setTimeout() function to wait for a short period of time before flipping them back over.
- When flipping the cards back over, use the classList.remove() method to remove the flipped class from each card element.
- Decrement the player's score.
- Clear the currently flipped cards array.

6. Add game logic to check for game over.

- When all pairs have been matched, display a message to the player with their final score.
- Add a condition to prevent the player from flipping cards after the game is over.
