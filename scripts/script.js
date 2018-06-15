/*
* Name:  Daniel Hope
* Assignment:  Assignment 8
* Date:  April 23, 2017
* 
* Page Description: This page includes all variables and functions to  
* allow the Pick-A-Pair game to work.
* 
* Files: index.html - source of the image container and basic HTML layout
*        style.css - source of the styles for the Pick-A-Pair game
*/


document.addEventListener("DOMContentLoaded", init);


// Initialize the imgMap array:
var pictureMap = new Array(1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 
       10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18);
       
// matchedImgs keeps track of which image elements have been matched so that 
// the user can't flip an image that has already been matched. This one 
// stores a boolean true if the image has been matched and false if it hasn't
// been matched, yet.
var matchedImgs = new Array();
var numMatches = 0;  // keeps track of # of matched pairs (18 max)

// the pair of image elements that was clicked: index 0 contains the first 
// image element that was clicked and index 1 contains the second image 
// element that was clicked
var clickedImgs = new Array(null, null); 

var okToClick = false;  // keep track of when it's ok to click during timer
var clickNum = 0; // first image click (0) or second image click (1)?
var flipTimer; // flips cards back after 2 seconds if no match
var gameTimer; // counts mins/seconds user is taking to finish
var gameTicker = 0;  // seconds counter for gameTimer

var moveCount = 0;  // move counter to show user how many moves to complete game

// start a new game
function init() {
    
    // scramble the images
    scramble();
    // it's ok to click an image
    okToClick = true;
    
    // reset all images to unmatched
    for (i = 0; i < 36; i++) {
        matchedImgs[i] = false;
    }
    
    
    // reusable counter for applying images and their id's
    var count = 0;
    
    // create rows for board
    for (var i = 0; i < 6; i++) {
        
        var elem = document.getElementById("board").insertRow(i);
        
        // fill each row with img elements, register elements with click
        //events, and give a unique id to img based on position
        for (var j = 0; j < 6; j++) {
            
            elem.insertCell(j).appendChild(document.createElement("img"));
            document.images[count].addEventListener("click", showPicture);
            document.images[count].id = "img" + count;
            document.images[count].src = "images/image0.png";
            
            // counter to be used for placement and id
            count++;
        } 
    }

    /** Start the game timer:  every second, the timeGame() function
     *  should execute, which causes the ticker on the page to increase.
     */
    gameTimer = window.setInterval(timeGame, 1000);
    
    /** Register the "message" dialog with a click event handler: when
     *  clicked, the showDialog(false) function should execute.
     */
    document.getElementById("message")
            .addEventListener("click", showDialog(false));
  
  
}

// Flips over an image when it's clicked: swaps the source of
// the image to its hidden picture.  The img param is the
// actual image that the user clicked on
function showPicture(img) {
    
    // get the picture# from this image's id (always "imgX" so
    // substring(3) starts at pos 3 and gives us the rest of the string)
    var index = this.id.substring(3);
    
    // if it's ok to click right now and this image is not already
    // matched
    if (okToClick && !matchedImgs[index]) {

        /** Change the image's source to the hidden picture associated
         *  with it (use the pictureMap() array)
         */
        this.src = "images/image" + pictureMap[index] + ".png";
        
        // The first click just reveals a hidden picture, and the 
        // second click determines if the first picture and second
        // picture match.
      
        // if this is the first image click
        if (clickNum === 0) {
            
            /**
             * Mark this image as having been clicked, set clickNum to 1 
             */
            clickedImgs[0] = index;
            clickNum = 1;
               
        } else { // this is the second image click
            
            /**
             * Mark this image as also having been clicked 
             */
            clickedImgs[1] = index;
            moveCount++;
            
            /** If the two clickedImgs are referencing the same picture
             *  file, they are a match 
             *  increment the number of matches made so far
             *  set a timer to invoke the flip() method in 100 milliseconds
             *  if the images are not a match, execute the flip()
             * 
             */
           
            if (pictureMap[clickedImgs[0]] === pictureMap[clickedImgs[1]]) {
                matchedImgs[clickedImgs[0]] = true;
                matchedImgs[clickedImgs[1]] = true;
                numMatches++;
                window.setTimeout(flip, 100);
            } else
                window.setTimeout(flip, 2000);
           
            // reset clickNum so that we can start over with
            // a new pair of picturese
            clickNum = 0;
            // don't allow clicking until flip() is done
            okToClick = false;
                        
        } // end of if/else 1st/2nd image click
    } // end of if it's ok to click and the image isn't a matched one
} // function showPicture()

// Flips the images back over if there's no match and check to 
// see if the game is finished.
function flip() {
    
    /** If the clickedImages aren't the same,
     *  show the image0.png card back. 
     */
    if (document.getElementById("img" + clickedImgs[0]).src !== 
            document.getElementById("img" + clickedImgs[1]).src) {
        document.getElementById("img" + clickedImgs[0])
                .src = "images/image0.png";
        document.getElementById("img" + clickedImgs[1])
                .src = "images/image0.png";
    }
    // it's ok to click again
    okToClick = true;
    
    /** If we've reached 18 matches, the game is finished.
     *  display "Good Game! You finished in " followed by the elapsed time 
     * invoke the showDialog(true) function to show the message dialog
     * stop the game timer
     */
    
    if (numMatches === 18) {
        
        // locate element to add listener event to
        var elem = document.getElementById("winner");
        
        // add listener event to message dialog so it will disappear when
        // clicked
        elem.addEventListener("click", 
            function clearWindow(){ showDialog(false);});
            
        // add/display message to user at end of game, showing time and number
        // of moves taken to complete
        elem.innerHTML = "Good Game! You finished in "
                + document.getElementById("ticker").innerHTML + 
                " Total Moves: " + moveCount;
        showDialog(true);
        
        // stop game timer when all matches have been made(game is finished)
        clearInterval(gameTimer); 
        
        // disable clicking when game has finished
        okToClick = false;
        
        // add button to message dialog and register a click event that will
        // trigger a reload so player can play game again
        elem = document.createElement("button");
        
        elem.addEventListener("click",
            function reloadGame(){ window.location.reload(); });
        
        document.getElementById("message").appendChild(elem);
        
        elem.appendChild(document.createTextNode("Click Here to Play Again")); 
    }
}


// Executes once per second: updates the ticker on the page
// with the current time elapsed.
function timeGame() {
    
    // increment the ticker
    gameTicker++;
    
    // get the minutes and seconds and display
    // in the ticker element
    var minutes = Math.floor(gameTicker/60);
    var seconds = gameTicker % 60;
    var output = minutes + ":";
    output += (seconds <= 9) ? "0" + seconds : seconds;
    document.getElementById("ticker").innerHTML = output;
}

// Scambles/shuffles the pictures in the pictureMap by swapping each
// picture with another picture chosen at random.  Repeats the process
// to sufficiently scramble the pictures.
function scramble() {
    
    // do this 5 times for good measure
    for (n = 0; n < 5; n++) {
        
        // swap each cell's img# with a random one
        for (i = 0; i < 36; i++) {
            
            // choose a picture at random
            var random = Math.floor(Math.random() * 36);
            var picNum = pictureMap[random];
            
            // swap the current picture with the random one
            var temp = pictureMap[i];
            pictureMap[i] = picNum;
            pictureMap[random] = temp;
        }
    }
}

// Shows or hides the message box.
function showDialog(show) {
    if (show) {
        document.getElementById("overlay").style.display = "block";
        document.getElementById("message").style.display = "block";
    } else {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("message").style.display = "none";
    }
}
