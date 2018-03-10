// when html is ready ie done loading run function
$(document).ready(function() {
	// when user clicks on search image
	$('.search').on('click', function(event) {
      // if the search field is expanded, focus on it
      if ($(".search-field").hasClass("expand-search")) {
      	$(".search-field").focus();
      } else{
      	// if image is clicked it will expand/ retract
      	$(".search-field").addClass("expand-search");
      }

      var userInput= $(".input-field").val();

      // API key
      var queryURL = "https://api.unsplash.com/search/photos?client_id=81749fea1cd0e85289f700fd98bd3488b5b786cfb861291a86beaf4230d2866c&page=1&query=wine";
      
      if (userInput.length > 0) {
      	// use user input to search instagram api
      	console.log(userInput);
      	
      	function


      	// clear input field
      	$(".input-field").val("");
      }
    })
});



