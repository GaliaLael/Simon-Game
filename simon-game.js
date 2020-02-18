
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//*************************************************************************************************** */
// listener for start of game
$("#level-title").click(function() {
  if (!started) {
    $("#level-title").text("LEVEL " + level);
    nextSequence();
    started = true;
  }
});


// listener for user button clicks
$(".btn").click(function() {
  if (started) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
    checkAnswer(userClickedPattern.length-1);
  }
});


// checks user sequence against game sequence
function checkAnswer(currentLevel) {
    // compares user clicks agains coresponding game sequence value
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 800);
      }
    } else {
      // display sound and color of wrong click
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").html("game over!<br /><h2>RESTART</h2>");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 300);

      startOver();
    }
}


// generates next random sequence color
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("LEVEL " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  var i = 0;
  // play game sequence
  var myInterval = setInterval(function() {

    $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);

    i++;
    if(i == gamePattern.length) {
      clearInterval(myInterval);
    }
  }, 600);
}


// plays sound file
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// reset after wrong answer
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
