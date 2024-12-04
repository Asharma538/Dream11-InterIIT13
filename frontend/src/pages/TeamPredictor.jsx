import React from 'react'
import "../App.css"
import Navbar from '../components/Navbar'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function TeamPredictor() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      console.log("Got file:",file);
      fetch(VITE_BACKEND_URL+"/predict", {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          navigate("/select-dream-team", { state: { match: data } });
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
    }
  };

  return (
    <div>
      <Navbar selectedValue="none"/>
      <div className='predict-team'>
        <h2>Upload Team Info CSV</h2>
        <div>
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button onClick={handleUpload}>Predict</button>
        </div>
      </div>
    </div>
  )
}