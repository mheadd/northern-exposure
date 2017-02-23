var endpoint = 'https://data.muni.org/resource/mdfi-bspc.json'
var query_template = '$select=business_name,business_address,business_id,inspection_score&$where=within_box(location,61.215908430923314,-149.74279170172807,61.22489163587668,-149.72413273187198)%20AND%20inspection_score%20IS%20NOT%20NULL&$order=inspection_score%20DESC&$limit=10'

$(document).ready(function() {
  if ('geolocation' in navigator) {
  $('.init').addClass('hide');
  $('.container').removeClass('hide');
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position.coords.latitude, position.coords.longitude);
  });
} else {
  $('.init').addClass('hide');
  $('.error').removeClass('hide');
}
});


/*
 * Method to generate a bounding box given a lat/lon pair
 * Variation of JavaScript method detailed here:
 *   http://stackoverflow.com/questions/238260/how-to-calculate-the-bounding-box-for-a-given-lat-lng-location
 */
getBoundingBox = function(centerPoint, distance) {
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
    R = 3959
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
    return [
        minLat.radToDeg(),
        minLon.radToDeg(),
        maxLat.radToDeg(),
        maxLon.radToDeg()
    ];
};
