var map,
    locationList,
    featureLayer,
    markers,
    selectedMarker = 0,
    tripName,
    tripType,
    tripStartDate,
    tripEndDate,
    galleryImages,
    stopNumber,
    tripData = window.location.hash;
    
    if (tripData === "") {
        tripData = "co-trip";
    }
    
    else {
        tripData = tripData.substr(1);
    }

function navBar() {
    if (selectedMarker <= 1) {
      $('.map-nav-control a[rel=next]').removeClass('is-hidden'); 
      $('.stop-counter').removeClass('is-hidden');
      $('.map-nav-control a[rel=prev]').addClass('is-hidden'); 
      $('.map-nav-control a[rel=begin]').addClass('is-hidden');
      $('.map-nav-control a[rel=startover]').addClass('is-hidden'); 
    }

    else if (selectedMarker === markers.length) {
      $('.map-nav-control a[rel=startover]').removeClass('is-hidden'); 
      $('.map-nav-control a[rel=prev]').removeClass('is-hidden'); 
      $('.map-nav-control a[rel=begin]').addClass('is-hidden'); 
      $('.map-nav-control a[rel=next]').addClass('is-hidden'); 
    }
    
    else {
        $('.map-nav-control a[rel=prev]').removeClass('is-hidden'); 
        $('.map-nav-control a[rel=next]').removeClass('is-hidden'); 
        $('.stop-counter').removeClass('is-hidden');  
        $('.map-nav-control a[rel=startover]').addClass('is-hidden');  
        $('.map-nav-control a[rel=begin]').addClass('is-hidden');
    }

    $('.location:nth-child(' + selectedMarker + ')').addClass('is-current').siblings().removeClass('is-current');
    scrollSidebar.scrollToElement(document.querySelector('.location:nth-child(' + selectedMarker + ')'), 600, null, true);
    $('#stop-number').text(selectedMarker);

    if ($('#toggle2').is(':checked')) {
        $('#toggle2').click();
    }
}

function next() {
    var i;
        
    if (selectedMarker === 0) {
        i = selectedMarker - 1;
        ++i;    
    }
    
    else if (selectedMarker === markers.length) {
        i = 0;
        map.setView(markers[i].getLatLng(), 8);
    }
    
    else {
        i = selectedMarker - 1;
        ++i;    
        map.setView(markers[i].getLatLng(), 8);
    }
    
    markers[i].openPopup();
    selectedMarker = i + 1;
    navBar();

    //console.log("Selected = " + selectedMarker);
    //console.log("i = " + i);
}

function prev() {
    var i  = selectedMarker - 1;

    --i;    
    map.setView(markers[i].getLatLng(), 8);   
    markers[i].openPopup();
    selectedMarker = i + 1;
    navBar();
    
    //console.log("Selected = " + selectedMarker);
    //console.log("i = " + i);
}

function galleryName(locationID, locationTitle) {
    $('.gallery-header .gallery-stop-number').text(locationID);
    $('.gallery-header .gallery-stop-name').text(locationTitle);
}

function createGallery(obj,stopNumber) {
    var galleryList = document.getElementById('stop-gallery'),
    stopIndex = stopNumber - 1,
    locationTitle = featureLayer._geojson.features[stopIndex].properties.title;
    
    $.each(obj, function(i, stopID) {
        $('#stop-gallery li').remove();
        
        $.each(stopID.stops[stopIndex].galleryImages, function(imageIndex, obj){
            item = galleryList.appendChild(document.createElement('li'));
            item.innerHTML = 
            '<a href="images/' + tripData + '/stop' + stopNumber + '/stop'+ stopNumber + '_' + obj.imageID + '.jpg" class="gallery-link" data-caption="'+ obj.imageCaption +'">' + 
                '<img src="images/' + tripData + '/stop' + stopNumber + '/stop'+ stopNumber + '_' + obj.imageID + '.jpg">' + 
            '</a>';                  
        });
    }); 
    
    galleryName(stopNumber, locationTitle);

    $('.gallery-close').removeClass('is-hidden');
    setTimeout(function(){scrollGallerySidebar.refresh();},4000);
}

L.mapbox.accessToken = 'pk.eyJ1IjoienN0ZWluZXIiLCJhIjoiTXR4U0tyayJ9.6BxBAjPyMHbt1YfD5HWGXA';
    map = L.mapbox.map('map-canvas', 'mapbox.outdoors');

