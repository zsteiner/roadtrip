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
        
        var locationDate = layer.feature.properties.date,
            locationTitle = layer.feature.properties.title,
            //locationPlace = layer.feature.properties.place,
            locationImage = layer.feature.properties.image,
            locationCity = layer.feature.properties.city,
            locationStreet = layer.feature.properties.street,
            locationDescription = layer.feature.properties.description;
        
        $(item).addClass('location');
        
        if (locationImage === '') {
            layer.bindPopup(
              '<header class="info-popup-header"></header>' + 
              '<div class="info-popup-header-content">' + 
                  '<div class="location-date">' + locationDate + '</div>' +
                  '<h1 class="location-title">' + locationTitle + '</h1>' +
                  //'<h2 class="location-place">' + locationPlace + '</h2>' +
              '</div>' +
              '<div class="location-address"><div>' + locationStreet + '</div><div>' + locationCity + '</div></div>' +
              '<div class="location-description">' + locationDescription + '</div>'
            );
        }
        
        else {
            layer.bindPopup(
              '<a href="images/background-images/' + locationImage + '.jpg">' +
              '<header class="info-popup-header with-image" style="background-image: url(images/background-images/' + locationImage + '.jpg);"></header>' + '</a>' +
              '<div class="info-popup-header-content">' + 
                  '<div class="location-date">' + locationDate + '</div>' +
                  '<h1 class="location-title">' + locationTitle + '</h1>' +
                  //'<h2 class="location-place">' + locationPlace + '</h2>' +
              '</div>' +
              '<div class="location-address"><div>' + locationStreet + '</div><div>' + locationCity + '</div></div>' +
              '<div class="location-description">' + locationDescription + '</div>'
            );
        }
        
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