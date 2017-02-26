# Northern Exposure

Worried about exposing yourself to unsanitary conditions while dining out in Anchorage? This app lets you quickly and easily locate nearby restaurants with favorable food safety inspection scores.

## Built with

* [Bootstrap](http://getbootstrap.com/) & the [Cerulean](https://bootswatch.com/cerulean/) Bootswatch theme
* [jQuery](https://jquery.com/)
* [Open data](https://data.muni.org/Public-Health/Restaurant-and-Food-Inspections/6sdz-r9ba) from the city of Anchorage, AK

## Usage

If changes are made, precompile the template for listing locations thusly:

```
~$ handlebars templates/* -f js/templates.js
```

This app is designed to work with your location, and if you're not currently located in Anchorage you won't find nearby restaurants.

To check this app out in the lower 48 states (or elsewhere), you can set a custom location in Chrome that makes your browser _think_ you are in Anchorage.

* Open Chrome Dev tools (on Mac use `option` + `command` + `I`)
* Go to the console tab, and press `esc` to open the console drawer
* Select `Sensors` and in the `Geolocation` section select `custom location` from the drop down menu
* Enter in a [latitude and longitude for Anchorage, AK](http://www.latlong.net/).
