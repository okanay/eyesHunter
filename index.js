var clickProtect = true;
var gamestart = false;
var gameover = false;
var gameLevel;
var score = 0;
var randomValues = [];
var currentValue = 0;

var buttons = $(".btn");
var sounds = ["blue.mp3", "green.mp3", "red.mp3", "yellow.mp3"];


$(document).click(function() {

  if (!gameover && !gamestart) {
    gameLevel = 2 ;
    $("h1").html("LV : " + (gameLevel - 1));
    setTimeout(function() {
        gamestart = true;
        setRandomValues();
      }

      , 400);
  }
})

function setRandomValues() {

  gameLevel = Math.floor((score / 10) + 2)
  console.log(gameLevel);
  randomValues = [];

  while (randomValues.length < gameLevel) {

    randomValues.push(Math.floor(Math.random() * buttons.length));
  }

  setTimeout(function(){

    randomColorActive();
    $("h1").html("LV : " + (gameLevel - 1));
  }, 150);

}

function randomColorActive() {

  for (var i = 0; i < gameLevel; i++) {

    colorTask(i);

  }

  setTimeout(function() {
  clickProtect = false; }, 200);
}

function colorTask(i) {
  setTimeout(function() {

    buttons.eq(randomValues[i]).addClass("trueButton");
    setTimeout(function() {
      buttons.eq(randomValues[i]).removeClass("trueButton");
    }, 200);

  }, 400 * i);
}

function songCall(value){

  var audio = new Audio("sounds/" + sounds[value]);
  audio.play();
}

function clickCheck(value) {

  if (!gameover && gamestart && !clickProtect) {

    if (value === randomValues[currentValue]) {

      buttons.eq(randomValues[currentValue]).addClass("pressed");
      clickProtect = true;
      songCall(value);
      setTimeout(function() {
        buttons.eq(randomValues[currentValue]).removeClass("pressed");

        if(currentValue < randomValues.length - 1){
          currentValue++;
          clickProtect = false;
        }
        else{
          currentValue = 0;
          setRandomValues();
        }
          score++;
          $("h1").html("Score : " + (score));
      }, 300);

    } else {
      $("h1").html("GameOver");
      gameover = true;
      $("body").addClass("game-over");
    }
  }
}
