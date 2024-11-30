import React from 'react'
import "../App.css";

export default function MatchTileWidget(props){
  return (
    <div>
      <div className="match-carousel-tile">
        <div className="match-carousel-tile-main">
          <div className="match-carousel-tile-match">{props.match}</div>
          <center className="match-carousel-tile-teams">
            <div className="match-carousel-tile-team">
              <img src={props.team1Image} alt="" />
              {props.team1}
            </div>
            <div className="match-carousel-tile-time">
              <span>MATCH STARTS</span>
              <br />
              <h3>{props.time}</h3>
            </div>
            <div className="match-carousel-tile-team">
              <img src={props.team2Image} alt="" />
              {props.team2}
            </div>
          </center>
          {
            props.type === "contest-join" && (
              <button className="match-carousel-join-button">
                Join a contest
              </button>
            )
          }
          {
            props.type === "quiz" && (
              <button className="match-carousel-join-button">
                Play Quiz
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}
