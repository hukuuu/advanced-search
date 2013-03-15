define([], function () {

    var _from,
        _to;

    var Typeahead = {
        getFrom:function () {
            return _from;
        },
        getTo:function () {
            return _to;
        },
        initialize:function (options) {
            initialize(options);
        }
    };

    function initialize(options) {

        var me = this,

            settings = $.extend({
                'inputFrom':'input.autocomplete-from',
                'inputTo':'input.autocomplete-to',
                'mapHolder':'div#map_canvas',
                'button':'button.check'
            }, options),

            from = new google.maps.places.Autocomplete(document.querySelector(settings.inputFrom), {
                types:['(cities)']
            }),

            to = new google.maps.places.Autocomplete(document.querySelector(settings.inputTo), {
                types:['(cities)']
            }),

            map = initializeMap(document.querySelector(settings.mapHolder)),

            directionsDisplay = new google.maps.DirectionsRenderer(),
            directionsService = new google.maps.DirectionsService();

        directionsDisplay.setMap(map);


        handleChange(from, map, function (place) {
            _from = place;
            drawRoad(_from, _to, map, directionsDisplay, directionsService);
        });

        handleChange(to, map, function (place) {
            _to = place;
            drawRoad(_from, _to, map, directionsDisplay, directionsService);
        });

        $(settings.button).on('click', function () {
            console.log(Typeahead.getFrom());
            console.log(Typeahead.getTo());
        });

        return me;
    }

    function initializeMap(element) {
        var mapOptions = {
            center:new google.maps.LatLng(42.26917949243506, 24.818115234375),
            zoom:7,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(element, mapOptions);
        return map;
    }

    function handleChange(autocomplete, map, callback) {
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                // Inform the user that a place was not found and return.
                alert('could not find this place');
                return;
            }

            map.setCenter(place.geometry.location);

            if (callback && typeof callback == 'function') {
                callback(autocomplete.getPlace());
            }
        });
    }

    function drawRoad(from, to, map, directionsDisplay, directionsService) {
        if (!from || !to) return;
        var request = {
            origin:from.geometry.location,
            destination:to.geometry.location,
            travelMode:google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });

    }

    return function (app) {
        var module = app.module("SimpleSearchModule");

        module.startWithParent = false;
        module.addInitializer(function (opts) {
            Typeahead.initialize({
                'inputFrom':opts.from,
                'inputTo':opts.to,
                'mapHolder':opts.map,
                'button':opts.button
            });
        });


    };

});