var map,
    locationList,
    locations;

function showMap(err, data) {
  var zoomLevel = 11;
  
    if(address ==="") {
        map.setView([lat, lng], zoomLevel);
    }

    else {
        lat = data.latlng[0];
        lng = data.latlng[1];        
    
        map.setView([data.latlng[0], data.latlng[1]], zoomLevel);
    }    

    marker = L.marker([lat, lng], {
      icon: L.mapbox.marker.icon({
        'marker-color': '#9c89cc'
      })
    })
    .bindPopup('<div class="location-info-popup">' +
    '<header class="info-popup-header"><img src="images/info-images/' + image + '.jpg">' +
    '<div class="header-container">' + 
    '<h1>' + locationName + '</h1>' +
    '<h2>' + place + '</h2>' + 
    '</div>' +
    '</header>' +
    '<div class="location-address">' +
    '<div>' + address + '</div>' + 
    '</div>' +
    '<div class="location-note">' + note + '</div>' +
    '</div>').addTo(map).openPopup();
}


L.mapbox.accessToken = 'pk.eyJ1IjoienN0ZWluZXIiLCJhIjoiTXR4U0tyayJ9.6BxBAjPyMHbt1YfD5HWGXA';
    map = L.mapbox.map('map-canvas', 'mapbox.outdoors');

var featureLayer = L.mapbox.featureLayer()
    .loadURL('data/co-trip.geojson')
    .addTo(map);
    
featureLayer.on('ready', function() {
    map.fitBounds(featureLayer.getBounds());
});