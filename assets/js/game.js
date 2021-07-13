// Used to get the data
$.ajax({
    type: "GET",
    url: 'https://opentdb.com/api.php?amount=20&category=27&type=multiple',
    data: "json",
    success: function(response){
        alert(response);
        console.log(response);
    }
});