var userClickedButton = [];
var gamePattern = [];
var buttonColors = ["red", "green", "blue", "yellow"];
var level = 1;
function newRandomNo() {
  var randomNo = Math.floor(Math.random() * 4);
  return randomNo;
}
function animateButton(choosenColor) {
  $("#" + choosenColor).addClass("pressed");
  setTimeout(function () {
    $("#" + choosenColor).removeClass("pressed");
  }, 50);
}
function playSound(choosenColor) {
  var audio = new Audio("./sounds/" + choosenColor + ".mp3");
  audio.play();
}
function nextSequence() {
  userClickedButton = [];
  $("h1").text("level " + level);
  level++;
  var randomColor = buttonColors[newRandomNo()];
  gamePattern.push(randomColor);
  animateButton(randomColor);
  playSound(randomColor);
}
function checkAnswer(pos) {
  if (gamePattern[pos] == userClickedButton[pos]) {
    if (gamePattern.length == userClickedButton.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    playSound("wrong");
    $("h1").text("Game over, press any key to restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    restart();
  }
}
function restart() {
  level = 1;
  gamePattern = [];
}
// main
$(document).on("keydown", function () {
  if(level == 1){
    nextSequence();
  }
});
$(".btn").on("click", function () {
  var userChoosenColor = $(this).attr("id");
  userClickedButton.push(userChoosenColor);
  animateButton(userChoosenColor);
  playSound(userChoosenColor);
  checkAnswer(userClickedButton.length - 1);
});
