$(document).ready(function() {

    // Get users current location.
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            $('.init').addClass('hide');
            $('.container').removeClass('hide');
            coordinates = [position.coords.latitude, position.coords.longitude];
        });
    }
    // Otherwise, show error message.
    else {
        $('.init').addClass('hide');
        $('.error').removeClass('hide');
    }

    // Handler for button clicks.
    $('.custom').click(function() {
        $(this).parent().find('button').each(function() {
            $(this).removeClass('active');
        });
        $(this).toggleClass("active");
    });

    // Search for locations.
    $('#search').click(function() {

        // Get distance option selected by user.
        var distance = $('#distance').find('.active').attr('data-distance');

        // Calculate bounding box.
        var options = getBoundingBox(coordinates, distance);

        // Get the number of results selected by the user.
        options.limit = $('#number').find('.active').attr('data-number');

        // Build query URL.
        var build_query = Handlebars.compile(query_template);
        var url = build_query(options);

        // Get list of places and render results.
        getPlaceList(url, function(response) {
            results.places = response;
            clearContents();
            placesList = Handlebars.templates.list({
                Places: results
            });
            $('#results').append(placesList);
        })
    });

});

// Template for calling Anchorage open data API.
var query_template = 'https://data.muni.org/resource/mdfi-bspc.json?$select=business_name,business_address,business_id,AVG(inspection_score)&$where=within_box(location,{{lat_1}},{{lon_1}},{{lat_2}},{{lon_2}})%20AND%20inspection_score%20IS%20NOT%20NULL&$group=business_name,business_address,business_id&$order=AVG_inspection_score%20DESC&$limit={{limit}}';

// Variables to hold coordinates and query options.
var coordinates = [];
var options = {};

// Handlebars helper function to format an inspection score.
Handlebars.registerHelper('formatScore', function(score) {
    return Math.round(score * 100) / 100;
});

// Clear any displayed results.
function clearContents() {
    $("#results").empty();
}

// Make API call.
function getPlaceList(url, callback) {
    $.ajax({
        url: url,
        complete: function(xhr) {
            callback.call(null, xhr.responseJSON);
        }
    });
}

/*
 * Method to generate a bounding box given a lat/lon pair
 * Variation of JavaScript method detailed here:
 *   http://stackoverflow.com/questions/238260/how-to-calculate-the-bounding-box-for-a-given-lat-lng-location
 */
function getBoundingBox(centerPoint, distance) {
    var MIN_LAT, MAX_LAT, MIN_LON, MAX_LON, R, radDist, degLat, degLon, radLat, radLon, minLat, maxLat, minLon, maxLon, deltaLon;
    if (distance < 0) {
        return 'Illegal arguments';
    }
    // helper functions (degrees<–>radians)
    Number.prototype.degToRad = function() {
        return this * (Math.PI / 180);
    };
    Number.prototype.radToDeg = function() {
        return (180 * this) / Math.PI;
    };
    // coordinate limits
    MIN_LAT = (-90).degToRad();
    MAX_LAT = (90).degToRad();
    MIN_LON = (-180).degToRad();
    MAX_LON = (180).degToRad();
    // Earth's radius (mi)
    R = 3959;
    // angular distance in radians on a great circle
    radDist = distance / R;
    // center point coordinates (deg)
    degLat = centerPoint[0];
    degLon = centerPoint[1];
    // center point coordinates (rad)
    radLat = degLat.degToRad();
    radLon = degLon.degToRad();
    // minimum and maximum latitudes for given distance
    minLat = radLat - radDist;
    maxLat = radLat + radDist;
    // minimum and maximum longitudes for given distance
    minLon = void 0;
    maxLon = void 0;
    // define deltaLon to help determine min and max longitudes
    deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));
    if (minLat > MIN_LAT && maxLat < MAX_LAT) {
        minLon = radLon - deltaLon;
        maxLon = radLon + deltaLon;
        if (minLon < MIN_LON) {
            minLon = minLon + 2 * Math.PI;
        }
        if (maxLon > MAX_LON) {
            maxLon = maxLon - 2 * Math.PI;
        }
    }
    // a pole is within the given distance
    else {
        minLat = Math.max(minLat, MIN_LAT);
        maxLat = Math.min(maxLat, MAX_LAT);
        minLon = MIN_LON;
        maxLon = MAX_LON;
    }
    return {
        lat_1: minLat.radToDeg(),
        lon_1: minLon.radToDeg(),
        lat_2: maxLat.radToDeg(),
        lon_2: maxLon.radToDeg()
    };
};
