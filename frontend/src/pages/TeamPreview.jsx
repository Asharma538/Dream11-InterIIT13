import React from "react";
import "../App.css";

export default function TeamPreview() {
  const team = {
    wc: ["M.S. Dhoni", "Quinton De Kock"],
    batters: ["Rohit Sharma", "Virat Kohli", "Kane Williamson", "Steve Smith"],
    allrounder: ["Ben Stokes", "Hardik Pandya"],
    bowler: ["Jasprit Bumrah", "Kagiso Rabada", "Pat Cummins"],
  };
  return (
    <div id="team-preview-container">
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
