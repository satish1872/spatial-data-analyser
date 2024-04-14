"use client";
import React, { useState } from "react";
import MapDisplay from "./MapDisplay";
import FileUploader from "./FileUploader";
import styles from "./GeospatialPage.module.css";
import FileList from "./FileList";

const GeospatialPage = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [activeView, setActiveView] = useState("map"); // 'map', 'upload', 'list'

  const handleFileLoad = (jsonData) => {
    setGeoJsonData(jsonData);
  };
  const handleShapeChange = async (newShape) => {
    console.log(newShape); // Logging the new shape
    try {
      const response = await fetch("/api/shapes/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shape_data: newShape }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Shape saved:", data);
    } catch (error) {
      console.error("Error saving shape:", error);
    }
  };

  if (typeof window !== "undefined") {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Geospatial Data Viewer</h1>
        <div className={styles.navbar}>
          <button
            onClick={() => setActiveView("map")}
            className={styles.navButton}
          >
            Map View
          </button>
          <button
            onClick={() => setActiveView("upload")}
            className={styles.navButton}
          >
            Upload Files
          </button>
          <button
            onClick={() => setActiveView("list")}
            className={styles.navButton}
          >
            File List
          </button>
        </div>
        {activeView === "map" && (
          <MapDisplay
            geojsonData={geoJsonData}
            onShapeChange={handleShapeChange}
          />
        )}
        {activeView === "upload" && (
          <FileUploader onFileLoad={handleFileLoad} />
        )}
        {activeView === "list" && <FileList />}
      </div>
    );
  }

  /* return (
    <div>
      <h1>Geospatial Data Viewer</h1>
      <FileUploader onFileLoad={handleFileLoad} />
      <MapDisplay geojsonData={geoJsonData} />
    </div>
  ); */
};

export default GeospatialPage;
