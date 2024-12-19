// Smooth Scroll with Highlight Animation
$(document).ready(function () {
  $(".navbar .nav-link").on("click", function (event) {
      if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;

          $("html, body").animate(
              {
                  scrollTop: $(hash).offset().top,
              },
              700,
              function () {
                  window.location.hash = hash;

                  // Highlight target section briefly
                  $(hash).css({
                      background: "rgba(255, 87, 136, 0.1)",
                  });
                  setTimeout(() => {
                      $(hash).css({ background: "transparent" });
                  }, 1000);
              }
          );
      }
  });
});

// Portfolio Filters with Fade Effect
$(window).on("load", function () {
  var t = $(".portfolio-container");
  t.isotope({
      filter: ".new",
      animationOptions: {
          duration: 750,
          easing: "ease-in-out",
          queue: false,
      },
  });

  $(".filters a").click(function () {
      $(".filters .active").removeClass("active");
      $(this).addClass("active");
      var i = $(this).attr("data-filter");

      t.isotope({
          filter: i,
          animationOptions: {
              duration: 750,
              easing: "ease-in-out",
              queue: false,
          },
      });

      return false;
  });
});

// Google Maps: Add Marker with Tooltip
function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 28.6139, lng: 77.2090 }, // Coordinates for New Delhi, India
      zoom: 10,
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
          },
          {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
          },
          {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }],
          },
          {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76" }],
          },
          {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
          },
          {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
          },
          {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
          },
          {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#746855" }],
          },
          {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1f2835" }],
          },
          {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }],
          },
          {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }],
          },
          {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
          },
          {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
          },
          {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
          },
          {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }],
          },
      ],
  });

  // Add Marker with Tooltip
  var marker = new google.maps.Marker({
      position: { lat: 28.6139, lng: 77.2090 }, // Marker at New Delhi
      map: map,
      title: "New Delhi, India!",
  });

  var infoWindow = new google.maps.InfoWindow({
      content: "<h4></h4>",
  });

  marker.addListener("click", function () {
      infoWindow.open(map, marker);
  });
}
