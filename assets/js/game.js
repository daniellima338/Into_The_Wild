// Used to get the data
$.ajax({
    type: "GET",
    url: 'https://opentdb.com/api.php?amount=20&category=27&type=multiple',
    data: "json",
    success: function(response){
        setupQuiz(response.results);
    }
});

// Globale Variables

var current_question_id = 0;
var quizData;
var life = 100;

// Used to generate random answer. Taken from stackoverflow: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Used to set up the quiz
function setupQuiz(data){
    quizData = data
    setupAnswers(data[current_question_id])
    console.log(quizData)
};

// Used to trigger next question with a delay, 
// so the user is able to see if he answered right or wrong
function triggerNextQuestion() {
    var delayTrigger = 2000;
        setTimeout(function() {
            current_question_id++
            setupAnswers(quizData[current_question_id])
        }, delayTrigger);
}

//Used to generate the answers for each question
function setupAnswers(current){
   $("#question").text(current.question)

    answers = [current.correct_answer]
                    .concat(current.incorrect_answers)
                    .sort((_a, _b) => 0.5 - Math.random());
    
    var i = 1;
    answers.forEach(function (answer) {
        $("#answer_" + i).removeAttr("style");
        $("#answer_" + i).text(answer)  
        i++
    })
    showCorrectAnswer(current.correctAnswer)    
};
// Cant get it working
//  function incrementScore(){
//      var isCorrect = results.correct_answer;
//      var incorrect_answers = results.incorrect_answers;
//      $("button").click(function() {
//         if (isCorrect) {
//              $("#score").innerHTML = $("#score") + 1;
//          } else if (incorrect_answers) {
//             $("#incorrect").innerHTML = $("#incorrect") + 1;
//         }
//      })

//NOT WORKING
function showCorrectAnswer(correct_answer) {
    $("button").click(function() {
        selectedAnswer = $(this).text()

        if (correct_answer == selectedAnswer) {
            this.style.backgroundColor = "#a8f1b8"; //green
            $("#score").text() ++;
        } else {
            this.style.backgroundColor = "#d82929"; //red
            life -= 25;
        }
        $("button").unbind("click"); //unbind is used to reset the color

        //losing the game case

        if (life == 0){
            $("#finalScore").text("Your score was" + life)
            $("#exampleModalCenter").modal("toggle")
            $("saveScore").click(function() {
                highScores = JSON.parse(localStorage.getItem('highScores')) || []
                score = {
                    score: life, 
                    name: $("#name").val() 
                };  
                highScores.push(score);
                highScores.sort((a, b) => b.score - a.score);
                highScores.splice(5);
                localStorage.setItem('highScores', JSON.stringify(highScores));
                console.log(highScores)
            })
        } else {
            triggerNextQuestion()
            $("#progressbar > div").width(life + "%")
        }
    }
    )}

