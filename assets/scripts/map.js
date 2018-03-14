$(document).ready(function() {
  // Default vars

  var map2;
  var latitude = "";
  var longitude = "";
  var LatLng = "";

  // API keys

  var googleMapapiKey = "AIzaSyCyswQe8LuGs4TY79PITYkp4v3K8YD7yfk";

  // // Create a Google Map

  function mapIt() {
    // Load location
    $(document).on("click", "#maps", getLocation);

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }

    function showPosition(position) {
      var latlon = position.coords.latitude + "," + position.coords.longitude;
      var map2 =
        "https://maps.googleapis.com/maps/api/staticmap?center=" +
        latlon +
        "&zoom=14&size=400x300&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
      document.getElementById("mapholder").innerHTML =
        "<img src='" + map2 + "'>";

      $("#map-canvas").html("This Is Your Current Location:");

      var infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map2);

      service.getDetails(
        {
          placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4"
        },
        function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map2: map2,
              position: place.geometry.location
            });
            google.maps.event.addListener(marker, "click", function() {
              infowindow.setContent(
                "<div><strong>" +
                  place.name +
                  "</strong><br>" +
                  "Place ID: " +
                  place.place_id +
                  "<br>" +
                  place.formatted_address +
                  "</div>"
              );
              infowindow.open(map2, this);
            });
          }
        }
      );

      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      var LatLng = new google.maps.LatLng(latitude, longitude);

      // addNearByPlaces(LatLng);
      // apiMarkerCreate(LatLng);
    }

    function addNearByPlaces(LatLng) {
      var nearByService = new google.maps.places.PlacesService(map2);
      var request = {
        location: LatLng,
        radius: 10936,
        types: ["winery"]
      };
      nearByService.nearbySearch(request, searchNearBy);
    }

    function searchNearBy(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          apiMarkerCreate(place.geometry.location, place);
        }
      }
    }

    function apiMarkerCreate(LatLng, placeResults) {
      var markerOptions = {
        position: LatLng,
        map2: map2,
        animation: google.maps.Animation.DROP,
        clickable: true
      };
      var marker = new google.maps.Marker(markerOptions);

      if (placeResults) {
        var content =
          placeResult.name +
          "<br/>" +
          placeResult.vicinity +
          "<br/>" +
          placeResult.type +
          '<br/><a hrefs="addmap.php?name=' +
          placeResult.name +
          "&adress";
        windowInfoCreate(marker, LatLng, content);
      } else {
        var content = "You are here: " + latLng.lat() + ", " + latLng.lng();
        windowInfoCreate(marker, LatLng, content);
      }
    }

    function windowInfoCreate(marker, LatLng, content) {
      var InfoWindowOptions = {
        content: content,
        position: latLng
      };

      var InfoWindow = new google.maps.InfoWindow(infoWindowOptions);

      google.maps.event.on(marker, "click", function() {
        InfoWindow.open(map2);
      });
    }

    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          x.innerHTML = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          x.innerHTML = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          x.innerHTML = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          x.innerHTML = "An unknown error occurred.";
          break;
      }
    }
  }

  mapIt();
});
