// when html is ready ie done loading run function
var userInput;

$(document).ready(function() {
  // when user clicks on search image
  $(".search").on("click", function(event) {
    // if the search field is expanded, focus on it
    if ($(".search-field").hasClass("expand-search")) {
      $(".search-field").focus();
    } else {
      // if image is clicked it will expand/ retract
      $(".search-field").addClass("expand-search");
    }

    userInput = $(".input-field").val();
    if (userInput.length > 0) {
      $(".input-field").val("");
    }
    searchImages();
  });
});

function searchImages() {
  var userSearch = userInput;

  // API key
  var queryURL =
    "https://api.unsplash.com/search/photos?client_id=81749fea1cd0e85289f700fd98bd3488b5b786cfb861291a86beaf4230d2866c&page=1&per_page=15&orientation=landscape&query=" +
    userSearch;

  // use user input to search unsplash api
  // console.log(userInput);

  // performing the ajax request
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // after the data comes back from the API
    .then(function(response) {
      // var results = results.urls.small;
      var results = response.results;

      for (
        var searchResults = 0;
        searchResults < results.length;
        searchResults++
      ) {
        var image = results[searchResults].urls.small;
        console.log(image);
        var container = $(
          `<div style="background: url(${image}); height: 265px; width: 400px; display:inline-block;"><img src="assets/images/heart.png" alt="heart" class="heart"></div>`
        );

        container.addClass("imageresults");

        $("#dump").prepend(container);
      }
      $(".heart").on("click", function() {
        console.log("you liked an image!");
      });
    });
}
