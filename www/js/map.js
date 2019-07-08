var position = []
var icon = {}

function initMap(){
  var latlng = new google.maps.LatLng(35, 139)
  var myOptions = {
    zoom: 16,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById("map"), myOptions)
  var check_elm = document.getElementById('check')

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
        icon: icon,
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
    check_elm.innerHTML = event.webkitCompassHeading
    icon = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      strokeColor: 'blue',
      strokeWeight: 3,
      scale: 6,
      rotation: event.webkitCompassHeading
    }
    marker.setIcon(icon)
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
