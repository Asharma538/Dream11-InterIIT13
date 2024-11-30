import React from "react";
import "../App.css";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MatchTileWidget from "./MatchTileWidget";


export default function MatchCarousel(props) {
    const matches = [
        {"match":"Men's T20I Tri-Series ","time":"01:00 PM","team1":"India","team2":"Australia","date":"2021-12-27","team1Image":"src/assets/india_team.png","team2Image":"src/assets/aus_team.png"},
        {"match":"Men's T20I Tri-Series ","time":"01:00 PM","team1":"England","team2":"South Africa","date":"2021-12-27","team1Image":"src/assets/india_team.png","team2Image":"src/assets/aus_team.png"},
    ]
  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop interval={5000}>
        {
            matches.map((match) => (
                <MatchTileWidget match={match.match} time={match.time} team1={match.team1} team2={match.team2} team1Image={match.team1Image} team2Image={match.team2Image} type={props.type} />
            ))
        }
    </Carousel>
  );
}
