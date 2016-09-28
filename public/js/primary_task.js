//JavaScript for primary task
//©WearCPS 2016
//Chris Navarro, edited by Mark Touma

//=====================GLOBALS=====================
  //Vars controlling what words are displayed
  //these could also be change to reflect an increase in difficulty
  var words = easyWords = ["Apple", "Avocado", "Apricot", "Asparagus", "Aubergine", "Arkansas"];
    var harderWords = ["AAApple", "AAAvocado", "AAApricot", "AAAsparagus", "AAAubergine", "AAArkansas"];

  var rowSize = easyRowSize = 5;
    var hardRowSize = 6;
  var columnSize = easyColumnSize = 5;
    var hardColumnSize = 6;

  var experiment_time_board = easyTime = curBoardTime = 45;
    var hardTime = 35;

  var answer = 0; //keeps track of number of target word
  var score = 0;  //tracks user score
  var responseTry = 1; //tracks each time the user submits an answer
  var enabled = 1; //flipped when a modal is shown so the user can no longer submit answers

  var attempts = [];
  var runTimer = true;
//=====================METHODS=====================

//Initially generate table with easiest settings
function load() {
    var data = {};
    for(var i = 1; i <= 10; i++){ //initialize experimentr response values
      data[("responseTry_"+i+"_answer")]=" ";
      data[("answer_"+i)]=" ";
      data[("score")]=" ";
      console.log(i);
    }
    experimentr.addData(data);
    generateTable();
    console.log("Page load finished");
}

function generateTable() {      
    deleteTable(); //clear pre-existing table

    var table = document.getElementById("myTableData");
    var row;

    //Randomly selects new target word
    var randomNum =Math.floor((Math.random() * words.length));
    var targetWord = words[randomNum];

    if(runTimer) {
      document.getElementById("target").innerHTML = "<h1>" + "Primary Task Target Word: " + targetWord + "</h1>";
    }

    for(var i = 0; i < rowSize; i++) {
      row = table.insertRow(i);

      for(var j = 0; j < columnSize; j++) {
        //Randomly populates table with word
        randomNum = Math.floor((Math.random() * words.length));

        //if target word increment answer
        if(words[randomNum] == targetWord) {
          answer++;
        }
        row.insertCell(j).innerHTML= words[randomNum];
      }
    }
}

function generateTestTable() {      
    //deleteTable(); //clear pre-existing table

    var table = document.getElementById("myTestTableData");
    var row;

    //Randomly selects new target word
    var randomNum =Math.floor((Math.random() * words.length));
    var targetWord = words[randomNum];

    document.getElementById("testtarget").innerHTML = "<h1>" + "Primary Task Target Word: " + targetWord + "</h1>";
    
    for(var i = 0; i < rowSize; i++) {
      row = table.insertRow(i);

      for(var j = 0; j < columnSize; j++) {
        //Randomly populates table with word
        randomNum = Math.floor((Math.random() * words.length));

        //if target word increment answer
        if(words[randomNum] == targetWord) {
          answer++;
        }
        row.insertCell(j).innerHTML= words[randomNum];
      }
    }
}

//Deletes the table
function deleteTable() {
    answer = 0; //reset answer
    if(runTimer) { 
      var Parent = document.getElementById("myTableData");
      while(Parent.hasChildNodes())
      {
       Parent.removeChild(Parent.firstChild);
      }
    }
} 

//Checks if the answers is right or wrong and updates the score accordingly
function checkAnswer(value) {
  var data = {};
  data["entered"]=parseInt(value);
  data["correct_answer"]=answer;
  data["time"] = Date.now();
  var answerVal = "";

  if(!value) return;

  if(value == answer) {
    console.log("Right");
    $("#answer").css("color", "green");
    score += 100;
    answerVal = "Correct";
  } else {
    console.log("Wrong");
    $("#answer").css("color", "red");
    score -= 100;
    answerVal = "Oops... the correct answer is: " + answer;
  }

  document.getElementById("answer").innerHTML = answerVal;
  document.getElementById("formValueId").value = "";

  experiment_time_board = curBoardTime;

  $("#answer").fadeIn(700);
  $("#answer").delay(500).fadeOut(600);

  data["score"]=score;
  data["attempt_#"] = responseTry;
  attempts.push(data);
  //experimentr.addData(data);
  responseTry++;
  updateScore();
  generateTable();
}

//Updates the user score so it properly displays
function updateScore() {
   document.getElementById("score").innerHTML = "<strong>" + "Score: " + score + "</strong>";
}

//Increases difficult of primary task
//TODO: elaborate on, for now this will be basic with only one level of increase
function increaseDifficulty() {
  words = harderWords;
  rowSize = hardRowSize;
  columnSize = hardColumnSize;
  experiment_time_board = curBoardTime = hardTime;
}

function decreaseDifficulty() {
  words = easyWords;
  rowsize = easyRowSize;
  columnSize = easyColumnSize;
  experiment_time_board = curBoardTime = easyTime;
}

