// Used to get the data
$.ajax({
    type: "GET",
    url: 'https://opentdb.com/api.php?amount=20&category=27&type=multiple',
    data: "json",
    success: function(response){
        setupQuiz(response.results);
    }
});


// Used to generate random answer. Taken from stackoverflow: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Used to generate new question everytime an answer is clicked
function setupQuiz(data){

    var current_question_id = 0;
    setupAnswers(data[current_question_id])

    $("button").click(function() {
        current_question_id++
        setupAnswers(data[current_question_id])
    });
    console.log(data)            
}

function setupAnswers(current){
   $("#question").text(current.question)

    answers = [current.correct_answer]
                    .concat(current.incorrect_answers)
                    .sort((a, b) => 0.5 - Math.random());
    
    var i = 1;
    answers.forEach(function (answer) {
        $("#answer_" + i).text(answer)  
        i++
    })
     
}

