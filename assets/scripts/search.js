// when html is ready ie done loading run function
$(document).ready(function() {
  var likedImages = [];
  var currentUser;
  var database = firebase.database();
  firebase.auth().onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      currentUser = firebaseUser;

      var userId = currentUser.uid;
      // var likedImages = [];
      database.ref("/" + userId + "/liked_images").on("value", function(snap) {
        if (snap.val() !== null) {
          likedImages = snap.val();
        }

        $("body").on("click", ".heart", function() {
          console.log("you liked an image!");
          console.log($(this).attr("data-imgId"));

          likeImage(
            $(this)
              .parent()
              .attr("data-image")
          );
        });
      });
    } else {
      window.location = "./index.html";
    }
  });

  // var userId = currentUser.uid;
  // var likedImages = [];
  // database.ref("/" + userId + "/liked_images").on("value", function(snap) {
  //   if (snap.val() !== null) {
  //     likedImages = snap.val();
  //   }
  // });

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

  // Logout event
  $("#logout").on("click", e => {
    e.preventDefault();
    firebase.auth().signOut();
  });

  // $("body").on("click", ".heart", function() {
  //   console.log("you liked an image!");
  //   console.log($(this).attr("data-imgId"));

  //   likeImage(
  //     $(this)
  //       .parent()
  //       .attr("data-image")
  //   );
  // });

  function likeImage(image) {
    var likedImage = image;
    if (!likedImages.includes(likedImage)) {
      likedImages.push(likedImage);

      //get user
      var userId = currentUser.uid;

      database
        .ref("/" + userId)
        .child("liked_images")
        .set(likedImages);

      //on click push anything liked to user.liked
    }
  }

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
