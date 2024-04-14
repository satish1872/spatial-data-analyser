"use client";
import React, { useState } from "react";
import styles from "./FileUploader.module.css";

// Function to get the file extension based on the file name
const getFileType = (fileName) => {
  const extension = fileName.split(".").pop().toLowerCase();
  return extension;
};

/* const FileUploader = ({ onFileLoad }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileType = getFileType(file.name); // Use file.name to get the correct file type
        console.log("file");
        console.log(file);
        if (fileType === "geojson") {
          try {
            const json = JSON.parse(event.target.result); // Un-comment this line to parse JSON
            onFileLoad(json);
          } catch (error) {
            alert("Error parsing JSON file: " + error);
          }
        } else if (fileType === "kml") {
          onFileLoad(event.target.result); // Pass the KML content directly
        } else {
          alert("Unsupported file type");
        }
      };
      reader.readAsText(file);
    }
  }; */
  
  const FileUploader = ({ onFileLoad }) => {
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const fileType = getFileType(file.name); // Use file.name to get the correct file type
        if (fileType !== "geojson" && fileType !== "kml") {
          alert("Unsupported file type");
          return;
        }
  
        // Create FormData to send the file
        const formData = new FormData();
        formData.append("file", file);
  
        try {
          const response = await fetch("/api/files/upload", {
            method: "POST",
            body: formData,  // Sending the file in the request
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const result = await response.json();
          console.log("File uploaded successfully:", result);
  
          // Optionally, parse JSON if it's a GeoJSON file
          if (fileType === "geojson") {
            const reader = new FileReader();
            reader.onload = (e) => {
              try {
                const json = JSON.parse(e.target.result);
                onFileLoad(json);
              } catch (error) {
                alert("Error parsing JSON file: " + error);
              }
            };
            reader.readAsText(file);
          } else if (fileType === "kml") {
            const reader = new FileReader();
            reader.onload = (e) => onFileLoad(e.target.result);
            reader.readAsText(file);
          }
  
        } catch (error) {
          console.error("Error uploading file:", error);
          alert("Error uploading file: " + error.message);
        }
      }
    };

  return (
    <div className={styles.uploader}>
      <input
        className={styles.inputFile}
        type="file"
        accept=".geojson,.kml"
        onChange={handleFileChange}
      />
    </div>
  );
};


export default FileUploader;
