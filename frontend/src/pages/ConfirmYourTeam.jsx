import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Chatbot from '../components/Chatbot';

export default function ConfirmYourTeam(props) {
    const { state } = useLocation();
    const players = state.selectedPlayers
    console.log(players)
    const [captain, setCaptain] = useState(players[0].name)
    const [viceCaptain, setViceCaptain] = useState(players[1].name)

    console.log(captain)
    return (
        <div id='confirm-your-team'>
            <Chatbot/>
            <b>SELECTED PLAYERS</b>
            <br />
            <div style={{"alignSelf":"center", "color":"red",fontSize:"18px"}}><b>Captain gets 2x points and Vice caption gets 1.5x points</b></div>
            <br />
            <div style={{display:"flex",justifyContent:"space-around"}}>
                <div id='confirm-your-team-captain-selection'>
                    <b>Select Your Captain: </b>
                    <select defaultValue={captain} onChange={(val)=>setCaptain(val.target.value)}>
                        {players.map(player => {players[0].name
                            return (
                                <option value={player.name}>{player.name}</option>
                            )
                        })}
                    </select>
                </div>
                <br />
                <div id='confirm-your-team-vice-captain-selection'>
                    <b>Select Your Vice Captain: </b>
                    <select defaultValue={viceCaptain} onChange={(val)=>setViceCaptain(val.target.value)}>
                        {players.map(player => {
                            return (
                                <option value={player.name}>{player.name}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div id='confirm-your-team-selected-table'>
                <table>
                    <tr>
                        <th>PLAYER</th>
                        <th>ROLE</th>
                        <th>COUNTRY</th>
                        <th>POINTS</th>
                        <th>CREDITS</th>
                    </tr>
                    {players.map(player => {
                        return (
                        <tr>
                    <td style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{width:"20px"}}></div>
                                {captain === player.name ? (
                                    <img 
                                        style={{
                                            position: "relative", 
                                            right: "0px", 
                                            width: "30px", 
                                            height: "30px",
                                            backgroundColor: "black",
                                            borderRadius: "50%",
                                            scale:"1.03"
                                        }} 
                                        src="src/assets/captain-tag.png" 
                                        alt="caption tag"
                                    />
                                ) : ""}
                                {
                                    viceCaptain === player.name ? (
                                        <img 
                                            style={{
                                                position: "relative", 
                                                right: "0px", 
                                                width: "30px", 
                                                height: "30px", 
                                                objectFit: "contain",
                                                borderRadius: "50%",
                                            }} 
                                            src="src/assets/vice-captain-tag.png" 
                                            alt="vice caption tag"
                                        />
                                    ) : ""
                                }
                                <div style={{ flexGrow: 1 }}>
                                    {player.name} 
                                </div>
                                {captain === player.name ? (
                                    <img 
                                        style={{
                                            position: "relative", 
                                            right: "0px", 
                                            width: "30px", 
                                            height: "30px", 
                                            objectFit: "contain",
                                            borderRadius: "50%",
                                            scale:"1.03"
                                        }} 
                                        src="src/assets/captain-tag.png" 
                                        alt="caption tag"
                                    />
                                ) : ""}
                                {
                                    viceCaptain === player.name ? (
                                        <img 
                                            style={{
                                                position: "relative", 
                                                right: "0px", 
                                                width: "30px", 
                                                height: "30px", 
                                                objectFit: "contain",
                                                borderRadius: "50%",
                                            }} 
                                            src="src/assets/vice-captain-tag.png" 
                                            alt="vice caption tag"
                                        />
                                    ) : ""
                                }
                                <div style={{width:"20px"}}></div>

                            </td>
                            <td>{player.role}</td>
                            <td>{player.country}</td>
                            <td>{player.points}</td>
                            <td>{player.credits}</td>
                        </tr>
                        )
                    })}
                </table>
            </div>
            
            
            <br />
            <button id='confirm-your-team-button'>
                Confirm Team and Pay
            </button>
        </div>
    )
}
