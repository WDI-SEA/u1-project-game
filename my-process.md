1. Recreate flappy bird game
2. Have the user press the space bar button to float the bird.
3. bird must pass through the opennings between the columns
4. increase the score by 1 when the bird's position passes through columns
5. increasen speed each time bird's position passes through columns
6. game is over when bird position touchs top, bottom or columns
7. display restart btn when game is over


// THOUGHT PROCESS

This was the initial idea from the beginning. The idea came from with what I learned from the racing assignment. I used most of that as a template. The main goal was to create a game that was as challenging as possible. I tried to implement concepts of everything we've learned so far in this course. 


//APPROACH
Declare my variables.
Convert my position's varibles with parseInt, to use.
declare what my functions with be (startgame, endgame, moveup, movedown, collions)

Using setInterval to get the game moving.
	Create variable for pole's current position to be moved.
	If the bird is moving then multiple poles must be created. So bird must be static and poles must move.
	get the poles to move from right to left. 
	Make the poles reappear 
	Make poles reappear with random heights.
	Increase the speed poles reappear with random heights.
Make the bird float by manipulating its position top.
	declare functions (up and down)
	get the bird to move using a key
	declare setInterval to use 'keydown' to use spacebar to move bird's position 'top' up.
	declare 'keyup' to clearInterval. Making the bird fall when spacebar is not pressed.
	Nest the bird's position functions (up and down) into setInterval.
Create collisions to end the game
	declare borders to end game(top pole, bottom pole, top div, bottom div)
	find a method to return coordinates relative to document of my div (offset, outerHeight)
	end game if collision is true
update scoreboard
	when pole's current position is > container's width and the bird's position ++ to score
restart the game
	when game is over, reveal restart btn
	when clicked on btn, reload the game


//CHALLENGES/WINS

My biggest challenge was decided what I really wanted my game to be. I initially wanted to create a flappy bird game with a trivia twist. I couldn't figure out my wirefram and stick to it. Thus, restarting my game over and over again. I received some help to keep organized and focus on one thing at a time. Restarting my game over and over again helped me figure out new ways to use methods and functions. 





