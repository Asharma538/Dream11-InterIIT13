import React from 'react'
import "../App.css"
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  const navigate = useNavigate();
  const [selectedValue,setSelectedValue] = React.useState(props.selectedValue);
  const handleSelectionChange = (event) => {
    const selectedValue = event.target.value;
    
    console.log(selectedValue);
    // Navigate to the route based on the selected value
    if (selectedValue === "cricket") {
      setSelectedValue(selectedValue);
      navigate("/cricket");
    }
  };

  return (
    <div id='Navbar'>
      <img id='Navbar-logo' src="src/assets/dream_11.png" />
      <div id='Navbar-buttons-container'>
        <div className="Navbar-button">
          <select
            name="Sports"
            id="sport-selection-button"
            value={selectedValue}
            onChange={handleSelectionChange}
          >
            <option value="none" disabled hidden> 
              Sports
            </option>
            <option value="cricket">Cricket</option>
            <option value="football">Football</option>
          </select>
        </div>
        <div className="Navbar-button" onClick={()=>{navigate("/quiz")}}>Fantasy Quiz</div>
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