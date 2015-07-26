var map,
    locationList,
    featureLayer;

L.mapbox.accessToken = 'pk.eyJ1IjoienN0ZWluZXIiLCJhIjoiTXR4U0tyayJ9.6BxBAjPyMHbt1YfD5HWGXA';
    map = L.mapbox.map('map-canvas', 'mapbox.outdoors');

featureLayer = L.mapbox.featureLayer()
    .loadURL('data/co-trip.geojson')
    .addTo(map);

locationList = document.getElementById('location-list');
    
featureLayer.on('ready', function() {
    map.fitBounds(featureLayer.getBounds());

    featureLayer.eachLayer(function(layer) {
              var item = locationList.appendChild(document.createElement('li'));
              $(item).addClass('location');
              item.innerHTML = 
                '<div class="location-date">' + layer.toGeoJSON().properties.date + '</div>' +
                '<div class="location-name"><a>' + layer.toGeoJSON().properties.title + '</a></div>' +
                '<div class="location-place">' + layer.toGeoJSON().properties.place + '</div>';
              item.onclick = function() {
                 map.setView(layer.getLatLng(), 8);
                 layer.openPopup();
                 $(item).addClass('is-current').siblings().removeClass('is-current');
              };
    });
});