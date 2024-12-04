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
        <center><h2>Predict Your Dream Team</h2></center>
        <div>
          <table>
            <tr>
              <th colSpan="4">Sample CSV with 22 Players</th>
            </tr>
            <tr>
            
            <th className='sample-csv-header'>Player Name</th> 
            <th className='sample-csv-header'>Squad</th> 
            <th className='sample-csv-header'>Match Date</th> 
            <th className='sample-csv-header'>Format</th>
            </tr>
            <tr>
              <td>A Capsey</td> <td>England</td> <td>2021-09-01</td> <td>ODI</td>
            </tr>
            <tr><td>.</td><td>.</td><td>.</td><td>.</td></tr>
            <tr><td>.</td><td>.</td><td>.</td><td>.</td></tr>
            <tr><td>.</td><td>.</td><td>.</td><td>.</td></tr>
            <tr>
              <td>IC Gaze</td> <td>New Zealand</td> <td>2021-09-01</td> <td>ODI</td>
            </tr>
          </table>
        </div>
        <div>
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button onClick={handleUpload}>Predict</button>
        </div>
      </div>
    </div>
  )
}