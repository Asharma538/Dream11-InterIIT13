import React, { useState } from 'react'
import { MdDelete, MdOutlinePersonAddAlt1 } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


export default function DreamAITeam() {
  const navigate = useNavigate()
  const player={
    "id":1,
    "name":"Virat Kohli",
    "role":"Batsman",
    "country":"India",
    "points":50,
    "credits":9,
  }

  
  const players=[
    player,player,player,player,player,player,player,player,player,player,player
  ]
  
  const remplayers=[
    player,player,player,player,player,player,player,player,player,player,player
  ]


  const [selectedPlayers,setSelectedPlayers]=useState(players)
  const [remainingPlayers,setRemainingPlayers]=useState(remplayers)

  const deSelectPlayer=(id)=>{
    const newSelectedPlayers=selectedPlayers.filter(player=>player.id!==id)
    const newRemainingPlayers=remainingPlayers.concat(selectedPlayers.filter(player=>player.id===id))
    setSelectedPlayers(newSelectedPlayers)
    setRemainingPlayers(newRemainingPlayers)
  }

  const addPlayer=(id)=>{
    const newRemainingPlayers=remainingPlayers.filter(player=>player.id!==id)
    const newSelectedPlayers=selectedPlayers.concat(remainingPlayers.filter(player=>player.id===id))
    setSelectedPlayers(newSelectedPlayers)
    setRemainingPlayers(newRemainingPlayers)
  }

  const handlePreviewButton=()=>{

  }
  
  const handleNextButton=()=>{
    console.log(selectedPlayers)
    navigate('/confirm-your-team',{ state: { selectedPlayers: selectedPlayers } })
  }

  return (
    <div id='dream-ai-team'>
        <br />
        <b>DREAM AI PLAYERS</b>
        <div id='dream-ai-team-selected-table'>
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
                selectedPlayers.map((player,index)=>{
                  return <tr key={index}>
                    <td>{player.name}</td>
                    <td>{player.role}</td>
                    <td>{player.country}</td>
                    <td>{player.points}</td>
                    <td>{player.credits}</td>
                    <td><MdDelete onClick={()=>deSelectPlayer(player.id)}/></td>
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

        <button id='dream-ai-team-preview-button' onClick={handlePreviewButton}>
          Preview Team
        </button>
        <button id='dream-ai-team-next-button' onClick={handleNextButton}>
          Next
        </button>
    </div>
  )
}
