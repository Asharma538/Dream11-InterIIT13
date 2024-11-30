import React from "react";
import "../App.css";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


export default function MatchCarousel() {
    const matches = [
        {"match":"Men's T20I Tri-Series ","time":"01:00 PM","team1":"India","team2":"Australia","date":"2021-12-27","team1Image":"src/assets/india_team.png","team2Image":"src/assets/aus_team.png"},
        // {"match":"Men's T20I Tri-Series ","time":"01:00 PM","team1":"Netherlands","team2":"Sri Lanka","date":"2021-12-27","team1Image":"src/assets/react.svg","team2Image":"src/assets/dream-ai-robot.png"},
    ]
  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop interval={5000}>
        {
            matches.map((match) => (
                <div className="match-carousel-tile">
                    <div className="match-carousel-tile-main">
                        <div className="match-carousel-tile-match">{match.match}</div>
                        <center className="match-carousel-tile-teams">

                            <div className="match-carousel-tile-team">
                                <img src={match.team1Image} alt="" />
                                {match.team1}
                            </div>

                            <div className="match-carousel-tile-time">
                                <span>MATCH STARTS</span>
                                <br />
                                <h3>{match.time}</h3>
                            </div>

                            <div className="match-carousel-tile-team">
                                <img src={match.team2Image} alt="" />
                                {match.team2}
                            </div>
                        </center>
                        <button className="match-carousel-join-button">
                            Join a Contest
                        </button>
                    </div>
                </div>
            ))
        }
    </Carousel>
  );
}
