import React from "react";
import "../App.css";
import Chatbot from "../components/Chatbot";
import { useLocation, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

export default function TeamPreview() {
  const navigate = useNavigate()
  const { state } = useLocation();
  const selectedPlayers = state.selectedPlayers;
  console.log("Selected players are ", selectedPlayers);
  let team={
    wc:[],
    batters:[],
    allrounder:[],
    bowler:[]
  };
  for (const player of selectedPlayers) {
    console.log("fsda");
    if(player.role.includes("Wicketkeeper")) {
      team["wc"].push(player.name);
    }
    else if(player.role.includes("Batter")) {
      team["batters"].push(player.name);
    }
    else if(player.role.includes("Allrounder")) {
      team["allrounder"].push(player.name);
    }
    else if(player.role.includes("Bowler")) {
      team["bowler"].push(player.name)
  }
  }
  // const team = {
  //   wc: ["M.S. Dhoni", "Quinton De Kock"],
  //   batters: ["Rohit Sharma", "Virat Kohli", "Kane Williamson", "Steve Smith"],
  //   allrounder: ["Ben Stokes", "Hardik Pandya"],
  //   bowler: ["Jasprit Bumrah", "Kagiso Rabada", "Pat Cummins"],
  // };
  return (
    <div id="team-preview-container">
      <Chatbot/>
      <button onClick={()=>{
        navigate('/select-dream-team',{state:{match:state.match, selectedPlayers:selectedPlayers, remainingPlayers:state.remainingPlayers}})
      }} style={{position:"absolute",top:"20px",color:"white", backgroundColor:"black",border:"none",left:"20px",fontSize:"30px",}}><MdArrowBack/></button>
      <img src="src/assets/pitch.png" alt="" srcset="" height="100%" />
      <div className="wicket-keepers">
        {team.wc.map((player, index) => {
          return (
            <div key={index} className="team-preview-player">
              <img src="src/assets/person.png" alt="" width="80p" />
              <center>{player}</center>
            </div>
          );
        })}
      </div>
      <div className="batters">
        {team.batters.map((player, index) => {
          return (
            <div key={index} className="team-preview-player">
              <img src="src/assets/person.png" alt="" width="80p" />
              <center>{player}</center>
            </div>
          );
        })}
      </div>
      <div className="allrounders">
        {team.allrounder.map((player, index) => {
          return (
            <div key={index} className="team-preview-player">
              <img src="src/assets/person.png" alt="" width="80p" />
              <center>{player}</center>
            </div>
          );
        })}
      </div>
      <div className="bowlers">
        {team.bowler.map((player, index) => {
          return (
            <div key={index} className="team-preview-player">
              <img src="src/assets/person.png" alt="" width="80p"/>
              <center>{player}</center>
            </div>
          );
        })}
      </div>
    </div>
  );
}
