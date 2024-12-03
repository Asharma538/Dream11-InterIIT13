import React from 'react'
import { useLocation } from 'react-router-dom';

export default function ConfirmYourTeam(props) {
    const { state } = useLocation();
    const players = state.selectedPlayers
    console.log(players)
    return (
        <div id='confirm-your-team'>
            <b>SELECTED PLAYERS</b>
            <div id='confirm-your-team-selected-table'>
                <table>
                    <tr>
                        <th style={{ width: "12%" }}>PLAYER</th>
                        <th style={{ width: "12%" }}>ROLE</th>
                        <th style={{ width: "12%" }}>COUNTRY</th>
                        <th style={{ width: "12%" }}>POINTS</th>
                        <th style={{ width: "12%" }}>CREDITS</th>
                    </tr>
                    {players.map(player => {
                        return (
                            <tr>
                                <td>{player.name}</td>
                                <td>{player.role}</td>
                                <td>{player.country}</td>
                                <td>{player.points}</td>
                                <td>{player.credits}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            <div style={{"alignSelf":"center"}}>Captain gets 2x points and Vice caption gets 1.5x points</div>
            <br />
            <div style={{display:"flex",justifyContent:"space-around"}}>
                <div id='confirm-your-team-captain-selection'>
                    <b>Select Your Captain: </b>
                    <select>
                        {players.map(player => {
                            return (
                                <option value={player.name}>{player.name}</option>
                            )
                        })}
                    </select>
                </div>
                <br />
                <div id='confirm-your-team-vice-captain-selection'>
                    <b>Select Your Vice Captain: </b>
                    <select>
                        {players.map(player => {
                            return (
                                <option value={player.name}>{player.name}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <br />
            <button id='confirm-your-team-button'>
                Confirm Team and Pay
            </button>
        </div>
    )
}
