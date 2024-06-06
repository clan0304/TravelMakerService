'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import {
  Autocomplete,
  GoogleMap,
  Libraries,
  LoadScript,
} from '@react-google-maps/api';
import { CSSProperties } from 'react';
import { CafeItem } from '@/type';
import Markers from './Markers';

interface GoogleMapViewProps {
  onLatChange: (value: number) => void;
  onLngChange: (value: number) => void;
  lists: CafeItem[];
}

const libraries: Libraries = ['places'];

const GoogleMapView = ({
  onLatChange,
  onLngChange,
  lists,
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
  const [zoom, setZoom] = useState(12);
  const [mapOptions, setMapOptions] = useState<any>({});

  const determineZoomLevel = (place: google.maps.places.PlaceResult) => {
    let zoomLevel = 10;
    if (place.types) {
      if (place.types.includes('locality')) {
        zoomLevel = 13;
      }
      if (place.types.includes('administrative_area_level_1')) {
        zoomLevel = 10;
      } else {
        zoomLevel = 15;
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

      const newZoom = determineZoomLevel(place);
      setZoom(newZoom);
    }
  }, [onLatChange, onLngChange]);

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
    <div className="w-full px-2">
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
          {lists.map((item) => (
            <Markers key={item.id} list={item} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapView;
