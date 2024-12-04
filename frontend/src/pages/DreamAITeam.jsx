import React, { useEffect, useState } from 'react'
import { MdDelete, MdOutlinePersonAddAlt1 } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Chatbot from '../components/Chatbot';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function DreamAITeam() {
  const {state} = useLocation()
  const match=state.match
  const navigate = useNavigate()
  const [selectionReason,setSelectionReason] = useState({});

  const [selectedPlayers,setSelectedPlayers]=useState([])
  const [remainingPlayers,setRemainingPlayers]=useState([])
  
  useEffect(()=>{
    if(state.remainingPlayers===undefined){
        let dt=[]
        console.log("match is ",match);
        for (const x in match) {
          dt.push({
            "id":x,
            "name":match[x].player_name,
            "role":match[x].role,
            "country":match[x].Squad,
            "points":match[x].predicted_points,
            "credits":match[x].credits
          })
        }
        dt.sort((a, b) => b.points - a.points);
        setSelectedPlayers(dt.slice(0,11));
        setRemainingPlayers(dt.slice(11));
    }
    else{
        setSelectedPlayers(state.selectedPlayers)
        setRemainingPlayers(state.remainingPlayers)
    }
    },[match])

  useEffect(()=>{
    fetch(VITE_BACKEND_URL+"/reason-prediction", {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        console.log("Received response ",data);
        setSelectionReason(data);
      })
      .catch(error => {
        console.log(error);
      });
  },[])
    
  const deSelectPlayer=(id)=>{
    let newSelectedPlayers=selectedPlayers.filter(player=>player.id!==id)
    newSelectedPlayers.sort((a, b) => b.points - a.points);  
    let newRemainingPlayers=remainingPlayers.concat(selectedPlayers.filter(player=>player.id===id))
    newRemainingPlayers.sort((a, b) => b.points - a.points);
    setSelectedPlayers(newSelectedPlayers)
    setRemainingPlayers(newRemainingPlayers)
  }

  const addPlayer=(id)=>{
    console.log(selectedPlayers.length);
    if (selectedPlayers.length==11){
      alert("You can select only 11 players")
      return
    }
    let newRemainingPlayers=remainingPlayers.filter(player=>player.id!==id)
    newRemainingPlayers.sort((a, b) => b.points - a.points);
    let newSelectedPlayers=selectedPlayers.concat(remainingPlayers.filter(player=>player.id===id))
    newSelectedPlayers.sort((a, b) => b.points - a.points);
    setSelectedPlayers(newSelectedPlayers)
    setRemainingPlayers(newRemainingPlayers)
  }

  const handlePreviewButton=()=>{
    navigate('/team-preview',{ state: { selectedPlayers: selectedPlayers, remainingPlayers: remainingPlayers} })
  }
  
  const handleNextButton=()=>{
    console.log(selectedPlayers)
    if(selectedPlayers.length==11){
      navigate('/confirm-your-team',{ state: { selectedPlayers: selectedPlayers } })
    }
    else{
      alert("Select 11 players to proceed");
    }
  }
  const toggleRowSelected = (index) => {

    const element =  document.getElementById(`id-for-expanding-selected-${index}`);
    element.getElementsByClassName('expanded-row-content')[0].classList.toggle('hide-row');
    // element.getElementsByClassName('expanded-row-content')[0].classList.toggle('hide-row');
    console.log(event);
  }
  const toggleRowRemaining = (index) => {
    const element =  document.getElementById(`id-for-expanding-remaining-${index}`);
    element.getElementsByClassName('expanded-row-content')[0].classList.toggle('hide-row');
    // element.getElementsByClassName('expanded-row-content')[0].classList.toggle('hide-row');
    console.log(event);
  }
  
  return (
    <div id='dream-ai-team'>
                  <Chatbot/>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"flex-end"}}>
          <div><h2><b>DREAM AI PLAYERS</b></h2></div>
          <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"500px"}}>
            <button id='dream-ai-team-preview-button' onClick={handlePreviewButton}>
              Preview Team
              
            </button>
            <button id='dream-ai-team-next-button' onClick={handleNextButton}>
              Next
            </button>
        </div>
          </div>
          <div id='dream-ai-team-selected-table'>
          <table>
              <tr>
                  <th>PLAYER</th>
                  <th>ROLE</th>
                  <th>COUNTRY</th>
                  <th>FANTASY POINTS <span style={{fontSize:"13px"}}>(Expected)</span></th>
                  <th>CREDITS</th>
                  <th></th>
              </tr>
              {
                selectedPlayers.map((player,index)=>{
                  return <tr id={`id-for-expanding-selected-${index}`} key={index}>
                    <td onClick={()=>toggleRowSelected(index)}>{player.name}</td>
                    <td>{player.role}</td>
                    <td>{player.country}</td>
                    <td>{player.points}</td>
                    <td>{player.credits}</td>
                    <td style={{width:"20px",color:"gray"}}><MdDelete onClick={()=>deSelectPlayer(player.id)}/></td>
                    <td style={{width:"1320px",backgroundColor:"white",padding:"10px",height:"max-content",textAlign:"left",border:"1px solid black"}} className='expanded-row-content hide-row'>
                      <pre>
                        {
                          selectionReason[player.name]!==undefined? selectionReason[player.name]:""
                        }
                      </pre>
                    </td>
                  </tr>
                })
              }
          </table>
        </div>

        <br />
        <div><h2><b>REMAINING PLAYERS</b></h2></div>
        <div id='remaining-players-selected-table'>
          <table>
              <tr>
                <th>PLAYER</th>
                <th>ROLE</th>
                <th>COUNTRY</th>
                <th>POINTS</th>
                <th>CREDITS</th>
                <th></th>
              </tr>
              {
                remainingPlayers.map((player,index)=>{
                  return <tr id={`id-for-expanding-remaining-${index}`} key={index}>
                    <td onClick={()=>toggleRowRemaining(index)}>{player.name}</td>
                    <td>{player.role}</td>
                    <td>{player.country}</td>
                    <td>{player.points}</td>
                    <td>{player.credits}</td>
                    <td style={{width:"20px",color:"gray"}}><MdOutlinePersonAddAlt1 onClick={()=>addPlayer(player.id)}/></td>
                  </tr>
                })
              }
          </table>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />

    </div>
  )
}
