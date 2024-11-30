import React from 'react'
import "../App.css"

export default function Navbar() {
  return (
    <div id='Navbar'>
        <img id='Navbar-logo' src="src/assets/dream_11.png"/>
        <div id='Navbar-buttons-container'>
            <div className="Navbar-button">
              <select name="Sports" id="sport-selection-button">
                <option value="none" selected disabled hidden>Sports</option>
                <option value="sport1">Cricket</option>
                <option value="sport2">Football</option>
              </select>
            </div>
            <div className="Navbar-button">Fantasy Quiz</div>
            <div className="Navbar-button">Dream AI</div>
        </div>
        <div>
        <select name='Languages' id='Navbar-language-button'>
            <option className='Navbar-language-option' value="option1"> English </option>
            <option className='Navbar-language-option' value="option2"> Hindi </option>
        </select>
        </div>
    </div>
  )
}