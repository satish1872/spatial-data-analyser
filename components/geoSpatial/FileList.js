"use client";
import React, { useState, useEffect } from "react";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/files/list");
        if (!response.ok) {
          throw new Error('Failed to fetch files: ' + response.statusText);
        }
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error("Error fetching files:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (isLoading) return <p className="text-center">Loading files...</p>;
  if (error) return <p className="text-red-500 text-center">Error loading files: {error}</p>;

  return (
    <div className="mt-4 p-5 border border-gray-200 rounded shadow-lg">
      <h2 className="text-lg font-semibold mb-3">Your Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.name} className="mb-2 p-2 border-b border-gray-300 last:border-b-0">
            {file.name} - Last modified: {new Date(file.updated_at).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
