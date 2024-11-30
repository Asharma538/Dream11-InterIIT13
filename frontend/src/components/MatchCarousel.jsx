import React from "react";
import "../App.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MatchTileWidget from "./MatchTileWidget";

export default function MatchCarousel(props) {
  const matches = props.matches;
  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop interval={5000}>
      {matches.map((match,index) => (
        <MatchTileWidget key={index}
          match={match.match}
          time={match.time}
          team1={match.team1}
          team2={match.team2}
          team1Image={match.team1Image}
          team2Image={match.team2Image}
          type={props.type}
        />
      ))}
    </Carousel>
  );
}
