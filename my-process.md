# Technologies used.
HTML/CSS/Javascript/JQuery

# Process/approach.
I first started with the computer's guessing logic. After randomly guessing, it had to be able to make better guesses after finding a hit. To accomplish that, Whenever a computer logs a hit, it annotates all the spaces near it as being "near hits". Since the goats are grouped in three's, these "near hits" are the highest probability of being another goat. It then scans through looking for near hits and guessing there. If there are no current near hits, it'll go back to guessing randomly.

Once the computer could guess for a preprogrammed player board, I added functionality to allow the player to place their own goats. The players selections are recorded on a 2D array, which is what the computer scans.

After that, all that was remaining was the UI.

# Installation instructions.
Open game in browser.

# Unsolved problems.
The computer is still not very smart. It's pretty hard to lose to it. A smarter computer seems really hard to make though.

# Your biggest wins and challenges.
Creating an algorithm that would do more than just guess randomly was the biggest challenge. Biggest win: Danny DeVito gif.
