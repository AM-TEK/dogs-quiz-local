import React, { useEffect } from 'react';

const Map = React.memo(() => {
  useEffect(() => {
    const initMap = () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: latitude, lng: longitude },
            zoom: 15,
            mapId: '83b2492a8c4e8a88'
          });

          const placesService = new window.google.maps.places.PlacesService(map);
          const request = {
            location: map.getCenter(),
            radius: 5000,
            type: 'pet_store',
          };

          placesService.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              for (let i = 0; i < results.length; i++) {
                const marker = new window.google.maps.marker.AdvancedMarkerElement({
                  position: results[i].geometry.location,
                  map,
                  title: results[i].name,
                });

                marker.setMap(map);
              }
            }
          });
        },
        error => {
          console.error('Error getting user location:', error);
        }
      );
    };

    if (window.google && window.google.maps && window.google.maps.marker) {
      initMap();
    } else {
      window.initMap = initMap;
    }
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
});

export default Map;