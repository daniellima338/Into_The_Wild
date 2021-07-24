// GAME

// Used to get the data
$.ajax({
    type: "GET",
    url: 'https://opentdb.com/api.php?amount=20&category=27&type=multiple',
    data: "json",
    success: function(response) {
        setupQuiz(response.results);
    }
});

// Globale Variables

var quizData;
var currentQuestionId = 0;
var score = 0;
var life = 100;

// Used to generate random answer. 
//Taken from stackoverflow: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Used to set up the quiz

function setupQuiz(data) {
    quizData = data
    setupAnswers(quizData[currentQuestionId])
    console.log(quizData)
};

// Used to trigger next question with a delay, 
// so the user is able to see if he answered right or wrong

function triggerNextQuestion() {
    var delayTrigger = 2000;
    setTimeout(function() {
        currentQuestionId++
        setupAnswers(quizData[currentQuestionId])
    }, delayTrigger);
}

//Used to generate the answers for each question

function setupAnswers(current) {
    $("#question").html(current.question)

    answers = [current.correct_answer]
        .concat(current.incorrect_answers)
        .sort((_a, _b) => 0.5 - Math.random());

    var i = 1;
    answers.forEach(function(answer) {
        var answerButton = $("#answer_" + i)
        answerButton.removeAttr('style');
        answerButton.html(answer)
        i++
    })
    showCorrectAnswer(current.correct_answer)
}

// Stores the scores after a game if finished. Inspiration taken from: 
//https://michael-karen.medium.com/how-to-save-high-scores-in-local-storage-7860baca9d68

function storeScores(newScore, playername) {
    var highScores = JSON.parse(localStorage.getItem('highScores')) || []
    var score = {
        score: newScore,
        name: playername
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    console.log(highScores)
};

// Displays modal for the user
function modalDisplay(modalName) {
    $("#finalMessage").text("Your score was" + score)
    $(modalName).modal("toggle")
    $(".saveScore").click(function() {
        storeScores(score, $("#name").val())
    })
}

function showCorrectAnswer(correct_answer) {
    $("button").click(function() {
        selectedAnswer = $(this).text()

        if (correct_answer == selectedAnswer) {
            this.style.backgroundColor = "#a8f1b8"; //green
            newScore = score += 1;
            $("#score")[0].innerHTML = newScore;
        } else {
            this.style.backgroundColor = "#d82929"; //red
            life -= 25;
        }
        $("button").unbind("click"); //unbind is used to reset the color
        $("#progressbar > div").width(life + "%")

        if (life == 0) {
            modalDisplay("#endModal")
            $("#titleText").text("You died in the jungle!")
        } else {
            triggerNextQuestion()
        }
    });
    if (score == 10) {
        modalDisplay("#endModal")
        $("#titleText").text("You got through the jungle. Well done!")
    }
}

//Show highscores on the highscores board. Inspiration taken from: 
//https://michael-karen.medium.com/how-to-save-high-scores-in-local-storage-7860baca9d68

highScores = JSON.parse(localStorage.getItem('highScores')) || []
console.log(highScores)
$("#highScoresList").html(highScores
    .map(score => {
        return (`<li class = "high-score">${score.name}  -  ${score.score}<li>`);
    })
    .join(""))

//EMAIL WORKFLOW. Taken from Code Institute course

function sendMail(contactForm) {
    emailjs.send("service_imbql8k", "intoTheWild", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.feedback.value
    }).then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        });
    return false; // To block from loading a new page
}