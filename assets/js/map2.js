mapboxgl.accessToken = 'pk.eyJ1IjoibGUxMWV2YW4iLCJhIjoiY2wxdnBvZGY5MWk3bTNsb2Z2aTE3cTRibyJ9.Mp2IDrPcjvLaVrD5-oseOA';

navigator.geolocation.getCurrentPosition(sucessLocation, errorLocation, { enableHighAccuracy: true})

function sucessLocation(position) {
    console.log(position)
    setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
    setupMap([33.8823, 117.8851])
}

function setupMap(center) {

    const geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-117.88536,33.88137]
            },
            properties: {
              title: 'You Are Here',
              description: 'Pollack Library'
            }
          }
        ]
      };

    
    
    const map = new mapboxgl.Map({
        container: 'map2',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 14
        })

        // Add the control to the map.
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        zoom: 14,
        placeholder: '       Enter a location, e.g Target [Then Copy and Paste Address for Reviews]'
      });

      document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
  
        // add navigation functionality
    const nav = new mapboxgl.NavigationControl();
        map.addControl(nav);

        var directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken
          });
          
          map.addControl(directions, 'top-left');
          
          // add markers to map
        for (const feature of geojson.features) {
            // create a HTML element for each feature
            const el = document.createElement('div');
            el.className = 'marker';
            
            // make a marker for each feature and add it to the map
            new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
            `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
            )
            .addTo(map);
            }

            
            
}


