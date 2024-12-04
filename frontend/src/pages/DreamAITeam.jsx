import React, { useEffect, useState } from 'react'
import { MdDelete, MdOutlinePersonAddAlt1 } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Chatbot from '../components/Chatbot';


export default function DreamAITeam() {
  const {state} = useLocation()
  const match=state.match
  const navigate = useNavigate()


  const [selectedPlayers,setSelectedPlayers]=useState([])
  const [remainingPlayers,setRemainingPlayers]=useState([])

  
  useEffect(()=>{
    if(state.remainingPlayers===undefined){
        let dt=[]
        console.log("match is ",match);
        for (const x in match) {
          console.log("x is ",x,match[x]);
          dt.push({
            "id":x,
            "name":match[x].player_name,
            "role":match[x].role,
            "country":match[x].Squad,
            "points":match[x].predicted_points,
            "credits":match[x].credits
          })
        }
        console.log("dt is ",dt);
        dt.sort((a, b) => b.points - a.points);
        setSelectedPlayers(dt.slice(0,11));
        setRemainingPlayers(dt.slice(11));
    }
    else{
        setSelectedPlayers(state.selectedPlayers)
        setRemainingPlayers(state.remainingPlayers)
    }
    },[match])
    
  const deSelectPlayer=(id)=>{
    let newSelectedPlayers=selectedPlayers.filter(player=>player.id!==id)
    newSelectedPlayers.sort((a, b) => b.points - a.points);  
    let newRemainingPlayers=remainingPlayers.concat(selectedPlayers.filter(player=>player.id===id))
    newRemainingPlayers.sort((a, b) => b.points - a.points);
    setSelectedPlayers(newSelectedPlayers)
    setRemainingPlayers(newRemainingPlayers)
  }

  const addPlayer=(id)=>{
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
      
    }
  }
  const toggleRow = (index) => {

    const element =  document.getElementById(`id-for-expanding-${index}`);
    element.getElementsByClassName('expanded-row-content')[0].classList.toggle('hide-row');
    // element.getElementsByClassName('expanded-row-content')[0].classList.toggle('hide-row');
    console.log(event);
  }
  
  return (
    <div id='dream-ai-team'>
                  <Chatbot/>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"flex-end"}}>
          <div><b>DREAM AI PLAYERS</b></div>
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
                  return <tr id={`id-for-expanding-${index}`} key={index}>
                    <td onClick={()=>toggleRow(index)}>{player.name}</td>
                    <td>{player.role}</td>
                    <td>{player.country}</td>
                    <td>{player.points}</td>
                    <td>{player.credits}</td>
                    <td style={{width:"20px",color:"gray"}}><MdDelete onClick={()=>deSelectPlayer(player.id)}/></td>
                    <td style={{width:"1320px",padding:"10px",textAlign:"left"}} className='expanded-row-content hide-row'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. In animi unde minima, nesciunt facere architecto voluptatem ea totam soluta, sunt perspiciatis voluptatibus atque et iste dicta quibusdam excepturi velit aperiam alias. Dolor itaque corrupti vitae accusantium quae distinctio iste labore assumenda facere eius omnis, delectus esse ullam, eos, minus veritatis enim quisquam. Dicta laudantium pariatur itaque, ex quibusdam, tempore dolores, eos repudiandae sed accusamus tenetur.</td>
                  </tr>
                })
              }
          </table>
        </div>

        <br />
        <b>REMAINING PLAYERS</b>
        <div id='remaining-players-selected-table'>
          <table>
              <tr>
                <th style={{width: "12%"}}>PLAYER</th>
                <th style={{width: "12%"}}>ROLE</th>
                <th style={{width: "12%"}}>COUNTRY</th>
                <th style={{width: "8%"}}>POINTS</th>
                <th style={{width: "8%"}}>CREDITS</th>
                <th style={{width: "1%"}}></th>
              </tr>
              {
                remainingPlayers.map((player,index)=>{
                  return <tr key={index}>
                    <td>{player.name}</td>
                    <td>{player.role}</td>
                    <td>{player.country}</td>
                    <td>{player.points}</td>
                    <td>{player.credits}</td>
                    <td><MdOutlinePersonAddAlt1 onClick={()=>addPlayer(player.id)}/></td>
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
