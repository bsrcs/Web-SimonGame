// create colors array
var buttonColors = ["red", "blue", "green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
//You'll need a way to keep track of whether if the game has started or not, 
//so you only call nextSequence() on the first keypress.
var started = false;
var level = 0;

//when a keyboard key has been pressed, when that happens for the first time, call nextSequence()
$(document).keydown(function () { 
    if(!started){
        // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0"
        $("#level-title").html("Level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    // check if the most recent user answer is the same as the game pattern
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        // check that they have finished their sequence 
        if(userClickedPattern.length == gamePattern.length){
            //Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        
        // when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

        $("#level-title").html("Game Over, Press Any Key to Restart");
        //2. Call startOver() if the user gets the sequence wrong.
        startOver();
    }
}


// if game has started,  call nextSequence() on the first keypress.
function nextSequence() { 
    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
    //increase the level by 1 every time nextSequence() is called.
    level++;
    //update the h1 with this change in the value of level.
    $("#level-title").html("Level "+level);
   
    // generate random numbers between 0 and 3 
    var randomNumber = Math.floor(Math.random()*4);
    //choose a random color
    var randomChosenColor = buttonColors[randomNumber];
    // add the random chosen color to array
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);    
    playSound(randomChosenColor);
}


function playSound(name){
    //when a user clicks on a button, the corresponding sound will be played.
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}


function animatePress(currentColour) { 
    //add pressed class to the button that gets clicked 
    //pressed class adds a box shadow and changes the background colour to grey.
    $("#"+ currentColour).addClass("pressed");
    // remove the pressed class after a 100 milliseconds 
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    }, 100)
 }


 function startOver(){
    // reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
 }
