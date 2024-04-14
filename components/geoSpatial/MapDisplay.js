"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, FeatureGroup, useMap } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
// import * as L from "leaflet";

const MapDisplay = ({ geojsonData, onShapeChange }) => {
  const [map, setMap] = useState(null);

  const center = [51.505, -0.09];
  const zoom = 13;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      whenCreated={setMap}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FeatureGroup>
        <EditControl
          position="topright"
          onEdited={(e) => {
            const layers = e.layers;
            layers.eachLayer((layer) => {
              onShapeChange(layer.toGeoJSON());
            });
          }}
          onCreated={(e) => {
            const { layer } = e;
            onShapeChange(layer.toGeoJSON());
          }}
          onDeleted={(e) => {
            const layers = e.layers;
            layers.eachLayer((layer) => {
              onShapeChange(null);
            });
          }}
          draw={{
            rectangle: true,
            polyline: true,
            circle: false, // Circles are not geoJSON compliant in Leaflet
            polygon: true,
            marker: true,
          }}
        />
      </FeatureGroup>
      {geojsonData && <GeoJSON data={geojsonData} />}
    </MapContainer>
  );
};

export default MapDisplay;
