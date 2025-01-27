// src/components/FileUploader/FileUploader.jsx
import React, { useRef, useState } from 'react';
import styles from './FileUploader.module.css';

export const FileUploader = ({ onFileContent, isUploaded }) => {
  const fileInput = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFiles = (file) => {
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        onFileContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`${styles.container} ${dragActive ? styles.dragActive : ''} ${isUploaded ? styles.uploaded : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInput}
        onChange={handleChange}
        accept=".txt"
        className={styles.input}
      />
      
      <div className={styles.content}>
        {isUploaded ? (
          <>
            <div className={styles.successIcon}>✓</div>
            <p className={styles.fileName}>{fileName}</p>
            <button
              onClick={() => fileInput.current.click()}
              className={styles.uploadButton}
            >
              Upload Different File
            </button>
          </>
        ) : (
          <>
            <div className={styles.uploadIcon}>↑</div>
            <p className={styles.text}>
              Drag and drop your graph file here or
            </p>
            <button
              onClick={() => fileInput.current.click()}
              className={styles.uploadButton}
            >
              Browse Files
            </button>
            <p className={styles.hint}>
              Upload a .txt file containing the graph data
            </p>
          </>
        )}
      </div>
    </div>
  );
};