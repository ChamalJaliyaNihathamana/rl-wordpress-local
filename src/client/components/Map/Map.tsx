import React from "react";

import {
  GoogleMap,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import MarkerIcon from "../../../assets/img/marker.svg";

interface MapProps {
  infoWindowContent?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Map: React.FunctionComponent<MapProps> = ({
  coordinates = { lat: 40.73061, lng: -73.935242 },
  infoWindowContent,
  zoom = 15,
}) => {
  const [latlng, setLatLng] = React.useState(coordinates);
  const [mapZoom, setMapZoom] = React.useState(zoom);


  const [showInfo, setShowInfo] = React.useState(true);

  const toggleInfoWindow = React.useCallback(() => {
    setShowInfo((v) => !v);
  }, []);

  const [map, setMap] = React.useState(null);


  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null);
  // }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coordinates}
      zoom={mapZoom}
    >
      {coordinates ? (
        <Marker
          position={coordinates}
          onClick={toggleInfoWindow}
          icon={MarkerIcon}
        >
          {showInfo && infoWindowContent? (
            <InfoWindow onCloseClick={toggleInfoWindow}>
              <span>{infoWindowContent}</span>
            </InfoWindow>
          ) : null}
        </Marker>
      ) : null}
    </GoogleMap>
  );
};
export default Map;
