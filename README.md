# Pomodoro Clock

 ## [Codepen](https://codepen.io/lezojeda/pen/oNvYNjr)

Project for the FreeCodeCamp ["Build a Pomodoro Clock"](https://learn.freecodecamp.org/front-end-libraries/front-end-libraries-projects/build-a-pomodoro-clock/) challenge from the Front End Libraries section.

The "index.js" file renders a single component (App) which has a state keeping track of:

* running: boolean indicating whether the clock is running or not
* stage: string indicating if the user is currently in a session or a break
* minutes: string indicating the minutes remaining
* seconds: string indicating the seconds remaining
* sessionLength : string indicating the session length as it changes when clicking the + or - button, its value is displayed below the time remaining in the webpage
* breakLength: same as before but with the break length

The component also has several methods:

* tick(): controls the general functionality of the clock
* handleStartSop(): start/stop button functionality
* handleReset(): resets state to default
* handleSessionLength() and handleBreakLength(): as their names indicate, both control the session and break length respectively through the +/- buttons 
