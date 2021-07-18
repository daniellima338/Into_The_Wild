// Used to get the data
$.ajax({
    type: "GET",
    url: 'https://opentdb.com/api.php?amount=20&category=27&type=multiple',
    data: "json",
    success: function(response){
        showQuestion(response.results);
    }
});

// Used to set up a new question everytime a answer is clicked
function showQuestion(data) {
    var current_question_id = 0; 
    setupAnswers(data[current_question_id])

    $("button").click(function(){
        current_question_id++;
        setupAnswers(data[current_question_id])
    })
}

// Used to recycle the correct answer everytime. CANT GET THE ANSWERS TO DISPLAY
function setupAnswers(results) {
    let isCorrect = results.correct_answer;
    let incorrect_answers = results.incorrect_answers;

    $("#question").text(results.question)
    // sort((a,b)) => 0.5 - Math.random()) is used to always choose a random place to put the correct answer. Solution found on StackOverflow
    
    answers = [results.correct_answer]
        .concat(results.incorrect_answers)
        .sort((a, b) => 0.5 - Math.random());
    
    var i = 1;
    answers.forEach(function (answer) {
    $("#answer_" + i).text(answer)
    i++;
    }) 
    if (isCorrect) {
        $("#score").innertext = $("#score") + 1;
    }
    else if (incorrect_answers) {
        $("#incorrect").innertext = $("#incorrect") + 1;
    }
};



