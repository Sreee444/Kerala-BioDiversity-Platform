
import React, { useState } from 'react';

function ImageSearch({ onImageSearch }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      onImageSearch(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    document.getElementById('image-upload').click();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      style={{
        border: `2px dashed ${isDragging ? '#388e3c' : selectedFile ? '#4caf50' : '#ccc'}`,
        borderRadius: '12px',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: isDragging ? '#f1f8e9' : selectedFile ? '#e8f5e8' : '#fafafa',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        maxWidth: 450,
        minHeight: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{ display: 'none' }}
        id="image-upload"
      />
      
      {selectedFile ? (
        <div>
          <div style={{ fontSize: '1.2rem', color: '#388e3c', marginBottom: '0.5rem' }}>
            ✅ Image Selected: {selectedFile.name}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            Analyzing plant... Check results below!
          </div>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📸</div>
          <div style={{ fontSize: '1.2rem', color: '#333', marginBottom: '0.5rem', fontWeight: 600 }}>
            Identify Plant from Photo
          </div>
          <div style={{ fontSize: '1rem', color: '#666', marginBottom: '0.5rem' }}>
            Upload an image to identify the plant species
          </div>
          <div style={{ fontSize: '0.9rem', color: '#999' }}>
            Drag & drop or click to browse • JPG, PNG supported
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageSearch;
