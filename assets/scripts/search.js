// when html is ready ie done loading run function
$(document).ready(function() {
  // Check if this user is signed in
  // If not kick out back to index

  // if (firebase.auth().currentUser === null) {
  //   //window.location redirects user to given page
  //   window.location = "./index.html";
  // }
  //if user gets to this point we know they're logged in
  // Create a variable to reference the database.
  // var config = {
  //   apiKey: "AIzaSyAtvF_Uag4Qbvxp1r2BNkvuKQ0jkTrdyeE",
  //   authDomain: "vinequest-35c5f.firebaseapp.com",
  //   databaseURL: "https://vinequest-35c5f.firebaseio.com",
  //   projectId: "vinequest-35c5f",
  //   storageBucket: "vinequest-35c5f.appspot.com",
  //   messagingSenderId: "457258807730"
  // };

  // firebase.initializeApp(config);

  var database = firebase.database();

  var userId = firebase.auth().currentUser.uid;
  var likedImages = [];
  database.ref("/" + userId + "/liked_images").on("value", function(snap) {
    if (snap.val() !== null) {
      likedImages = snap.val();
    }
  });

  // when user clicks on search image
  $(".search").on("click", function(event) {
    // if the search field is expanded, focus on it
    if ($(".search-field").hasClass("expand-search")) {
      $(".search-field").focus();
    } else {
      // if image is clicked it will expand/ retract
      $(".search-field").addClass("expand-search");
    }

    var userInput = $(".input-field").val();
    if (userInput.length > 0) {
      $(".input-field").val("");
    }

    searchImages(userInput);
  });

  $("#search").on("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      $(".search").trigger("click");
    }
  });

  $("body").on("click", ".heart", function() {
    console.log("you liked an image!");
    console.log($(this).attr("data-imgId"));

    var likedImage = $(this)
      .parent()
      .attr("data-image");

    if (!likedImages.includes(likedImage)) {
      likedImages.push(likedImage);

      //get user
      var userId = "npI4LQF9gocmQvc2SpU1l37Kb123";

      database
        .ref("/" + userId)
        .child("liked_images")
        .set(likedImages);

      //on click push anything liked to user.liked
    }
  });

  function searchImages(userSearch) {
    // API key
    var queryURL =
      "https://api.unsplash.com/search/photos?client_id=81749fea1cd0e85289f700fd98bd3488b5b786cfb861291a86beaf4230d2866c&page=1&per_page=15&orientation=landscape&query=" +
      userSearch;

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
            `<div data-image=${image} style="background: url(${image}); height: 265px; width: 400px; display:inline-block;"><img src="assets/images/heart.png" alt="heart" class="heart" data-imgId=${
              results[searchResults].id
            }></div>`
          );
          // var imgId = ;

          container.addClass("imageresults");

          $("#dump").prepend(container);
        }
      });
  }
});