function mapIt() {
    featureLayer = L.mapbox.featureLayer()
        .loadURL('data/' + tripData + '.geojson')
        .addTo(map);
    
    locationList = document.getElementById('location-list');
        
    featureLayer.on('ready', function() {
        map.fitBounds(featureLayer.getBounds());
    
        tripName = featureLayer._geojson.tripName;
        tripType = featureLayer._geojson.tripType;
        tripStartDate = featureLayer._geojson.tripStartDate;
        tripEndDate = featureLayer._geojson.tripEndDate;
        
        $('.trip-name').text(tripName);
        $('.trip-start-date').text(tripStartDate);
        $('.trip-end-date').text(tripEndDate);
        $('.app-header').removeClass().addClass("app-header banner-" + tripType);
        $('.sidebar-header').addClass("sidebar-" + tripType);
        
        featureLayer.eachLayer(function(layer) {
            var item = locationList.appendChild(document.createElement('li'));
            
            var locationDate = layer.feature.properties.date,
                locationTitle = layer.feature.properties.title,
                locationID = layer.feature.properties.id,
                locationImage = layer.feature.properties.image,
                locationCity = layer.feature.properties.city,
                locationStreet = layer.feature.properties.street,
                locationDescription = layer.feature.properties.description,
                locationPlace = layer.feature.properties.place,
                locationGallery = layer.feature.properties.gallery,
                popUpHeader,
                galleryLink;
                
            if(locationGallery === true) {
                galleryLink = '<a class="gallery-link" data-stop-id="'+ locationID + '"><svg class="icon"><use xlink:href="#icon-image"></use></svg> View gallery for this stop.</a>';
            }
            
            else {
                galleryLink = '<a class="is-hidden"></a>';
            }
            
            if (locationImage === true) {
                  popUpHeader = '<header class="info-popup-header with-image" style="background-image: url(images/' + tripData + '/background' + locationID + '.jpg)"></header>';
            }
            
            else {
                popUpHeader = '<header class="banner-' + tripType + ' info-popup-header"></header>';
            }

            $(item).addClass('location');

            layer.bindPopup(
              popUpHeader + 
              '<div class="info-popup-header-content">' + 
                  '<div class="location-date"><span class="location-id">Stop #' + locationID + '</span>' + 
                      locationDate + '</div>' +
                  '<h1 class="location-title">' + locationTitle + '</h1>' +
              '</div>' +
              '<div class="location-address"><div>' + locationStreet + '</div><div>' + locationCity + '</div></div>' +
              '<div class="location-description">' + locationDescription + '</div>' +
              galleryLink
            );
            
            item.innerHTML = 
              '<div class="location-date"><span class="location-id">Stop #' + locationID + '</span>' + 
                  locationDate + '</div>' +
                '<div class="location-name"><a>' + locationTitle + '</a></div>' +
                '<div class="location-place">' + locationPlace + '</div>';
                
            item.onclick = function() {            
                map.setView(layer.getLatLng(), 8);
                layer.openPopup();
                $('.menu-button').click();                  
                selectedMarker = locationID;              
                navBar();                
            };
    
            layer.on('click', function() {
                selectedMarker = locationID;
                navBar();
            });

        markers = [];
            featureLayer.eachLayer(function(layer) { markers.push(layer); });
        });

        scrollSidebar.refresh();
    });
    
}

$.getJSON('data/' + tripData + '-gallery.js').done(function(data) {
    galleryImages = data;
}).error(function(err) {
    error = err;
});

mapIt();

$('.map-nav-control a[rel=begin], .map-nav-control a[rel=next], .map-nav-control a[rel=startover]').click(function(){
   next();
});

$('.map-nav-control a[rel=prev]').click(function(){
   prev();
});

$('#map-canvas').on('click', '.gallery-link', function() {
    stopNumber = $(this).data('stop-id');
    $('#toggle2').click();

    createGallery(galleryImages, stopNumber); 
});

function imageNav(currentListItem,imageLink,imageCaption) {
    $('.image-viewer .focal-image').attr('src', imageLink);   
    $('.image-viewer .image-caption').text(imageCaption);   
    $('.image-current').text(currentListItem);
}

$('.sidebar-gallery-list').on('click', '.gallery-link', function(e) {
    var currentListItem = $(this).parent().index();
    var totalListItems = $('.sidebar-gallery-list li:last-child').index();
    var imageLink = $(this).attr('href');
    var imageCaption = $(this).data('caption');
    var selectedItem = $(this).parent();
    
    totalListItems = ++totalListItems;
    currentListItem = ++currentListItem;
    
    e.preventDefault();
    selectedItem.addClass('is-selected').siblings().removeClass('is-selected');

    $('.gallery-close').addClass('is-hidden');
    $('.image-viewer').removeClass('is-hidden');
    $('.image-total').text(totalListItems);
    
    imageNav(currentListItem,imageLink,imageCaption);    
});

$('.image-nav a[rel="prev"]').click(function(){
    var newItem,
        currentListItem,
        imageLink,
        imageCaption;
    
    if($('.sidebar-gallery-list .is-selected').is(':first-child')) {
        newItem = $('.sidebar-gallery-list li:last-child');    
    }

    else {
        newItem = $('.sidebar-gallery-list .is-selected').prev('li');        
    }
    
    currentListItem = ($(newItem).index() + 1);
    imageLink = $(newItem).children('a').attr('href');
    imageCaption = $(newItem).children('a').data('caption');
     
    $(newItem).addClass('is-selected').siblings().removeClass('is-selected');    
    imageNav(currentListItem,imageLink,imageCaption);    
});

$('.image-nav a[rel="next"]').click(function(){
    var newItem,
        currentListItem,
        imageLink,
        imageCaption;

    if($('.sidebar-gallery-list .is-selected').is(':last-child')) {
        newItem = $('.sidebar-gallery-list li:first-child');    
    }

    else {
        newItem = $('.sidebar-gallery-list .is-selected').next('li');        
    }
    
    currentListItem = ($(newItem).index() + 1);
    imageLink = $(newItem).children('a').attr('href');
    imageCaption = $(newItem).children('a').data('caption');
        
    $(newItem).addClass('is-selected').siblings().removeClass('is-selected');
    imageNav(currentListItem,imageLink,imageCaption);    
});

$('.gallery-close, .image-viewer-close').click(function(){
    $('.image-viewer').addClass('is-hidden');
});

$('.image-viewer-close').click(function(){
    $('#toggle2').click();
});