var position = []

function initMap(){
  var latlng = new google.maps.LatLng(35, 139)
  var myOptions = {
    zoom: 16,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById("map"), myOptions)

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
      position.push({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      })
      latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)

      map.setCenter(latlng)
      marker = new google.maps.Marker({
        position: latlng,
        icon: {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          strokeColor: 'blue',
          strokeWeight: 3,
          scale: 6,
          rotation: pos.coords.heading
        },
        map: map
      })
    }, function(err){
      console.log(err.code+": "+err.message)
    }, {
      enableHighAccuracy: true
    })

    watchId = navigator.geolocation.watchPosition(function(pos) {
      let result = [pos.coords.latitude, pos.coords.longitude]
      transition(result)
    }, function(err) {
      console.log(err.code+": "+err.message)
    }, {
      enableHighAccuracy: false
    })
  }

  window.addEventListener("deviceorientation", (event) =>{
    marker.setIcon({
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      strokeColor: 'blue',
      strokeWeight: 3,
      scale: 6,
      rotation: compassHeading(event.alpha, event.beta, event.gamma)
    })
  }, true)
  google.maps.event.addDomListener(window, 'load', initMap)
}

var numDeltas = 100
var delay = 10
var i = 0
var deltaLat
var deltaLng

function transition(result) {
  i = 0
  deltaLat = (result[0] - position[0].lat)/numDeltas
  deltaLng = (result[1] - position[0].lng)/numDeltas
  moveMarker()
}

function moveMarker() {
  position[0].lat += deltaLat
  position[0].lng += deltaLng
  var latlng = new google.maps.LatLng(position[0].lat, position[0].lng)
  marker.setPosition(latlng)
  if(i != numDeltas){
    i++
    setTimeout(moveMarker, delay)
  }
}

function compassHeading(alpha, beta, gamma) {
  var degtorad = Math.PI / 180; // Degree-to-Radian conversion

  var _x = beta ? beta * degtorad : 0; // beta value
  var _y = gamma ? gamma * degtorad : 0; // gamma value
  var _z = alpha ? alpha * degtorad : 0; // alpha value

  var cX = Math.cos(_x);
  var cY = Math.cos(_y);
  var cZ = Math.cos(_z);
  var sX = Math.sin(_x);
  var sY = Math.sin(_y);
  var sZ = Math.sin(_z);

  // Calculate Vx and Vy components
  var Vx = -cZ * sY - sZ * sX * cY;
  var Vy = -sZ * sY + cZ * sX * cY;

  // Calculate compass heading
  var compassHeading = Math.atan(Vx / Vy);

  // Convert compass heading to use whole unit circle
  if (Vy < 0) {
    compassHeading += Math.PI;
  } else if (Vx < 0) {
    compassHeading += 2 * Math.PI;
  }
  return compassHeading * ( 180 / Math.PI ); // Compass Heading (in degrees)
}
