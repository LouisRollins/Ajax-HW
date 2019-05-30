var topics = ["spider-man", "guitars", "sub-zero", "fallout", "batman", "hendrix", "lord of the rings"]
var apiKey = "&api_key=8uchht6DP2rh70vB0F0l6itT7J4DJpEn&limit=10";
var $input = ''

//displays topics array as buttons
function showButtons() {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("topic");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $("#buttons").append(newButton);
    }
}

//on search button push input to topics array
$("#add-topic").on('click', function () {
    // $(document).on('click', '#add-topic', function(event){
    event.preventDefault();
    $input = $("#input").val().trim()
    topics.push($input)
    showButtons();
    
})

$(document).on('load', showButtons());

//API request, display gifs
// $(".topic").click(function(){
$(document).on('click', '.topic', function(){
    $("#gif-div").empty()
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("data-name") + apiKey
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    var gifs = response.data
    var imgTag = $("<img>")
    
    for (i=0; i<gifs.length; i++){
        imgTag = $("<img data-state = 'animated'>")
        imgTag.attr('src', gifs[i].images.fixed_height.url)
        imgTag.attr('data-animate', gifs[i].images.fixed_height.url)
        imgTag.attr('data-still', gifs[i].images.fixed_height_still.url)
        $('#gif-div').append(imgTag)
        $('#gif-appear').append($("#gif-div"))
      
        imgTag.on('click', function(){
            if(imgTag.attr('data-state') === 'animated'){
                imgTag.attr('src', imgTag.attr('data-still'))
                console.log(imgTag.attr('data-still'))
                imgTag.attr('data-state', 'still')
            }else if (imgTag.attr('data-state') === 'still'){
                imgTag.attr('src', imgTag.attr('data-animate'))
                imgTag.attr('data-state', 'animated')
            }
            $('#gif-div').append(imgTag)
            $('#gif-appear').append($('#gif-div'))
        })
    }
   
    //   click to pause if statement
    
    
    showButtons();
    
})

})