var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
var game_started = 0;
var level = 0;
//-------------------------------------------------
$(document).keypress(function() {
  if (game_started == 0) {
    game_started = 1;
    $("#level-title").text("Level " + level);

    nextSequence();


  }

})

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern) //delete;

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length);
})

//------------------------------------------------------------
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel - 1] == gamePattern[currentLevel - 1]) {

    ///now if no of buttons clicked = pattern length, then proceed with new round
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }


  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("GAME OVER!<br>Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();

    }

}
//------------------------------------------------

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}
//------------------------------------------------------------
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100); //100 milliseconds delay

}
//------------------------------------------------------------
function nextSequence() {
  userClickedPattern = [];
  level += 1;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);


  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  console.log(gamePattern); //delete
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // animate({opacity:0.25}).animate({opacity:1});

  playSound(randomChosenColour);
}

//------------------------------------------------------------



//------------------------------------------------------------

function startOver(){
  gamePattern=[];
  game_started=0;
  level=0;

}

//-------------------------------------------------------------
