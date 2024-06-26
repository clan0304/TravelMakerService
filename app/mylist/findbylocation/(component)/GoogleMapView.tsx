'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import {
  Autocomplete,
  GoogleMap,
  Libraries,
  LoadScript,
  MarkerF,
} from '@react-google-maps/api';
import { CSSProperties } from 'react';
import { CafeItem } from '@/type';
import Markers from './Markers';
import axios from 'axios';
import ListDetail from './ListDetail';

interface GoogleMapViewProps {
  onLatChange: (value: number) => void;
  onLngChange: (value: number) => void;
  lists: CafeItem[];
  lat: number;
  lng: number;
}

const libraries: Libraries = ['places'];

const GoogleMapView = ({
  onLatChange,
  onLngChange,
  lists,
  lat,
  lng,
}: GoogleMapViewProps) => {
  const mapContainerStyle: CSSProperties = {
    width: '100%',
    height: '500px',
  };

  const inputStyle: CSSProperties = {
    boxSizing: 'border-box',
    border: '1px solid transparent',
    width: '300px',
    height: '40px',
    padding: '0 12px',
    borderRadius: '3px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    fontSize: '14px',
    outline: 'none',
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
  };

  const defaultCoordinates = { lat: -34.397, lng: 150.644 };
  const [center, setCenter] = useState(defaultCoordinates);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [zoom, setZoom] = useState(13);
  const [mapOptions, setMapOptions] = useState<any>({});
  const [name, setName] = useState<string | null>(null);
  const [activeList, setActiveList] = useState<CafeItem | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const determineZoomLevel = (place: google.maps.places.PlaceResult) => {
    let zoomLevel = 13;
    if (place.types) {
      if (place.types.includes('locality')) {
        zoomLevel = 13;
      }
      if (place.types.includes('administrative_area_level_1')) {
        zoomLevel = 13;
      } else {
        zoomLevel = 13;
      }
    }
    return zoomLevel;
  };

  const onPlaceChanged = useCallback(() => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.geometry && place.geometry.location) {
      const newCenter = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      onLatChange(newCenter.lat);
      onLngChange(newCenter.lng);
      setCenter(newCenter);
      setCurrentLocation(newCenter);

      const newZoom = determineZoomLevel(place);
      setZoom(newZoom);

      if (place.name) {
        setName(place.name);
      } else {
        reverseGeocode(newCenter.lat, newCenter.lng);
      }
    }
  }, [onLatChange, onLngChange]);

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}`
      );
      const name = response.data.results[0]?.formatted_name;
      if (name) {
        setName(name);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  useEffect(() => {
    const loadMapOptions = () => {
      if (typeof google !== 'undefined') {
        setMapOptions({
          mapTypeControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT,
          },
        });
      }
    };

    loadMapOptions();
  }, []);

  return (
    <div className="w-full z-5">
      <LoadScript
        googleMapsApiKey={
          process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY as string
        }
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={zoom}
          options={mapOptions}
        >
          <div
            style={{ position: 'absolute', top: 0, width: '100%', zIndex: 1 }}
          >
            <Autocomplete
              onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              }
              onPlaceChanged={onPlaceChanged}
            >
              <input
                type="text"
                placeholder="Enter location"
                style={inputStyle}
              />
            </Autocomplete>
          </div>

          {currentLocation && (
            <MarkerF
              position={currentLocation}
              icon={{
                url: '/assets/marker.png',
                scaledSize: new google.maps.Size(30, 30),
              }}
            />
          )}

          {lists.map((item) => (
            <Markers
              key={item.id}
              list={item}
              placeLat={lat}
              placeLng={lng}
              name={name}
              onClick={() => setActiveList(item)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      {activeList && (
        <div className="fixed top-20 right-0 z-50 w-1/2 min-h-[400px]">
          <ListDetail
            list={activeList}
            placeLat={lat}
            placeLng={lng}
            name={name}
            onClose={() => setActiveList(null)}
          />
        </div>
      )}
    </div>
  );
};

export default GoogleMapView;
