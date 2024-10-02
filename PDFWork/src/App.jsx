import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [action, setAction] = useState("upload"); // Options: 'upload', 'compress', 'convert'

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFile(acceptedFiles[0]);
    },
    accept: '.pdf, .doc, .docx', // Accept PDF and document formats for conversion
  });

  const handleAction = async () => {
    if (!file) {
      alert("Please upload a file first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      let response;
      const apiUrl = `https://api.ilovepdf.com/v1/${action}`; // Define URL based on action

      switch (action) {
        case 'upload':
        case 'compress':
        case 'convert':
          response = await axios.post(apiUrl, formData, {
            headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_SECRET_KEY}`,  // Use environment variable
              'Content-Type': 'multipart/form-data',
            },
          });
          break;
        default:
          break;
      }

      setOutput(response.data.file_url);
    } catch (error) {
      console.error("There was an error processing the file!", error);
    } finally {
      setLoading(false);
    }
  };

  const resetFile = () => {
    setFile(null);
    setOutput(null);
    setAction("upload");
  };

  return (
    <div className="App">
      <div className="weather-container">
        <h1 className="header">PDF Web App</h1>
        <div className="input-container">
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag & drop a PDF or DOC file here, or click to select a file</p>
          </div>
          {file && <p>File selected: {file.name}</p>}
        </div>

        <div className="button-container">
          <button onClick={resetFile} disabled={!file}>Reset</button>
          <button onClick={handleAction} disabled={loading || !file}>
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>

        <div className="action-buttons">
          <button onClick={() => setAction('upload')} disabled={!file}>Upload</button>
          <button onClick={() => setAction('compress')} disabled={!file}>Compress</button>
          <button onClick={() => setAction('convert')} disabled={!file}>Convert to PDF</button>
        </div>

        {output && (
          <div className="info_box">
            <h2>Download your file:</h2>
            <a href={output} download>Click here to download</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
