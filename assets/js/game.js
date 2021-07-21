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

//Used to generate the answers for each question
function setupAnswers(current){
   $("#question").text(current.question)

    answers = [current.correct_answer]
                    .concat(current.incorrect_answers)
                    .sort((_a, _b) => 0.5 - Math.random());
    
    var i = 1;
    answers.forEach(function (answer) {
        $("#answer_" + i).text(answer)  
        i++
    })
     
}
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
function showCorrectAnswer() {
    var isCorrect = results.correct_answer;
    var incorrect_answers = results.incorrect_answers;

    $("button").click(function() {
        if (isCorrect) {
            this.style.backgroundColor = "#a8f1b8"; //green
        } else if (incorrect_answers){
            this.style.backgroundColor = "#d82929"; //red
        }
    }
    )}
