//"use client";

import {useState} from 'react'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow
} from "@vis.gl/react-google-maps"

function GoogleMap(){

  var defaultProps = {
    center: {lat: 59.95, lng: 30.33,},
    zoom: 11,
  }

  return (
    <APIProvider apiKey={import.meta.vite.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={defaultProps.zoom} center={defaultProps.center}>

        </Map>
      </div>
    </APIProvider>
  )
}

export default GoogleMap;